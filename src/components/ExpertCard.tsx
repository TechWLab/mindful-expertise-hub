
import { useState } from 'react';
import { Calendar, Clock, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/lib/motion';

export interface ExpertProps {
  id: string;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  expertise: string[];
  availability: string;
}

const ExpertCard = ({ expert }: { expert: ExpertProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px 100px 0px'
  });
  
  return (
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`relative rounded-xl overflow-hidden transform transition-all duration-300 ${
        hasIntersected ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${isHovered ? 'shadow-lg scale-[1.02]' : 'shadow-subtle'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={expert.image} 
            alt={expert.name} 
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <div className="flex items-center bg-white/90 backdrop-blur-xs rounded-full px-2 py-1">
              <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" fill="currentColor" />
              <span className="text-sm font-medium">{expert.rating.toFixed(1)}</span>
              <span className="text-xs text-gray-500 ml-1">({expert.reviewCount})</span>
            </div>
            <div className="bg-white/90 backdrop-blur-xs rounded-full px-2 py-1">
              <p className="text-sm font-medium">${expert.hourlyRate}/hr</p>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-display font-semibold text-xl mb-1">{expert.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{expert.title}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {expert.expertise.slice(0, 3).map((skill) => (
              <span 
                key={skill} 
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {expert.expertise.length > 3 && (
              <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                +{expert.expertise.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{expert.availability}</span>
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">Book Session</Button>
            <Button variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;
