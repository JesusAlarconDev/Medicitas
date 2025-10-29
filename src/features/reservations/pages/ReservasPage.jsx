import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Loading } from '@shared/components/Feedback/Loading';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export const ReservasPage = () => {
    const [reserva, setReserva] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchId.trim()) {
            Swal.fire('Error', 'Por favor ingresa un ID de reserva', 'error');
            return;
        }
        navigate(`/reservas/${searchId}`);
    };

    const handleDelete = async () => {
        try {
            const jwt_token = localStorage.getItem('userToken');
            if (!jwt_token) {
                throw new Error('No autorizado. Por favor inicia sesión.');
            }

            const response = await fetch(`/api/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt_token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la reserva');
            }

            return true;
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            throw error;
        }
    };

    const handleDeleteConfirm = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await handleDelete();
                    Swal.fire(
                        '¡Eliminado!',
                        'La reserva ha sido eliminada correctamente.',
                        'success'
                    );
                    navigate('/reservas');
                } catch (error) {
                    Swal.fire(
                        'Error',
                        error.message || 'Ocurrió un error al eliminar la reserva',
                        'error'
                    );
                }
            }
        });
    };

    useEffect(() => {
        const fetchReservation = async () => {
            if (!id) return;

            setLoading(true);
            try {
                const RESERVAS_URL = `/api/reservations/${id}`;
                const jwt_token = localStorage.getItem('userToken'); 

                if(!jwt_token || jwt_token.length < 1) {
                    throw new Error('No autorizado.');
                }

                const response = await fetch(RESERVAS_URL, {
                    headers: {
                        "Authorization": `Bearer ${jwt_token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al cargar la reserva');
                }

                const data = await response.json();
                setReserva(data);
            } catch (error) {
                console.error('Error al cargar la reserva:', error);
                Swal.fire('Error', error.message || 'Error al cargar la reserva', 'error');
                navigate('/reservas');
            } finally {
                setLoading(false);
            }
        };

        fetchReservation();
    }, [id, navigate]);

    if (location.pathname === '/reservas' || !id) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                    <h2 className='text-3xl font-bold mb-6'>Buscar Reserva</h2>
                    <form onSubmit={handleSearch} className="mb-8">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="Ingresa el ID de la reserva"
                                className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                            <button 
                                type="submit" 
                                className="!bg-[#198bad] hover:!bg-[#14738f] transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                                disabled={loading}
                                >
                                {loading ? 'Buscando...' : 'Buscar 🔍'}
                            </button>
                        </div>
                    </form>
            </div>
        );
    }

    if (loading) {
        return <Loading message="Cargando reserva..." />;
    }

    if (!reserva) {
        return <div className="no-results">No se encontró la reserva solicitada.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <Link 
                    to="/reservas" 
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                    <FaArrowLeft />
                    Volver a búsqueda
                </Link>
                <Link 
                    to="/reservas/new" 
                    className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    <FaPlus className="inline mr-1" />
                    Nueva Reserva
                </Link>
            </div>
            <div className="bg-white shadow-md rounded overflow-hidden">
                <h2 className="text-3xl font-bold mb-6">Detalles de la Reserva</h2>
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4">ID</th>
                            <th className="text-left py-3 px-4">Fecha y Hora</th>
                            <th className="text-left py-3 px-4">Usuario ID</th>
                            <th className="text-left py-3 px-4">TimeBlock ID</th>
                            <th className="text-left py-3 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3 px-4">{reserva.id}</td>
                            <td className="py-3 px-4">{new Date(reserva.date).toISOString()}</td>
                            <td className="py-3 px-4">{reserva.userId}</td>
                            <td className="py-3 px-4">{reserva.timeBlockId}</td>
                            <td className="py-3 px-4">
                                <div className="flex justify-center gap-2">
                                    <button 
                                        onClick={() => navigate(`/reservas/${reserva.id}/edit`)} 
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <FaEdit className="inline mr-1" />
                                        Editar
                                    </button>
                                    <button 
                                        onClick={handleDeleteConfirm} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash className="inline mr-1" />
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservasPage


