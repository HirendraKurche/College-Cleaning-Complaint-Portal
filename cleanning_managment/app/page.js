import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyThisSystem from '../components/WhyThisSystem';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ComplaintList from '../components/ComplaintList';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900">
      {/* <Navbar /> */}
      <Hero />
      <About />
      <WhyThisSystem />
      <HowItWorks />
      <ComplaintList />
      <Testimonials />
    </main>
  );
}
