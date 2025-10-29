import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const {name, email, password} = formData;
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const REGISTER_URL = '/api/auth/register'; 

    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el registro');
        }

        await response.json();
        Swal.fire(
            'Registro exitoso',
            'Redirigiendo a login...',
            'success'
        );
        navigate('/login');

    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <>
    <div className="bg-white p-8 pt-14 rounded-lg shadow-xl w-84 h-130 bg-center m-4 relative">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        Crear Cuenta
      </h2>

      <form onSubmit={handleRegister}>
        <img 
          src="/Medi_citas_icon.png" 
          alt="Ícono de Medi-citas" 
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 rounded-full w-24 h-24 object-cover border-4 border-white shadow-md" 
        />
        
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre y Apellido:
          </label>
          <input 
            type="text" 
            name="name" 
            value={name}
            onChange={(e) => setFormData({
              ...formData,
              name: e.target.value
            })} 
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Correo Electrónico:
          </label>
          <input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setFormData({
              ...formData,
              email: e.target.value
            })} 
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Ingresa tu correo electrónico"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setFormData({
              ...formData,
              password: e.target.value
            })} 
            name="password"
            required
            minLength="6"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Crea una contraseña segura" 
          />
        </div>

        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline !bg-[#198bad] hover:!bg-[#14738f] transition-colors"
          >
            Registrarse
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>

    {error && <p className="text-red-500 mb-4">Ocurrió un error</p>}

    </>
  );
};

export default RegisterPage


