
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, CheckCircle, XCircle, User, Calendar, Clock, MapPin } from "lucide-react";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock scan function
  const mockScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setScanResult({
        bookingId: "TF1640995200",
        customerName: "Rahul Sharma",
        phone: "+91-9876543210",
        turfName: "Green Valley Sports Complex",
        date: "2024-01-15",
        timeSlot: "6:00 PM - 8:00 PM",
        status: "confirmed",
        paymentStatus: "partial",
        paidAmount: 750,
        remainingAmount: 750,
        isValid: true
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleCheckIn = () => {
    // Mock check-in
    setScanResult({
      ...scanResult,
      checkedIn: true,
      checkInTime: new Date().toLocaleTimeString()
    });
    alert("Customer checked in successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            QR Code Scanner
          </h1>
          <p className="text-lg text-gray-600">
            Scan customer booking QR codes for check-in
          </p>
        </div>

        {/* Scanner Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-6">
                {isScanning ? (
                  <div className="animate-pulse">
                    <QrCode className="w-24 h-24 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold text-primary">Scanning...</p>
                  </div>
                ) : (
                  <div>
                    <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Click the button below to scan a QR code
                    </p>
                  </div>
                )}
              </div>
              
              <Button 
                className="btn-primary"
                onClick={mockScan}
                disabled={isScanning}
              >
                <QrCode className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Start Scan"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scan Result */}
        {scanResult && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Scan Result</CardTitle>
                {scanResult.isValid ? (
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid Booking
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="w-4 h-4 mr-1" />
                    Invalid
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {scanResult.isValid ? (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold">{scanResult.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold">{scanResult.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Booking ID</p>
                        <p className="font-mono text-sm">{scanResult.bookingId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Booking Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-600" />
                        <span>{scanResult.turfName}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                        <span>{scanResult.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-600" />
                        <span>{scanResult.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Payment Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Paid Amount</p>
                        <p className="text-lg font-bold text-green-600">₹{scanResult.paidAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Remaining</p>
                        <p className="text-lg font-bold text-orange-600">₹{scanResult.remainingAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge className={scanResult.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-orange-500'}>
                          {scanResult.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Check-in Status */}
                  {scanResult.checkedIn ? (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                      <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="font-semibold text-green-800">Customer Checked In</p>
                      <p className="text-sm text-green-600">Check-in time: {scanResult.checkInTime}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button 
                        className="btn-primary"
                        onClick={handleCheckIn}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Check In Customer
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Invalid QR Code</h3>
                  <p className="text-red-600">This QR code is not valid or has expired.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {!scanResult && (
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                  <p>Ask the customer to show their booking QR code</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                  <p>Click "Start Scan" and point the camera at the QR code</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                  <p>Verify the booking details and check in the customer</p>
                </div>
                <div className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                  <p>Remind customer about remaining payment after their session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
