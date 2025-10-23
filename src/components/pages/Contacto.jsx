import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Modal } from 'react-bootstrap';

function Contacto() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace('contact', '').toLowerCase()]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCloseModal = () => setShowSuccessModal(false);

  return (
    <>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <h2 className="font-pacifico mb-4">Contáctanos</h2>
            <p>
              ¿Tienes alguna pregunta o quieres hacer un pedido especial?
              ¡No dudes en contactarnos!
            </p>
            <p>
              <strong>Dirección:</strong> barranca 123, San Antonio, Valparaíso
            </p>
            <p>
              <strong>Teléfono:</strong> +56 9 89861954
            </p>
            <p>
              <strong>Correo Electrónico:</strong> contacto@milsabores.cl
            </p>
          </Col>
          <Col md={6}>
            <h3 className="font-pacifico mb-4">Envíanos un Mensaje</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="contactName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                 />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Tu correo"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="contactMessage">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí"
                  value={formData.message}
                  onChange={handleChange}
                  required
                 />
              </Form.Group>
              <Button type="submit" className="btn-custom-brown">
                Enviar Mensaje
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={showSuccessModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje Enviado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu mensaje ha sido enviado con éxito (simulación).</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Contacto;