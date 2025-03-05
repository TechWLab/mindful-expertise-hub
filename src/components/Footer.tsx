
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">E</span>
              </div>
              <span className="font-display font-semibold">
                ExpertiseStation
              </span>
            </Link>
            <p className="text-gray-600 mb-6 text-sm">
              Connect with top specialists and get AI-powered business insights to make better decisions.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Twitter className="h-4 w-4" />} />
              <SocialLink icon={<Linkedin className="h-4 w-4" />} />
              <SocialLink icon={<Facebook className="h-4 w-4" />} />
              <SocialLink icon={<Instagram className="h-4 w-4" />} />
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              <FooterLink label="Expert Booking" to="/experts" />
              <FooterLink label="AI Business Insights" to="/ai-insights" />
              <FooterLink label="Expert Directory" to="/directory" />
              <FooterLink label="Become an Expert" to="/join-as-expert" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink label="About Us" to="/about" />
              <FooterLink label="Careers" to="/careers" />
              <FooterLink label="Blog" to="/blog" />
              <FooterLink label="Press" to="/press" />
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                <span>support@expertisestation.com</span>
              </li>
              <li className="flex items-start text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                <span>123 Innovation Way, San Francisco, CA 94103</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ExpertiseStation. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink label="Terms" to="/terms" />
            <FooterLink label="Privacy" to="/privacy" />
            <FooterLink label="Cookies" to="/cookies" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ label, to }: { label: string; to: string }) => {
  return (
    <li>
      <Link to={to} className="text-gray-600 hover:text-blue-600 transition-colors">
        {label}
      </Link>
    </li>
  );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <a href="#" className="h-8 w-8 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors flex items-center justify-center text-gray-600">
      {icon}
    </a>
  );
};

export default Footer;
