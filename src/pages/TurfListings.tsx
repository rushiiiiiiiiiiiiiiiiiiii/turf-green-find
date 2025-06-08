
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter, Clock } from "lucide-react";

const TurfListings = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    sport: searchParams.get("sport") || "",
    priceRange: "",
    sortBy: "rating"
  });

  const turfs = [
    {
      id: 1,
      name: "Green Valley Sports Complex",
      location: "Andheri, Mumbai",
      sport: "Football",
      price: 1200,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
      amenities: ["Parking", "Floodlights", "Changing Room", "Refreshments"],
      availability: "Available"
    },
    {
      id: 2,
      name: "Elite Football Arena",
      location: "Connaught Place, Delhi",
      sport: "Football",
      price: 1500,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop",
      amenities: ["AC Rooms", "Cafe", "Equipment", "Coach Available"],
      availability: "Available"
    },
    {
      id: 3,
      name: "Champions Cricket Ground",
      location: "Whitefield, Bangalore",
      sport: "Cricket",
      price: 2000,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&h=300&fit=crop",
      amenities: ["Scoreboard", "Commentary", "Live Streaming", "Medical Aid"],
      availability: "Busy"
    },
    {
      id: 4,
      name: "Royal Tennis Courts",
      location: "Bandra, Mumbai",
      sport: "Tennis",
      price: 800,
      rating: 4.6,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=500&h=300&fit=crop",
      amenities: ["Professional Courts", "Equipment Rental", "Coaching"],
      availability: "Available"
    },
    {
      id: 5,
      name: "Metro Basketball Arena",
      location: "Gurgaon, Delhi NCR",
      sport: "Basketball",
      price: 1000,
      rating: 4.5,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop",
      amenities: ["Indoor Courts", "AC", "Spectator Seating"],
      availability: "Available"
    },
    {
      id: 6,
      name: "City Sports Hub",
      location: "Koramangala, Bangalore",
      sport: "Football",
      price: 1300,
      rating: 4.4,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop",
      amenities: ["Multiple Grounds", "Parking", "Canteen"],
      availability: "Available"
    }
  ];

  const filteredTurfs = turfs.filter(turf => {
    const matchesLocation = !filters.location || turf.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesSport = !filters.sport || turf.sport.toLowerCase().includes(filters.sport.toLowerCase());
    const matchesPrice = !filters.priceRange || 
      (filters.priceRange === "low" && turf.price < 1000) ||
      (filters.priceRange === "medium" && turf.price >= 1000 && turf.price < 1500) ||
      (filters.priceRange === "high" && turf.price >= 1500);
    
    return matchesLocation && matchesSport && matchesPrice;
  });

  const sortedTurfs = [...filteredTurfs].sort((a, b) => {
    switch (filters.sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Sports Turfs
          </h1>
          <p className="text-lg text-gray-600">
            Discover and book the best sports facilities in your area
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                  className="h-10"
                />
              </div>
              <div>
                <Input
                  placeholder="Select sport"
                  value={filters.sport}
                  onChange={(e) => setFilters({...filters, sport: e.target.value})}
                  className="h-10"
                />
              </div>
              <div>
                <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Prices</SelectItem>
                    <SelectItem value="low">Under ₹1,000</SelectItem>
                    <SelectItem value="medium">₹1,000 - ₹1,500</SelectItem>
                    <SelectItem value="high">Above ₹1,500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value})}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg text-gray-600">
            {sortedTurfs.length} turfs found
          </div>
        </div>

        {/* Turf Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sortedTurfs.map((turf) => (
            <Card key={turf.id} className="hover-lift cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={turf.image} 
                    alt={turf.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${turf.availability === 'Available' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                      {turf.availability}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{turf.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{turf.sport}</Badge>
                    <span className="text-2xl font-bold text-primary">₹{turf.price}/hr</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{turf.name}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{turf.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">{turf.rating} ({turf.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {turf.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                    {turf.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{turf.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/turf/${turf.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      className="flex-1 btn-primary"
                      onClick={() => navigate(`/booking/${turf.id}`)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTurfs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No turfs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TurfListings;
