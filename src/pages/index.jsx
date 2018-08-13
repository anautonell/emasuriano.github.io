import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LandingPage from '../sections/LandingPage';
import About from '../sections/About';

const IndexPage = () => (
  <Layout>
    <Header />
    <LandingPage />
    <About />
  </Layout>
);

export default IndexPage;
