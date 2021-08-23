import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { isAuthenticated } from '../services/storage';

function Home({ history }) {
  useEffect(() => {
    if (!isAuthenticated()) {
      history.push('/login');
    }
  }, [history]);

  return (
    <>
      <Header />
      <Container>
        <main className='py-3'></main>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
