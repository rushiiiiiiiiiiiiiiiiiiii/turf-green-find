
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Clock, MapPin, Users, CreditCard, Shield } from "lucide-react";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Mock turf data
  const turf = {
    id: 1,
    name: "Green Valley Sports Complex",
    location: "Andheri West, Mumbai",
    sport: "Football",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=500&h=300&fit=crop"
  };

  const timeSlots = [
    { time: "6:00 AM - 8:00 AM", label: "Morning", price: 1000, available: true },
    { time: "8:00 AM - 10:00 AM", label: "Morning", price: 1000, available: true },
    { time: "12:00 PM - 2:00 PM", label: "Afternoon", price: 1200, available: true },
    { time: "2:00 PM - 4:00 PM", label: "Afternoon", price: 1200, available: true },
    { time: "4:00 PM - 6:00 PM", label: "Evening", price: 1500, available: true },
    { time: "8:00 PM - 10:00 PM", label: "Night", price: 1800, available: true },
  ];

  const selectedSlotData = timeSlots.find(slot => slot.time === selectedSlot);
  const totalAmount = selectedSlotData?.price || 0;
  const advanceAmount = Math.round(totalAmount * 0.5);
  const remainingAmount = totalAmount - advanceAmount;

  const handleRazorpayPayment = () => {
    // Mock Razorpay integration
    const options = {
      key: "rzp_test_key", // Replace with actual Razorpay key
      amount: advanceAmount * 100, // Amount in paise
      currency: "INR",
      name: "TurfFinder",
      description: `Booking for ${turf.name}`,
      image: "/logo.png",
      handler: function (response: any) {
        // Payment success
        console.log("Payment successful:", response);
        navigate("/payment/success", { 
          state: { 
            paymentId: response.razorpay_payment_id,
            bookingDetails: {
              turf: turf.name,
              date: selectedDate,
              slot: selectedSlot,
              amount: advanceAmount
            }
          }
        });
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone
      },
      theme: {
        color: "#22c55e"
      }
    };

    // In real implementation, load Razorpay script dynamically
    // const rzp = new window.Razorpay(options);
    // rzp.open();
    
    // For demo, redirect to success page
    setTimeout(() => {
      navigate("/payment/success", { 
        state: { 
          paymentId: "pay_demo123",
          bookingDetails: {
            turf: turf.name,
            date: selectedDate,
            slot: selectedSlot,
            amount: advanceAmount
          }
        }
      });
    }, 1000);
  };

  const isFormValid = userDetails.name && userDetails.email && userDetails.phone && selectedDate && selectedSlot && playerCount;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-lg text-gray-600">
            Secure your slot with 50% advance payment
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Turf Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={turf.image} 
                    alt={turf.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{turf.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{turf.location}</span>
                    </div>
                    <Badge variant="secondary" className="mt-2">{turf.sport}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time Slot Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Select Time Slot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.time}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedSlot === slot.time
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{slot.time}</div>
                          <div className="text-sm text-gray-600">{slot.label}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">₹{slot.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="players">Number of Players *</Label>
                    <Select value={playerCount} onValueChange={setPlayerCount}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select player count" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 22}, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>{num} Players</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements or requests..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{selectedDate.toLocaleDateString()}</span>
                  </div>
                )}
                
                {selectedSlot && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold">{selectedSlot}</span>
                  </div>
                )}
                
                {playerCount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Players:</span>
                    <span className="font-semibold">{playerCount}</span>
                  </div>
                )}

                <Separator />

                {selectedSlotData && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-semibold">₹{totalAmount}</span>
                    </div>
                    
                    <div className="flex justify-between text-primary">
                      <span>Advance Payment (50%):</span>
                      <span className="font-bold">₹{advanceAmount}</span>
                    </div>
                    
                    <div className="flex justify-between text-orange-600">
                      <span>Remaining Amount:</span>
                      <span className="font-semibold">₹{remainingAmount}</span>
                    </div>

                    <Separator />

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-semibold text-blue-800">Secure Payment</div>
                          <div className="text-blue-600">Pay remaining 50% after your game session</div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full btn-primary h-12"
                      onClick={handleRazorpayPayment}
                      disabled={!isFormValid}
                    >
                      Pay ₹{advanceAmount} Now
                    </Button>
                    
                    <div className="text-center text-xs text-gray-500">
                      Powered by Razorpay • Secure Payment
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
