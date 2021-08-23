import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Home({ history }) {
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
