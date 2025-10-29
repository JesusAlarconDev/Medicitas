# MediCitas - Sistema de Gestión de Citas Médicas

¡Hola Platzinautas! 💚👩‍💻👨‍💻 MediCitas es una aplicación desarrollada por mi persona para probar la API de citas médicas desarrollada en el curso de Express.js de Platzi. 🚀 En su version 1.0.0 está lista para probar todas las funcionalidades de la API tal cual terminado en el curso. En futuras versiones se agregara mas funcionalidades para que sea una aplicación completa, añadiendo las nuevas features propuestas al final del curso. Espero les sea de mucha utilidad.

## 🌐 Demo en Vivo

**¡Prueba la aplicación aquí!** 👉 [Ver Demo](https://medicitas-iota.vercel.app/)

### 🎥 Video Demostrativo

![Video Demostrativo](./public/videos/video_prueba.gif)

## 🚀 Características

- Programación de citas médicas
- Gestión de pacientes
- Interfaz intuitiva
- Autenticación utilizando JWT
- CRUD de reservas
- Listado de reservas y bloques de tiempo para Admins
- Obtener las citas/reservas de usuario segun su ID

## 📋 Requisitos Previos

- Node.js 16.0 o superior
- npm o yarn
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- La API construida en el curso de Express.js de Platzi, sea en local o subida en un servidor.

## 🛠️ Tecnologías

- **React 19 + Vite 7**
- **React Router DOM**
- **JavaScript (ESNext)**
- **TailwindCSS**
- **Íconos**: React Icons
- **Modales**: SweetAlert2
- **APIs**: Express.js y PostgreSQL

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/JesusAlarconDev/Medicitas.git]
   cd MediCitas
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura el proxy en el archivo vite.config.js:
   ```javascript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:3005', // Aca la URL de tu backend, sea en local o un servidor
         changeOrigin: true,
         secure: false,
       },
     },
   },
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## 🤝 Contribución

Si deseas contribuir, los pull request son bienvenidos. Para hacer un pull request, por favor, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd MediCitas
   ```

2. Crea una rama para tu pull request:
   ```bash
   git checkout -b nombre-de-tu-pull-request
   ```

3. Realiza los cambios que desees y commitalos:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   ```

4. Sube tu rama al repositorio remoto:
   ```bash
   git push origin nombre-de-tu-pull-request
   ```

5. Abre un pull request en GitHub.

## 👨‍💻 Autor

**Code with 💚 by Jesús Alarcón Maldonado** — [GitHub](https://github.com/JesusAlarconDev)

