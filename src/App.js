import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './components/pages/Home/Home';
import NotFound from './components/pages/NotFound/NotFound';
import WaiterApp from './components/pages/WaiterApp/WaiterApp';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
//import { fetchTables } from './redux/tableReducer';
//import { useDispatch } from 'react-redux';
//import { useEffect } from 'react';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/waiter" element={<WaiterApp />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
