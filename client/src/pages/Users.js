import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getToken, getUser } from '../services/storage';

function Users({ history }) {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (getUser().role !== 'admin') {
      history.push('/');
    }
  }, [history]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        filterUsers(data);
        setLoading(false);
      } else {
        throw new Error('Erro ao carregar informações!');
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const filterUsers = (data) => {
    const users = data.filter(
      (user) =>
        user.name.toUpperCase().indexOf(query.toUpperCase()) > -1 ||
        user.email.toUpperCase().indexOf(query.toUpperCase()) > -1
    );
    setUsers(users);
  };

  const delUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        setMessage('Usuário deletado com sucesso!');
        clearState();
        loadUsers();
      } else {
        throw new Error('Erro ao atualizar dados!');
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ name, email, id, role }),
      });
      if (response.status === 200) {
        clearState();
        loadUsers();
        setMessage('Usuário atualizado com sucesso!');
      } else {
        throw new Error('Erro ao atualizar dados!');
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const clearState = () => {
    setName('');
    setEmail('');
    setRole('');
    setId('');
    setEdit(false);
    setDel(false);
    setLoading(false);
  };

  const prepareEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setId(user.id);
    setEdit(true);
  };

  const prepareDel = (user) => {
    setId(user.id);
    setDel(true);
  };

  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <h1>Users</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {message && <Message variant='info'>{message}</Message>}
          <Row className='py-2'>
            <Col md={6}>
              <Form.Group controlId={'email'}>
                <Form.Control
                  type='text'
                  placeholder='Pesquisar por e-mail ou nome'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button variant='primary' onClick={() => loadUsers()}>
                <i className='fas fa-search'></i>
              </Button>
            </Col>
          </Row>
          {loading ? (
            <Loader />
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Função</th>
                  <th style={{ textAlign: 'center' }}>Editar</th>
                  <th style={{ textAlign: 'center' }}>Deletar</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6}>Nenhum registro carregado...</td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td style={{ textAlign: 'center' }}>
                      <Button
                        size='sm'
                        variant='info'
                        onClick={() => prepareEdit(user)}
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Button
                        size='sm'
                        variant='danger'
                        onClick={() => prepareDel(user)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </main>
      </Container>
      <Footer />
      <Modal show={edit} onHide={() => setEdit(false)} size={'lg'}>
        <Modal.Header>
          <Modal.Title>Editar usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant='danger'>{error}</Message>}
          <Form.Group controlId={'name'}>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type='text'
              placeholder='Coloque o seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId={'email'} className='mt-2'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='email'
              placeholder='Coloque o seu e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId={'role'} className='mt-2'>
            <Form.Label>Função</Form.Label>
            <select
              className='form-select'
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value=''>Escolha uma opção</option>
              <option value='manager'>Manager</option>
              <option value='common'>Common</option>
            </select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setEdit(false)}>
            Fechar
          </Button>
          <Button variant='primary' onClick={updateUser}>
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={del} onHide={() => setDel(false)}>
        <Modal.Header>
          <Modal.Title>Deletar usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja deletar esse usuário?
          <br /> essa ação é permanente!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setDel(false)}>
            Não
          </Button>
          <Button variant='danger' onClick={delUser}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Users;
