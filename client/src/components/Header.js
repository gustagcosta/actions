import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { clearStorage, getUser, isAuthenticated } from '../services/storage';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/login');
    }
  }, [history]);

  const logoutHandler = () => {
    clearStorage();
    history.push('/login');
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' collapseOnSelect expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Actions</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {getUser().role === 'admin' && (
                <LinkContainer to='/users'>
                  <Nav.Link>
                    <i className='fas fa-users'></i>
                    &nbsp;&nbsp;Usuários
                  </Nav.Link>
                </LinkContainer>
              )}
              {['admin', 'manager'].includes(getUser().role) && (
                <Nav.Link>
                  <i className='fas fa-plus-square'></i>
                  &nbsp;&nbsp;Nova Tarefa
                </Nav.Link>
              )}
              <NavDropdown title={<span><i className='fas fa-user'></i>&nbsp;&nbsp;{getUser().name}</span>} id='username'>
                <NavDropdown.Item onClick={logoutHandler}>
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
