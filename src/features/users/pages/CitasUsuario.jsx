import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@shared/components/Feedback/Loading';

export const CitasUsuario = () => {
    const [userId, setUserId] = useState('');
    const [citas, setCitas] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId.trim()) return;
        setCitas([]);
        
        setLoading(true);
        setError('');
        
        try {
            const jwt_token = localStorage.getItem('userToken');
            if (!jwt_token) {
                throw new Error('No autorizado. Por favor inicia sesión.');
            }

            const response = await fetch(`/api/users/${userId}/appointments`, {
                headers: {
                    'Authorization': `Bearer ${jwt_token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener las citas');
            }

            const data = await response.json();
            setCitas(data);
        } catch (err) {
            setError(err.message || 'Ocurrió un error al buscar las citas');
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Mis Citas</h1>
            
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingresa el ID de usuario"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="!bg-[#198bad] hover:!bg-[#14738f] transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? 'Buscando...' : 'Buscar Cita'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {citas && citas.length > 0 && (
                <div className="bg-white shadow-md rounded overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left py-3 px-4">Fecha y Hora</th>
                                <th className="text-left py-3 px-4">ID de Cita</th>
                                <th className="text-left py-3 px-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id} className="border-t">
                                    <td className="py-3 px-4">{formatDate(cita.date)}</td>
                                    <td className="py-3 px-4">{cita.id}</td>
                                    <td className="py-3 px-4">
                                        <button 
                                            onClick={() => navigate(`/reservas/${cita.id}`)}
                                            className="!bg-yellow-400 hover:!bg-yellow-300 transition-colors shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {!loading && citas && citas.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No se encontraron citas para este usuario.
                </div>
            )}
            {loading && <Loading message="Cargando citas..." />}
        </div>
    );
};

export default CitasUsuario


