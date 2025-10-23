import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/pages/Home.jsx';
import Registro from './components/pages/Registro.jsx';
import Contacto from './components/pages/Contacto.jsx';
import CarritoPage from './components/pages/CarritoPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import PerfilPage from './components/pages/PerfilPage.jsx';
import DetalleProducto from './components/pages/DetalleProducto.jsx';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto]);
  };

  const registrarUsuario = (nuevoUsuario) => {
    if (usuariosRegistrados.find(u => u.email === nuevoUsuario.email)) {
       throw new Error("El correo ya está registrado.");
    }
    const usuarioConId = { ...nuevoUsuario, id: Date.now() };
    setUsuariosRegistrados(prevUsuarios => [...prevUsuarios, usuarioConId]);
  };

  const iniciarSesion = (credenciales) => {
     const usuarioEncontrado = usuariosRegistrados.find(
       u => u.email === credenciales.email && u.nombre === credenciales.nombre
     );
     if (usuarioEncontrado) {
       setUsuarioActual(usuarioEncontrado);
       return true;
     }
     return false;
  };

   const cerrarSesion = () => {
       setUsuarioActual(null);
   };

  return (
    <div className="App">
      <Header
        carrito={carrito}
        usuario={usuarioActual}
        cerrarSesion={cerrarSesion}
      />
      <Routes>
        <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/registro" element={<Registro registrarUsuario={registrarUsuario} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/carrito"
          element={<CarritoPage carrito={carrito} setCarrito={setCarrito} usuarioActual={usuarioActual} />}
        />
        <Route path="/login" element={<LoginPage iniciarSesion={iniciarSesion} />} />
        <Route path="/perfil" element={<PerfilPage usuarioActual={usuarioActual} />} />
        <Route
            path="/producto/:id"
            element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
         />
      </Routes>
    </div>
  );
}

export default App;