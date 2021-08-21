import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { storeToken, storeUser } from '../services/storage';

function Register({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const [loading] = useState('');

  const submitHandle = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        setMessage('Registrado com sucesso!');
        clearState();
        storeToken(data.token);
        const user = data;
        delete data.token;
        storeUser(user);
        history.push('/');
      } else if (response.status === 409) {
        throw new Error('Usuário já cadastrado!');
      } else {
        throw new Error('Erro ao se registrar!');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const clearState = () => {
    setError('');
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <FormContainer>
      <h1 className='mt-4'>Registrar</h1>

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
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='info'>{message}</Message>}
    </FormContainer>
  );
}

export default Register;
