import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EditReserva = () => {
    const params = useParams();
    const id = params.id;
    const [formData, setFormData] = useState({
        date: '',
        timeBlockId: '',
        userId: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const jwt_token = localStorage.getItem('userToken');
                if (!jwt_token) {
                    throw new Error('No autorizado. Por favor inicia sesión.');
                }

                const response = await fetch(`/api/reservations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt_token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al cargar la reserva');
                }

                const data = await response.json();
                
                const dateObj = new Date(data.date);
                const formattedDate = dateObj.toISOString().split('T')[0];
                const hour = dateObj.getHours();
                const timeBlockId = hour - 8;

                setFormData({
                    date: formattedDate,
                    timeBlockId: timeBlockId.toString(),
                    userId: data.userId.toString()
                });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Error al cargar los datos de la reserva',
                    confirmButtonText: 'Aceptar'
                });
                navigate('/reservas');
            }
        };

        fetchReservation();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const jwt_token = localStorage.getItem('userToken');
            if (!jwt_token) {
                throw new Error('No autorizado. Por favor inicia sesión.');
            }

            const startHour = 8 + parseInt(formData.timeBlockId);
            const dateTime = new Date(formData.date);
            dateTime.setHours(startHour, 0, 0, 0);
            const formattedDate = dateTime.toISOString();

            const response = await fetch(`/api/reservations/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt_token}`
                },
                body: JSON.stringify({
                    date: formattedDate,
                    timeBlockId: parseInt(formData.timeBlockId),
                    userId: parseInt(formData.userId),
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear la reserva');
            }

            Swal.fire({
                title: "Cita editada correctamente",
                icon: "success",
                draggable: true
            });
            navigate('/reservas');
        } catch (err) {
            setError(err.message || 'Ocurrió un error al procesar la reserva');
        }
    };

    const timeSlots = [];
    for (let hour = 8; hour <= 20; hour++) {
        timeSlots.push({
            id: hour - 7,
            time: `${hour}:00 - ${hour + 1}:00`
        });
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Editar Reserva</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="px-8 pt-6 mb-4">
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                        Fecha de la cita:
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="timeBlockId" className="block text-gray-700 text-sm font-bold mb-2">
                        Hora:
                    </label>
                    <select
                        id="timeBlockId"
                        name="timeBlockId"
                        value={formData.timeBlockId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Selecciona una hora</option>
                        {timeSlots.map(slot => (
                            <option key={slot.id} value={slot.id}>
                                {slot.time}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
                        ID de Usuario:
                    </label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingresa el ID del usuario"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="timeBlockId" className="block text-gray-700 text-sm font-bold mb-2">
                        ID de TimeBlock:
                    </label>
                    <input
                        type="text"
                        id="timeBlockId"
                        name="timeBlockId"
                        value={formData.timeBlockId}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Ingresa el ID del timeBlock"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="!bg-[#198bad] hover:!bg-[#14738f] transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default EditReserva


