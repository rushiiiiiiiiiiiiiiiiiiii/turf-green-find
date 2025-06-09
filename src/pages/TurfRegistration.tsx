
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Plus, X, Copy, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TurfRegistration = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{email: string, password: string} | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    sports: [] as string[],
    amenities: [] as string[],
    pricePerHour: "",
    description: "",
    images: [] as string[]
  });

  const availableSports = ["Football", "Cricket", "Badminton", "Tennis", "Basketball", "Box Cricket"];
  const availableAmenities = ["Parking", "Changing Room", "Floodlights", "Restroom", "Cafe", "Equipment Rental"];

  const handleSportToggle = (sport: string) => {
    setFormData(prev => ({
      ...prev,
      sports: prev.sports.includes(sport) 
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport]
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const generateCredentials = (email: string) => {
    // Generate a random password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return { email, password };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate login credentials for the turf owner
    const credentials = generateCredentials(formData.ownerEmail);
    setGeneratedCredentials(credentials);
    
    // TODO: Save turf data to Supabase
    console.log("Turf Registration Data:", formData);
    console.log("Generated Credentials:", credentials);
    
    setShowSuccess(true);
  };

  const copyCredentials = () => {
    if (generatedCredentials) {
      const text = `TurfFinder Login Credentials\nEmail: ${generatedCredentials.email}\nPassword: ${generatedCredentials.password}`;
      navigator.clipboard.writeText(text);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-4">Turf Registered Successfully!</h2>
              <p className="text-green-700 mb-6">
                The turf has been added to the platform. Below are the login credentials for the turf owner:
              </p>
              
              {generatedCredentials && (
                <Card className="bg-white border-green-300 mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Owner Login Credentials</h3>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-mono">{generatedCredentials.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Password:</span>
                        <span className="font-mono">{generatedCredentials.password}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={copyCredentials}
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Credentials
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setShowSuccess(false)} className="btn-primary">
                  Register Another Turf
                </Button>
                <Button onClick={() => navigate("/admin-dashboard")} variant="outline">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Register New Turf
          </h1>
          <p className="text-lg text-gray-600">
            Add a new sports turf to the platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Turf Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <Input
                  placeholder="Price per Hour (₹)"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({...formData, pricePerHour: e.target.value})}
                  required
                />
              </div>
              
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-md min-h-[100px]"
                required
              />
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Full Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
                <Input
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  required
                />
                <Input
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Owner Details */}
          <Card>
            <CardHeader>
              <CardTitle>Owner Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Owner Name"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  required
                />
                <Input
                  placeholder="Owner Email"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                  required
                />
                <Input
                  placeholder="Owner Phone"
                  value={formData.ownerPhone}
                  onChange={(e) => setFormData({...formData, ownerPhone: e.target.value})}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Sports Available */}
          <Card>
            <CardHeader>
              <CardTitle>Sports Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSports.map((sport) => (
                  <Badge
                    key={sport}
                    variant={formData.sports.includes(sport) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center ${
                      formData.sports.includes(sport) 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSportToggle(sport)}
                  >
                    {sport}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center ${
                      formData.amenities.includes(amenity) 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/admin-dashboard")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-primary flex-1">
              Register Turf
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TurfRegistration;
