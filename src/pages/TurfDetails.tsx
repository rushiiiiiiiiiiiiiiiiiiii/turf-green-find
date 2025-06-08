
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Clock, Users, Wifi, Car, Camera, Phone, Mail, ArrowRight } from "lucide-react";

const TurfDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock data - in real app, fetch based on ID
  const turf = {
    id: 1,
    name: "Green Valley Sports Complex",
    location: "Andheri West, Mumbai, Maharashtra",
    sport: "Football",
    price: 1200,
    rating: 4.8,
    reviews: 156,
    description: "A premium football turf with natural grass and modern facilities. Perfect for professional matches and training sessions. Our facility offers a world-class experience with proper drainage, floodlights, and spectator seating.",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800&h=600&fit=crop"
    ],
    amenities: [
      { icon: Car, name: "Free Parking", description: "Ample parking space for 50+ vehicles" },
      { icon: Camera, name: "Floodlights", description: "Professional LED floodlights for night games" },
      { icon: Users, name: "Changing Rooms", description: "Separate changing rooms with lockers" },
      { icon: Wifi, name: "WiFi", description: "High-speed internet connectivity" },
      { icon: Clock, name: "24/7 Available", description: "Open round the clock" },
      { icon: Users, name: "Refreshments", description: "On-site cafe and refreshment center" }
    ],
    timeSlots: [
      { time: "6:00 AM - 8:00 AM", label: "Morning", price: 1000, available: true },
      { time: "8:00 AM - 10:00 AM", label: "Morning", price: 1000, available: true },
      { time: "10:00 AM - 12:00 PM", label: "Morning", price: 1200, available: false },
      { time: "12:00 PM - 2:00 PM", label: "Afternoon", price: 1200, available: true },
      { time: "2:00 PM - 4:00 PM", label: "Afternoon", price: 1200, available: true },
      { time: "4:00 PM - 6:00 PM", label: "Evening", price: 1500, available: true },
      { time: "6:00 PM - 8:00 PM", label: "Evening", price: 1500, available: false },
      { time: "8:00 PM - 10:00 PM", label: "Night", price: 1800, available: true },
    ],
    owner: {
      name: "Raj Sports Management",
      phone: "+91 98765 43210",
      email: "contact@rajsports.com",
      rating: 4.7
    },
    rules: [
      "No metal studs allowed on the turf",
      "Smoking and alcohol strictly prohibited",
      "Players must wear appropriate sports attire",
      "Maximum 22 players allowed per session",
      "Booking cancellation allowed up to 4 hours before the slot"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Home</span>
            <span>/</span>
            <span>Turfs</span>
            <span>/</span>
            <span className="text-primary">{turf.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {turf.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{turf.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>{turf.rating} ({turf.reviews} reviews)</span>
                </div>
                <Badge variant="secondary">{turf.sport}</Badge>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">₹{turf.price}/hour</div>
                <div className="text-sm text-gray-500">Starting price</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={turf.images[selectedImageIndex]} 
                    alt={turf.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {turf.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${turf.name} ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                          selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About this turf</h3>
                    <p className="text-gray-600 leading-relaxed">{turf.description}</p>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          <span>{turf.owner.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-primary" />
                          <span>{turf.owner.email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="amenities" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Available Amenities</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {turf.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                          <amenity.icon className="w-5 h-5 text-primary mt-1" />
                          <div>
                            <div className="font-semibold">{amenity.name}</div>
                            <div className="text-sm text-gray-600">{amenity.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rules" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Turf Rules & Guidelines</h3>
                    <ul className="space-y-3">
                      {turf.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-gray-600">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">User {review}</div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm">4.8</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Great facility with excellent maintenance. The turf quality is amazing and staff is very helpful.
                          </p>
                          <div className="text-xs text-gray-400 mt-2">2 days ago</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Book Your Slot</h3>
                
                <div className="space-y-3 mb-6">
                  {turf.timeSlots.map((slot, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        slot.available 
                          ? 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer' 
                          : 'border-gray-200 bg-gray-50 opacity-50'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-sm">{slot.time}</div>
                        <div className="text-xs text-gray-600">{slot.label}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">₹{slot.price}</div>
                        <div className="text-xs">
                          {slot.available ? (
                            <span className="text-green-600">Available</span>
                          ) : (
                            <span className="text-red-600">Booked</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full btn-primary h-12"
                  onClick={() => navigate(`/booking/${turf.id}`)}
                >
                  Proceed to Book
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  Pay only 50% to confirm booking
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
