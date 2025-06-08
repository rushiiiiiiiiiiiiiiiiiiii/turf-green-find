
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Clock, Star, ArrowRight } from "lucide-react";

const Home = () => {
  const [location, setLocation] = useState("");
  const [sport, setSport] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/turfs?location=${location}&sport=${sport}`);
  };

  const popularSports = [
    { name: "Football", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop" },
    { name: "Cricket", image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop" },
    { name: "Basketball", image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=300&fit=crop" },
    { name: "Tennis", image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop" },
  ];

  const featuredTurfs = [
    {
      id: 1,
      name: "Green Valley Sports Complex",
      location: "Mumbai, Maharashtra",
      price: "₹1,200/hour",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
      amenities: ["Parking", "Floodlights", "Changing Room"]
    },
    {
      id: 2,
      name: "Elite Football Arena",
      location: "Delhi, NCR",
      price: "₹1,500/hour",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop",
      amenities: ["AC Rooms", "Cafe", "Equipment"]
    },
    {
      id: 3,
      name: "Champions Cricket Ground",
      location: "Bangalore, Karnataka",
      price: "₹2,000/hour",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&h=300&fit=crop",
      amenities: ["Scoreboard", "Commentary", "Live Streaming"]
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Find Your Perfect
            <span className="block text-green-400">Sports Turf</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 animate-fade-in">
            Book premium sports facilities near you with instant confirmation
          </p>
          
          {/* Search Bar */}
          <Card className="glass-effect max-w-2xl mx-auto animate-scale-in">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-white/90 border-0 h-12"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Select sport"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="bg-white/90 border-0 h-12"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="btn-primary h-12 px-8 animate-pulse-green"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Sports */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Sports
            </h2>
            <p className="text-xl text-gray-600">
              Choose your favorite sport and find the best turfs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularSports.map((sport) => (
              <Card key={sport.name} className="hover-lift cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={sport.image} 
                      alt={sport.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                      {sport.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Turfs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Turfs
            </h2>
            <p className="text-xl text-gray-600">
              Top-rated sports facilities near you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTurfs.map((turf) => (
              <Card key={turf.id} className="hover-lift cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={turf.image} 
                      alt={turf.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{turf.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{turf.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{turf.location}</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">{turf.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {turf.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Button 
                      className="w-full btn-primary"
                      onClick={() => navigate(`/turf/${turf.id}`)}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-float">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-green-200">Turfs Listed</div>
            </div>
            <div className="animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-green-200">Happy Users</div>
            </div>
            <div className="animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-green-200">Cities Covered</div>
            </div>
            <div className="animate-float" style={{ animationDelay: "1.5s" }}>
              <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
              <div className="text-green-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
