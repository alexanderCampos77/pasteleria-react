import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CarritoPage({ carrito, setCarrito, usuarioActual }) {
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + item.precio, 0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const handleComprar = () => {
    if (!usuarioActual) {
      alert('Debes iniciar sesión para comprar.');
      navigate('/login');
    } else {
      alert(`¡Gracias por tu compra, ${usuarioActual.nombre}! (Simulación)`);
      vaciarCarrito();
    }
  };

  return (
    <Container className="my-5">
      <h2 className="font-pacifico">Tu Carrito</h2>
      {carrito.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: 'auto' }} />
                  </td>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end">
            <h4 className="mb-3">Total: ${calcularTotal().toLocaleString('es-CL')}</h4>
            <Button variant="danger" onClick={vaciarCarrito} className="me-2">
              Vaciar Carrito
            </Button>
            <Button variant="primary" onClick={handleComprar}>
              Comprar
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default CarritoPage;