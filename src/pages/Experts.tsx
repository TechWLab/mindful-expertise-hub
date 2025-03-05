
import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExpertCard, { ExpertProps } from '@/components/ExpertCard';
import AIChat from '@/components/AIChat';

// Expanded expert data
const expertsData: ExpertProps[] = [
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
  },
  {
    id: '4',
    name: 'James Wilson',
    title: 'Business Strategy Consultant',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    rating: 4.9,
    reviewCount: 157,
    hourlyRate: 180,
    expertise: ['Strategic Planning', 'Business Development', 'Market Analysis', 'Competitive Intelligence'],
    availability: 'Available next week'
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    title: 'Leadership Coach',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
    rating: 4.8,
    reviewCount: 112,
    hourlyRate: 135,
    expertise: ['Executive Coaching', 'Team Building', 'Leadership Development', 'Communication Skills'],
    availability: 'Available this week'
  },
  {
    id: '6',
    name: 'David Thompson',
    title: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    rating: 4.6,
    reviewCount: 78,
    hourlyRate: 110,
    expertise: ['Product Strategy', 'Agile Methodology', 'User Stories', 'Roadmapping'],
    availability: 'Limited availability'
  }
];

// Categories for filtering
const categories = [
  'Business Strategy',
  'Marketing',
  'Finance',
  'Design',
  'Product Management',
  'Leadership',
  'Technology',
  'Sales',
  'Operations'
];

const Experts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [experts, setExperts] = useState<ExpertProps[]>(expertsData);
  const [filteredExperts, setFilteredExperts] = useState<ExpertProps[]>(expertsData);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter experts based on search, categories, and price range
  useEffect(() => {
    let filtered = experts;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(expert => 
        expert.name.toLowerCase().includes(query) || 
        expert.title.toLowerCase().includes(query) ||
        expert.expertise.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(expert =>
        expert.expertise.some(skill => 
          selectedCategories.some(category => 
            skill.toLowerCase().includes(category.toLowerCase())
          )
        )
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(expert => 
      expert.hourlyRate >= priceRange[0] && expert.hourlyRate <= priceRange[1]
    );
    
    // Sort results
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredExperts(filtered);
  }, [searchQuery, selectedCategories, priceRange, sortBy, experts]);
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSortBy('recommended');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="bg-blue-50 py-12 md:py-16 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-4 animate-fade-in">
                Find the Perfect Expert
              </h1>
              <p className="text-gray-600 text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Connect with specialists who can provide the guidance and solutions you need.
              </p>
              
              <div className="max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by name, expertise, or role..."
                    className="pr-10 h-12 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter and results */}
        <div className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-6 bg-white rounded-xl border border-gray-100 shadow-subtle p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Categories</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={5}
                      value={priceRange}
                      onValueChange={handlePriceRangeChange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}+</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Availability</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="availability-this-week" />
                      <label htmlFor="availability-this-week" className="text-sm text-gray-700 cursor-pointer">
                        This Week
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="availability-next-week" />
                      <label htmlFor="availability-next-week" className="text-sm text-gray-700 cursor-pointer">
                        Next Week
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredExperts.length}</span> experts
                </p>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-xl overflow-hidden shadow-subtle border border-gray-100 animate-pulse">
                      <div className="h-48 bg-gray-200" />
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-2/3" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                        <div className="flex gap-2 mt-3">
                          <div className="h-6 bg-gray-200 rounded w-1/4" />
                          <div className="h-6 bg-gray-200 rounded w-1/4" />
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-10 bg-gray-200 rounded w-full mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredExperts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredExperts.map(expert => (
                    <ExpertCard key={expert.id} expert={expert} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
                  <p className="text-gray-500 mb-4">No experts match your search criteria.</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AIChat />
    </div>
  );
};

export default Experts;
