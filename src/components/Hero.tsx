
import { useEffect, useRef, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMouse } from '@/lib/motion';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMouse();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Create and animate expertise spheres
    const createExpertiseSpheres = () => {
      const hero = heroRef.current;
      if (!hero) return;
      
      // Clear existing spheres
      const existingSpheres = hero.querySelectorAll('.expertise-sphere');
      existingSpheres.forEach(sphere => sphere.remove());
      
      // Create new spheres
      const sphereCount = 5;
      const sphereSizes = [80, 120, 150, 100, 70];
      const delays = [0, 2, 4, 1, 3];
      
      for (let i = 0; i < sphereCount; i++) {
        const sphere = document.createElement('div');
        sphere.classList.add('expertise-sphere');
        
        // Randomize position within constraints
        const size = sphereSizes[i];
        const top = 5 + Math.random() * 60; // 5% to 65% from top
        const left = 5 + Math.random() * 80; // 5% to 85% from left
        const delay = delays[i];
        
        sphere.style.width = `${size}px`;
        sphere.style.height = `${size}px`;
        sphere.style.top = `${top}%`;
        sphere.style.left = `${left}%`;
        sphere.style.animationDelay = `${delay}s`;
        sphere.style.zIndex = '0';
        
        hero.appendChild(sphere);
      }
    };
    
    createExpertiseSpheres();
    
    // Recreate spheres on window resize
    window.addEventListener('resize', createExpertiseSpheres);
    
    return () => {
      window.removeEventListener('resize', createExpertiseSpheres);
    };
  }, []);
  
  // Move spheres slightly based on mouse position
  useEffect(() => {
    if (!mounted) return;
    
    const spheres = document.querySelectorAll('.expertise-sphere');
    const hero = heroRef.current;
    
    if (!hero || !spheres.length) return;
    
    const heroRect = hero.getBoundingClientRect();
    const centerX = heroRect.left + heroRect.width / 2;
    const centerY = heroRect.top + heroRect.height / 2;
    
    const moveX = (mousePosition.x - centerX) / 50;
    const moveY = (mousePosition.y - centerY) / 50;
    
    spheres.forEach((sphere, index) => {
      const element = sphere as HTMLElement;
      const multiplier = (index % 2 === 0) ? 1 : -1;
      element.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px)`;
    });
  }, [mousePosition, mounted]);
  
  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 py-12 md:py-24 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-blue-600 text-sm font-medium">
              Connect with Top Specialists & AI Insights
            </p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in text-balance" style={{ animationDelay: '0.4s' }}>
            Expert Guidance for <span className="text-gradient">Every Decision</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in text-balance" style={{ animationDelay: '0.6s' }}>
            Book personalized sessions with industry specialists or get instant AI-powered business insights to make informed decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
              <Input 
                type="text" 
                placeholder="What expertise are you looking for?" 
                className="pr-10 h-12 border-2 bg-white/80 backdrop-blur-xs focus:border-blue-400 focus:ring-blue-400"
              />
              <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            <Button className="w-full sm:w-auto h-12 px-6">
              Find Experts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
            {['Business Strategy', 'Marketing & Growth', 'Technical Experts'].map((category, index) => (
              <div 
                key={category}
                className="glass-panel rounded-xl p-4 flex flex-col items-center justify-center"
              >
                <p className="text-sm md:text-base font-medium text-center">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-50 to-transparent z-0"></div>
    </div>
  );
};

export default Hero;
