import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import LandingPage from '../sections/LandingPage';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Writing from '../sections/Writing';
import Talks from '../sections/Talks';

const IndexPage = () => (
  <Layout>
    <Header />
    <LandingPage />
    <About />
    <Projects />
    <Writing />
    <Talks />
  </Layout>
);

export default IndexPage;
