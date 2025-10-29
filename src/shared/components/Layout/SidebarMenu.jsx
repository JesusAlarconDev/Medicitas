import React from 'react'
import { Link } from 'react-router-dom'

export const SidebarMenu = () => {
  return (
    <div className="flex w-64    fixed top-0 left-0 h-full z-10    h-screen flex-col justify-between border-e border-gray-100 bg-white">
      <div className="px-4 py-6">
        <Link to="/">
          <img src="/Medi_citas_icon.png" alt="Ícono de Medi-citas" className="rounded-full w-24 mx-auto" />
        </Link>

        <ul className="mt-6 space-y-1">
          <li>
            <Link
              to="/reservas"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Reservas
            </Link>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Admin </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    to="/reservaciones"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Ver Reservaciones
                  </Link>
                </li>

                <li>
                  <Link
                    to="/bloques/crear"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Crear nuevo Bloque de Tiempo
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary
                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="text-sm font-medium"> Usuario </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <Link
                    to="/citas"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Obtener citas del usuario
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarMenu


