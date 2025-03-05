
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollTrigger } from '@/lib/motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollTrigger({ threshold: 10 });
  const location = useLocation();
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-subtle' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">E</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-400 animate-pulse-light"></div>
            </div>
            <span className="font-display font-semibold text-lg">
              ExpertiseStation
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" currentPath={location.pathname} />
            <NavLink to="/experts" label="Find Experts" currentPath={location.pathname} />
            <NavLink to="/ai-insights" label="AI Insights" currentPath={location.pathname} />
            <NavLink to="/about" label="About" currentPath={location.pathname} />
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="font-medium">
              Sign In
            </Button>
            <Button size="sm" className="font-medium">
              Join Now
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6 absolute w-full top-full left-0 animate-fade-in shadow-md">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/experts" label="Find Experts" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/ai-insights" label="AI Insights" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/about" label="About" onClick={() => setIsMenuOpen(false)} />
            <div className="pt-4 flex flex-col space-y-3 border-t border-gray-100">
              <Button variant="outline" size="sm" className="w-full justify-center">
                Sign In
              </Button>
              <Button size="sm" className="w-full justify-center">
                Join Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label, currentPath }: { to: string; label: string; currentPath: string }) => {
  const isActive = to === "/" ? currentPath === "/" : currentPath.startsWith(to);
  
  return (
    <Link 
      to={to} 
      className={`relative font-medium transition-colors hover:text-primary ${
        isActive ? 'text-primary' : 'text-gray-700'
      } link-underline`}
    >
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-700 font-medium hover:text-primary transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
