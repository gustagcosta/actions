import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { storeToken, storeUser } from '../services/storage';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading] = useState('');

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        const data = await response.json();
        clearState();
        storeToken(data.token);
        const user = data;
        delete data.token;
        storeUser(user);
        history.push('/');
      } else if (response.status === 404) {
        throw new Error('Usuário não encontrado!');
      } else {
        throw new Error('Erro ao logar!');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const clearState = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <FormContainer>
      <h1 className='mt-4'>Entrar</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandle}>
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
        <Button type='submit' className='mt-2' variant='primary'>
          Entrar
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Novo por aqui? <Link to={'/register'}>Registre-se</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;
