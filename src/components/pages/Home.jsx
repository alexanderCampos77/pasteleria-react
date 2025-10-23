import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProductos } from '../../db.js';

function Home({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProductos()
      .then(data => {
        setProductos(data);
      })
      .catch(err => {
        console.error("Error al cargar productos:", err);
      });
  }, []);

  const filteredProductos = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#ffc107' : '#e4e5e9' }}>
          ⭐
        </span>
      );
    }
    return stars;
  };

  return (
    <Container>
      <h2 className="my-4 font-pacifico">Nuestros Productos</h2>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar pastel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Row>
        {filteredProductos.map(producto => (
          <Col lg={3} md={4} sm={6} key={producto.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={producto.imagen}
                alt={producto.nombre}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <div className="mb-2">
                   {renderStars(producto.estrellas)}
                   <small className="text-muted ms-2">({producto.reseñas.length} reseñas)</small>
                </div>
                <Card.Text>
                  {producto.descripcion}
                </Card.Text>
                <h5 className="text-price mt-auto">${producto.precio.toLocaleString('es-CL')}</h5>
              </Card.Body>
              <Card.Footer className="d-flex flex-column gap-2">
                <Button
                  variant="success"
                  className="w-100 btn-custom-brown"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al Carrito
                </Button>
                <Button
                  as={Link}
                  to={`/producto/${producto.id}`}
                  variant="outline-secondary"
                  size="sm"
                  className="w-100"
                >
                  Ver Reseñas
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;