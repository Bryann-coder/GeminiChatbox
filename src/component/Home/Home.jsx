import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ladding from '../Ladding/Ladding'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast'

// App Component
const Home = () => {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', width:'100%'}}>
      <Toaster/>
      <Navbar />
      <Ladding/>
      <Footer />
    </div>
  );
};

export default Home;

