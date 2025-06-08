
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, QrCode, MapPin, Users, Calendar, Clock, TrendingUp } from "lucide-react";

const OwnerDashboard = () => {
  const [myTurfs] = useState([
    {
      id: 1,
      name: "Green Valley Sports Complex",
      location: "Andheri West, Mumbai",
      sport: "Football",
      bookingsToday: 5,
      revenue: 7500,
      status: "active"
    },
    {
      id: 2,
      name: "Elite Cricket Ground",
      location: "Whitefield, Bangalore", 
      sport: "Cricket",
      bookingsToday: 3,
      revenue: 6000,
      status: "active"
    }
  ]);

  const [todayBookings] = useState([
    {
      id: "TF1640995200",
      customerName: "Rahul Sharma",
      phone: "+91-9876543210",
      timeSlot: "6:00 PM - 8:00 PM",
      turf: "Green Valley Sports Complex",
      status: "confirmed",
      checkedIn: false
    },
    {
      id: "TF1640908800",
      customerName: "Priya Patel",
      phone: "+91-9876543211",
      timeSlot: "4:00 PM - 6:00 PM", 
      turf: "Elite Cricket Ground",
      status: "confirmed",
      checkedIn: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Owner Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Manage your turfs and bookings
            </p>
          </div>
          <Button className="btn-primary mt-4 sm:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Add New Turf
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Turfs</p>
                  <p className="text-2xl font-bold text-primary">{myTurfs.length}</p>
                </div>
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
                  <p className="text-2xl font-bold text-primary">{todayBookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹13,500</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-primary">24</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="turfs" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="turfs">My Turfs ({myTurfs.length})</TabsTrigger>
            <TabsTrigger value="bookings">Today's Bookings ({todayBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="turfs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myTurfs.map((turf) => (
                <Card key={turf.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{turf.name}</CardTitle>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{turf.location}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">{turf.sport}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Today's Bookings</p>
                        <p className="text-xl font-bold text-primary">{turf.bookingsToday}</p>
                      </div>
                      <div className="text-center bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Today's Revenue</p>
                        <p className="text-xl font-bold text-blue-600">₹{turf.revenue}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Edit Turf
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <div className="space-y-4">
              {todayBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-4 items-center">
                      <div>
                        <h3 className="font-semibold">{booking.customerName}</h3>
                        <p className="text-sm text-gray-600">{booking.phone}</p>
                        <p className="text-sm text-gray-600">ID: {booking.id}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">{booking.turf}</p>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{booking.timeSlot}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        {booking.checkedIn ? (
                          <Badge className="bg-green-500">Checked In</Badge>
                        ) : (
                          <Badge variant="outline">Pending Check-in</Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        {!booking.checkedIn && (
                          <Button size="sm" className="btn-primary">
                            <QrCode className="w-4 h-4 mr-2" />
                            Scan QR
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
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

export default OwnerDashboard;
