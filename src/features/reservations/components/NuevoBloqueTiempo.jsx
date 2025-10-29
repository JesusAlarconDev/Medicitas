import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const NuevoBloqueTiempo = () => {
    const [formData, setFormData] = useState({
        startTime: '',
        endTime: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const jwt_token = localStorage.getItem('userToken');
            if (!jwt_token) {
                throw new Error('No autorizado. Por favor inicia sesión.');
            }

            const today = new Date().toISOString().split('T')[0];
            
            const formatTimeToISO = (timeStr) => {
                const [hours, minutes] = timeStr.split(':');
                const date = new Date(`${today}T${hours.padStart(2, '0')}:${minutes}:00`);
                return date.toISOString();
            };

            const response = await fetch('/api/admin/time-blocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt_token}`
                },
                body: JSON.stringify({
                    startTime: formatTimeToISO(formData.startTime),
                    endTime: formatTimeToISO(formData.endTime),
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el bloque de tiempo');
            }

            Swal.fire({
                title: "Bloque creado correctamente",
                icon: "success",
                draggable: true
            });
            navigate('/reservaciones');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Nuevo Bloque de Tiempo</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="px-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                        Hora de Inicio:
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                        Hora de Fin:
                    </label>
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-center mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="!bg-[#198bad] hover:!bg-[#14738f] transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar Bloque'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NuevoBloqueTiempo


