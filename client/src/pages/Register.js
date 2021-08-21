import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const submitHandle = (e) => {
    e.preventDefault();

    console.log('salve');
  };

  return (
    <FormContainer>
      <h1 className='mt-4'>Registrar</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandle}>
        <Form.Group controlId={'name'}>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type='text'
            placeholder='Coloque o seu nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={'email'}>
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type='email'
            placeholder='Coloque o seu e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={'password'}>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type='password'
            placeholder='Coloque a sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId={'confirmPassword'}>
          <Form.Label>Confirmação de senha</Form.Label>
          <Form.Control
            type='password'
            placeholder='Repita sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' className='mt-2' variant='primary'>
          Registrar
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Já é um usuário? <Link to={'/login'}>Entre</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Register;
