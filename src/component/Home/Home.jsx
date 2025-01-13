import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ladding from '../Ladding/Ladding'
import Footer from '../Footer/Footer'

// App Component
const Home = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', width:'100%'}}>
      <Navbar />
      <Ladding/>
      <Footer />
    </div>
  );
};

export default Home;

