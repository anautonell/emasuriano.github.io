import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Writing from '../sections/Writing';
import Footer from '../components/Footer';
import './styles.css';

const IndexPage = () => (
  <React.Fragment>
    <div class="triangle" />
    <div class="triangle-2" />
    <div class="triangle-3" />
    <Layout>
      <Header />
      <Landing />
      <About />
      <Projects />
      <Writing />
      <Footer />
    </Layout>
  </React.Fragment>
);

export default IndexPage;
