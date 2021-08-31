import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getToken } from '../services/storage';

function Home({ history }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        filterTasks(data);
        setLoading(false);
      } else {
        throw new Error('Erro ao carregar registros!');
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const filterTasks = (tasks) => {
    let filteredTasks = [...tasks];

    if (query !== '') {
      filteredTasks = tasks.filter(
        (task) => task.deadline.split('T')[0] === query
      );
    }

    setTasks(filteredTasks);
  };

  const doneTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        method: 'PATCH',
      });
      if (response.status === 200) {
        setMessage('Task concluída com sucesso!');
        loadTasks();
      } else {
        throw new Error('Erro ao concluir task!');
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <h2>Tarefas a se fazer</h2>
          {error && <Message variant='danger'>{error}</Message>}
          {message && <Message variant='info'>{message}</Message>}
          <Row className='py-2'>
            <Col md={6}>
              <Form.Group controlId={'email'}>
                <Form.Control
                  type='date'
                  placeholder='Pesquisar por data'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button variant='primary' onClick={loadTasks}>
                <i className='fas fa-search'></i>
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button variant='primary' onClick={() => setQuery('')}>
                <i className='fas fa-broom'></i>
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
                  <th>Descrição</th>
                  <th>Prazo</th>
                  <th>Atribuído por</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Concluir</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={6}>Nenhum registro encontrado...</td>
                  </tr>
                )}
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.description}</td>
                    <td>{format(new Date(task.deadline), 'dd / MM / yyyy')}</td>
                    <td>{task.manager}</td>
                    <td>{task.status}</td>
                    <td style={{ textAlign: 'center' }}>
                      {task.status === 'WIP' ? (
                        <Button
                          size='sm'
                          variant='info'
                          onClick={() => doneTask(task.id)}
                        >
                          <i className='fas fa-check'></i>
                        </Button>
                      ) : (
                        <span></span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
