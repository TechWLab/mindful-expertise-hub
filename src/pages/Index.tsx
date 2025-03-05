
import { useEffect } from 'react';
import { ArrowRight, Calendar, BarChart3, Users, Clock, Award, BookOpen, star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useIntersectionObserver } from '@/lib/motion';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChat from '@/components/AIChat';
import ExpertCard, { ExpertProps } from '@/components/ExpertCard';

// Sample expert data
const experts: ExpertProps[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Marketing Strategist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 120,
    expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking', 'Social Media'],
    availability: 'Available next week'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Financial Advisor',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80',
    rating: 4.8,
    reviewCount: 98,
    hourlyRate: 150,
    expertise: ['Investment Strategy', 'Retirement Planning', 'Tax Optimization', 'Risk Management'],
    availability: 'Available this week'
  },
  {
    id: '3',
    name: 'Priya Patel',
    title: 'UX/UI Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1161&q=80',
    rating: 4.7,
    reviewCount: 86,
    hourlyRate: 95,
    expertise: ['User Research', 'Interaction Design', 'Prototyping', 'Design Systems'],
    availability: 'Limited availability'
  }
];

const Index = () => {
  const { elementRef: featuresRef, hasIntersected: featuresVisible } = useIntersectionObserver({
    threshold: 0.1
  });
  
  const { elementRef: statsRef, hasIntersected: statsVisible } = useIntersectionObserver({
    threshold: 0.1
  });
  
  const { elementRef: testimonialsRef, hasIntersected: testimonialsVisible } = useIntersectionObserver({
    threshold: 0.1
  });
  
  useEffect(() => {
    // Welcome toast on first load
    toast.success("Welcome to ExpertiseStation!", {
      description: "Connect with experts and get AI insights",
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Featured Experts */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Featured Experts</h2>
              <p className="text-gray-600 text-lg">
                Connect with our hand-picked specialists for personalized guidance and solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experts.map(expert => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Link to="/experts">
                <Button variant="outline" size="lg" className="group">
                  Explore All Experts
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section 
          ref={featuresRef as React.RefObject<HTMLDivElement>}
          className="py-16 md:py-24 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <p className="text-blue-600 text-sm font-medium">
                  Why Choose ExpertiseStation
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Expert Guidance & AI Insights in One Platform
              </h2>
              <p className="text-gray-600 text-lg">
                Our unique approach combines human expertise with advanced AI to deliver comprehensive solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Calendar />}
                title="Easy Booking"
                description="Schedule sessions with experts in just a few clicks, with flexible time slots to fit your schedule."
                delay={0}
                isVisible={featuresVisible}
              />
              <FeatureCard 
                icon={<Users />}
                title="Vetted Experts"
                description="All our specialists undergo a rigorous verification process to ensure top-tier expertise and quality."
                delay={200}
                isVisible={featuresVisible}
              />
              <FeatureCard 
                icon={<BarChart3 />}
                title="AI Business Insights"
                description="Get instant AI-powered analysis and recommendations for your specific business questions."
                delay={400}
                isVisible={featuresVisible}
              />
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section 
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="py-16 md:py-24 bg-blue-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Transforming Business Decisions
              </h2>
              <p className="text-gray-600 text-lg">
                Join thousands of professionals making better decisions with our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard 
                number="5,000+"
                label="Active Users"
                delay={0}
                isVisible={statsVisible}
              />
              <StatCard 
                number="500+"
                label="Expert Specialists"
                delay={200}
                isVisible={statsVisible}
              />
              <StatCard 
                number="15,000+"
                label="Sessions Completed"
                delay={400}
                isVisible={statsVisible}
              />
              <StatCard 
                number="98%"
                label="Satisfaction Rate"
                delay={600}
                isVisible={statsVisible}
              />
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-[20%] left-[5%] w-40 h-40 rounded-full bg-blue-100 opacity-60 animate-pulse-light"></div>
          <div className="absolute bottom-[15%] right-[10%] w-60 h-60 rounded-full bg-blue-100 opacity-40 animate-pulse-light" style={{ animationDelay: '2s' }}></div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                How ExpertiseStation Works
              </h2>
              <p className="text-gray-600 text-lg">
                A simple process to connect with experts and get the insights you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard 
                number={1}
                icon={<Users />}
                title="Find Your Expert"
                description="Browse our curated network of specialists or use our smart matching system to find the perfect fit."
              />
              <StepCard 
                number={2}
                icon={<Calendar />}
                title="Book a Session"
                description="Schedule a one-on-one consultation at a time that works for you, with flexible duration options."
              />
              <StepCard 
                number={3}
                icon={<BookOpen />}
                title="Get Insights & Solutions"
                description="Receive personalized guidance and actionable advice to address your specific challenges."
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section 
          ref={testimonialsRef as React.RefObject<HTMLDivElement>}
          className="py-16 md:py-24 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                <p className="text-blue-600 text-sm font-medium">
                  Success Stories
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                What Our Users Say
              </h2>
              <p className="text-gray-600 text-lg">
                Hear from professionals who have transformed their businesses with ExpertiseStation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard 
                quote="The marketing expertise I accessed through this platform completely transformed our go-to-market strategy. ROI increased by 37% in just three months."
                name="David Wilson"
                title="CEO, TechStart Inc."
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                delay={0}
                isVisible={testimonialsVisible}
              />
              <TestimonialCard 
                quote="The AI business insights tool saved me countless hours of research and analysis. It highlighted market opportunities I hadn't even considered."
                name="Jennifer Lopez"
                title="Founder, Bloom Beauty"
                image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
                delay={200}
                isVisible={testimonialsVisible}
              />
              <TestimonialCard 
                quote="I was struggling with financial forecasting until I connected with an expert through ExpertiseStation. Their guidance was exactly what my business needed."
                name="Marcus Johnson"
                title="CFO, Urban Innovations"
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                delay={400}
                isVisible={testimonialsVisible}
              />
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 md:py-24 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                Ready to Elevate Your Business?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of professionals making smarter decisions with expert guidance and AI insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AIChat />
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay, isVisible }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 border border-gray-100 shadow-subtle transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold font-display mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label, delay, isVisible }: { 
  number: string; 
  label: string;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 text-center border border-gray-100 shadow-subtle transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-3xl md:text-4xl font-bold font-display text-blue-600 mb-2">{number}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const StepCard = ({ number, icon, title, description }: { 
  number: number; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="relative p-6">
      <div className="absolute top-0 left-0 text-8xl font-bold text-gray-50 -z-10 select-none">
        {number}
      </div>
      <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5 text-blue-500">
        {icon}
      </div>
      <h3 className="text-xl font-semibold font-display mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, name, title, image, delay, isVisible }: { 
  quote: string; 
  name: string; 
  title: string; 
  image: string;
  delay: number;
  isVisible: boolean;
}) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 border border-gray-100 shadow-subtle transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-6">
        {[1, 2, 3, 4, 5].map(s => (
          <star key={s} className="inline-block h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
        ))}
      </div>
      <blockquote className="mb-6 text-gray-700">"{quote}"</blockquote>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name}
          className="h-12 w-12 rounded-full object-cover mr-3"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
