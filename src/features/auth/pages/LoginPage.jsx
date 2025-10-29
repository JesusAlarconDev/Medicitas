import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@features/auth/components/Auth";
import { Loading } from "@shared/components/Feedback/Loading";

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const {email, password} = formData;
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const LOGIN_URL = '/api/auth/login'; 

    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el inicio de sesión');
        }

        const data = await response.json();
        const jwtToken = data.token; 

        if (jwtToken) {
            loginWithToken(jwtToken);
            navigate('/');
        } else {
            throw new Error('El servidor no retornó un token.');
        }

    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <>
    <div className="bg-white p-8 pt-14 rounded-2xl shadow-xl w-84 h-110 bg-center pd-2 m-4 relative">

      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
        Bienvenido
      </h2>


      <form method="POST" onSubmit={handleLogin} >
        <img src="/Medi_citas_icon.png" alt="Ícono de Medi-citas" className="absolute -top-12 left-30 rounded-full w-24 mx-auto" />
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico:</label>
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
              placeholder="Ingresa tu Email"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Ingresa tu contraseña ... " 
          />
        </div>
        <div className="flex items-center justify-between">
            <button 
                type="submit" 
                disabled={loading}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline transition-colors ${
                  loading 
                    ? '!bg-gray-400 cursor-not-allowed' 
                    : '!bg-[#198bad] hover:!bg-[#14738f]'
                }`}
            >
              {loading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
    {loading && <Loading message="Iniciando sesión..." />}
    {error && <p className="text-red-500 mb-4">{error}</p>}
    </>
  )
}

export default LoginPage


