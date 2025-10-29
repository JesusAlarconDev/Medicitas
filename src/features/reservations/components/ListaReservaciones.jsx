import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@shared/components/Feedback/Loading';

export const ListaReservaciones = () => {
    const [reservaciones, setReservaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservaciones = async () => {
            try {
                const jwt_token = localStorage.getItem('userToken');
                if (!jwt_token) {
                    throw new Error('No autorizado. Por favor inicia sesión.');
                }

                const url = '/api/admin/reservations';
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener las reservaciones');
                }

                const data = await response.json();
                setReservaciones(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservaciones();
    }, []);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    if (loading) return <Loading message="Cargando reservaciones..." />;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Reservaciones</h1>
                <button
                    onClick={() => navigate('/bloques/crear')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Nuevo Bloque
                </button>
            </div>

            <div className="bg-white shadow-md rounded overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4">ID</th>
                            <th className="text-left py-3 px-4">Fecha y Hora</th>
                            <th className="text-left py-3 px-4">Usuario ID</th>
                            <th className="text-left py-3 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservaciones.length > 0 ? (
                            reservaciones.map((reserva) => (
                                <tr key={reserva.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">{reserva.id}</td>
                                    <td className="py-3 px-4">{formatDate(reserva.date)}</td>
                                    <td className="py-3 px-4">{reserva.userId}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => navigate(`/reservas/${reserva.id}`)}
                                            className="text-blue-500 hover:text-blue-700 mr-2"
                                        >
                                            Ver
                                        </button>
                                        <button
                                            onClick={() => navigate(`/reservas/${reserva.id}/edit`)}
                                            className="text-yellow-500 hover:text-yellow-700"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">
                                    No hay reservaciones disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListaReservaciones


