import React from 'react'
import Header from './sections/Header';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Hero from './sections/Hero';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </>
  )
}

export default App