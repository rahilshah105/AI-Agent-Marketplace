import React from 'react';
import Footer from '../../components/user/Footer';
import Hero from '../../components/user/Hero';
import Companies from '../../components/user/Companies';
import AgentsSection from '../../components/user/AgentsSection';
import TestimonialsSection from '../../components/user/TestimonialsSection';
import CallToAction from '../../components/user/CallToAction';
import AgentShowcase from '../../components/user/AgentShowcase';

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center">
      <Hero />
      <Companies />
      <AgentShowcase/>
      <TestimonialsSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
