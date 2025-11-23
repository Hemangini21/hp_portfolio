import React from 'react';
import Layout from './Layout';
import Portfolio from './pages/Portfolio';
import lenis from './utils/lenis';
import './index.css';

function App() {
  return (
    <Layout>
      <Portfolio />
    </Layout>
  );
}

export default App;