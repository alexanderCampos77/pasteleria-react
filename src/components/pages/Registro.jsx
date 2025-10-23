// src/components/pages/Registro.jsx (Updated)
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

// 1. Receive registrarUsuario function
function Registro({ registrarUsuario }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    telefono: '',
    fechaNacimiento: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [registrationError, setRegistrationError] = useState(''); // For existing email error

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const validarFormulario = () => {
    // (Validation logic remains the same...)
    const { nombre, email, edad, telefono, fechaNacimiento } = formData;
    const newErrors = {};
    if (!nombre) newErrors.nombre = 'El nombre es obligatorio.';
    if (!email.includes('@')) newErrors.email = 'El correo debe incluir un "@".';
    if (!edad) newErrors.edad = 'La edad es obligatoria.';
    else if (parseInt(edad) < 13) newErrors.edad = 'Debes ser mayor de 13 años.';
    if (!telefono) newErrors.telefono = 'El teléfono es obligatorio.';
    else if (!/^\d{9}$/.test(telefono)) newErrors.telefono = 'El teléfono debe tener 9 dígitos.';
    if (!fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
    else {
      const hoy = new Date();
      const fechaNac = new Date(fechaNacimiento);
      let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) edadCalculada--;
      if (edadCalculada !== parseInt(edad)) newErrors.fechaNacimiento = 'La fecha de nacimiento no coincide con la edad ingresada.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setRegistrationError(''); // Clear previous registration error
    const newErrors = validarFormulario();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
         // 2. Call registrarUsuario from App.jsx
         registrarUsuario(formData);
         setSuccessMessage(`¡Registro exitoso! ¡Bienvenido/a, ${formData.nombre}! Puedes iniciar sesión.`);
         // Optionally clear the form:
         // setFormData({ nombre: '', email: '', edad: '', telefono: '', fechaNacimiento: ''});
      } catch (error) {
         // Handle registration error (like existing email)
         setRegistrationError(error.message);
      }
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Regístrate</h2>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {registrationError && <Alert variant="danger">{registrationError}</Alert>} {/* Show registration error */}
          <Form noValidate onSubmit={handleSubmit}>
            {/* Form Groups remain the same... */}
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre completo *</Form.Label>
              <Form.Control type="text" value={formData.nombre} onChange={handleChange} isInvalid={!!errors.nombre}/>
              <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
               <Form.Label>Correo electrónico *</Form.Label>
               <Form.Control type="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email || !!registrationError}/>
               <Form.Control.Feedback type="invalid">{errors.email || registrationError}</Form.Control.Feedback> {/* Show validation or registration error */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="edad">
              <Form.Label>Edad</Form.Label>
              <Form.Control type="number" value={formData.edad} onChange={handleChange} isInvalid={!!errors.edad}/>
              <Form.Control.Feedback type="invalid">{errors.edad}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" value={formData.telefono} onChange={handleChange} isInvalid={!!errors.telefono}/>
              <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fechaNacimiento">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control type="date" value={formData.fechaNacimiento} onChange={handleChange} isInvalid={!!errors.fechaNacimiento}/>
              <Form.Control.Feedback type="invalid">{errors.fechaNacimiento}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registro;