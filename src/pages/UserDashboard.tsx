
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Download, CreditCard, QrCode, Star } from "lucide-react";
import QRCode from "qrcode.react";

const UserDashboard = () => {
  const [activeBookings] = useState([
    {
      id: "TF1640995200",
      turfName: "Green Valley Sports Complex",
      location: "Andheri West, Mumbai",
      date: "2024-01-15",
      time: "6:00 PM - 8:00 PM",
      totalAmount: 1500,
      paidAmount: 750,
      remainingAmount: 750,
      status: "confirmed",
      paymentStatus: "partial",
      sport: "Football"
    },
    {
      id: "TF1640908800",
      turfName: "Elite Football Arena",
      location: "Connaught Place, Delhi",
      date: "2024-01-18",
      time: "4:00 PM - 6:00 PM",
      totalAmount: 1500,
      paidAmount: 1500,
      remainingAmount: 0,
      status: "confirmed",
      paymentStatus: "completed",
      sport: "Football"
    }
  ]);

  const [pastBookings] = useState([
    {
      id: "TF1640822400",
      turfName: "Champions Cricket Ground",
      location: "Whitefield, Bangalore",
      date: "2024-01-10",
      time: "2:00 PM - 4:00 PM",
      totalAmount: 2000,
      paidAmount: 2000,
      remainingAmount: 0,
      status: "completed",
      paymentStatus: "completed",
      sport: "Cricket",
      rating: 5
    }
  ]);

  const handlePayRemaining = (bookingId: string, amount: number) => {
    // Mock payment for remaining amount
    console.log(`Processing payment for booking ${bookingId}: ₹${amount}`);
    // In real app, integrate with Razorpay
    alert(`Payment of ₹${amount} processed successfully!`);
  };

  const downloadQR = (bookingId: string) => {
    // Generate and download QR code
    const canvas = document.getElementById(`qr-${bookingId}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = `booking-${bookingId}.png`;
      a.href = url;
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage your bookings and payments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-primary">{activeBookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-primary">₹5,250</p>
                </div>
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                  <p className="text-2xl font-bold text-orange-600">₹750</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Games Played</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Bookings ({activeBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past Bookings ({pastBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-6">
              {activeBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{booking.turfName}</h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          <Badge variant="secondary">{booking.sport}</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="text-center bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">Booking QR Code</p>
                          <QRCode 
                            id={`qr-${booking.id}`}
                            value={`TurfFinder-${booking.id}`}
                            size={100}
                            level="H"
                          />
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => downloadQR(booking.id)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Booking ID</p>
                            <p className="font-mono text-sm">{booking.id}</p>
                          </div>
                          
                          <div className="bg-green-50 rounded-lg p-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Total:</span>
                              <span>₹{booking.totalAmount}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Paid:</span>
                              <span className="text-green-600">₹{booking.paidAmount}</span>
                            </div>
                            {booking.remainingAmount > 0 && (
                              <div className="flex justify-between text-sm font-semibold">
                                <span>Remaining:</span>
                                <span className="text-orange-600">₹{booking.remainingAmount}</span>
                              </div>
                            )}
                          </div>

                          {booking.remainingAmount > 0 ? (
                            <Button 
                              size="sm" 
                              className="w-full btn-primary"
                              onClick={() => handlePayRemaining(booking.id, booking.remainingAmount)}
                            >
                              Pay Remaining ₹{booking.remainingAmount}
                            </Button>
                          ) : (
                            <Badge className="w-full justify-center bg-green-500">
                              Fully Paid
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="space-y-6">
              {pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{booking.turfName}</h3>
                            <div className="flex items-center text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{booking.sport}</Badge>
                            <Badge className="bg-green-500">Completed</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-2 text-primary" />
                            <span>₹{booking.totalAmount} (Fully Paid)</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-sm text-gray-600">Booking ID</p>
                            <p className="font-mono text-sm">{booking.id}</p>
                          </div>
                          
                          {booking.rating && (
                            <div className="text-center">
                              <p className="text-sm text-gray-600 mb-1">Your Rating</p>
                              <div className="flex justify-center items-center">
                                {Array.from({length: 5}).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          <Button variant="outline" size="sm" className="w-full">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
