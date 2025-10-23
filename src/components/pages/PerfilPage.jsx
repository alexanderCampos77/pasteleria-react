import React from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';

function PerfilPage({ usuarioActual }) {
  if (!usuarioActual) {
    return (
      <Container className="my-5">
        <p>Debes iniciar sesión para ver tu perfil.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: '30rem' }}>
        <Card.Header as="h2" className="font-pacifico text-center">Mi Perfil</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Nombre:</strong> {usuarioActual.nombre}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Correo Electrónico:</strong> {usuarioActual.email}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Edad:</strong> {usuarioActual.edad}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Fecha de Nacimiento:</strong> {usuarioActual.fechaNacimiento}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default PerfilPage;