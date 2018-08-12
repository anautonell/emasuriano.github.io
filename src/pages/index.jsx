import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LandingPage from '../sections/LandingPage';

const IndexPage = () => (
  <Layout>
    <Header />
    <LandingPage />
    <LandingPage />
  </Layout>
);

export default IndexPage;
