import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { clearStorage, getUser, isAuthenticated } from '../services/storage';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

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
              <NavDropdown
                title={isAuthenticated() ? getUser().name : 'Não autenticado'}
                id='username'
              >
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
