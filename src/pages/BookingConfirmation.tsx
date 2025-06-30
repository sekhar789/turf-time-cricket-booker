
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Calendar, MapPin, Clock, Users, Phone, Mail } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    navigate("/");
    return null;
  }

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert("Receipt download functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">TurfCricket</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Your cricket slot has been successfully booked</p>
            <Badge variant="secondary" className="mt-2">
              Booking ID: {bookingData.bookingId}
            </Badge>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Venue Information */}
              <div className="border-b pb-4">
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">{bookingData.venue.name}</h3>
                    <p className="text-gray-600">{bookingData.venue.location}</p>
                    <p className="text-sm text-gray-500">{bookingData.venue.address}</p>
                  </div>
                </div>
              </div>

              {/* Booking Time & Ground */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{bookingData.slot}</p>
                    <p className="text-sm text-gray-600">
                      {bookingData.date?.toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{bookingData.ground}</p>
                    <p className="text-sm text-gray-600">
                      {bookingData.playerCount ? `${bookingData.playerCount} players` : 'Ground booking'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Player Details */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Contact Person</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">{bookingData.playerName}</p>
                    {bookingData.teamName && (
                      <p className="text-sm text-gray-600">Team: {bookingData.teamName}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {bookingData.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {bookingData.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Services */}
              {(bookingData.equipmentRental || bookingData.coachingSession) && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Additional Services</h4>
                  <div className="space-y-2">
                    {bookingData.equipmentRental && (
                      <div className="flex justify-between items-center">
                        <span>Equipment Rental</span>
                        <Badge variant="secondary">₹200</Badge>
                      </div>
                    )}
                    {bookingData.coachingSession && (
                      <div className="flex justify-between items-center">
                        <span>Coaching Session</span>
                        <Badge variant="secondary">₹500</Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Paid</span>
                  <span className="text-green-600">₹{bookingData.totalAmount}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Payment Method: {bookingData.paymentMethod?.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
              </div>

              {/* Special Requests */}
              {bookingData.specialRequests && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Special Requests</h4>
                  <p className="text-gray-600 text-sm">{bookingData.specialRequests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <p>Please arrive 15 minutes before your slot time for ground preparation</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <p>Carry a valid ID for verification at the venue</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <p>Cancellation is allowed up to 24 hours before the slot time</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <p>Contact the venue directly for any special arrangements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleDownloadReceipt}
              variant="outline" 
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button 
              onClick={() => navigate("/")}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Book Another Slot
            </Button>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8 p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Need help with your booking?</p>
            <p className="text-sm">
              Contact us at{" "}
              <a href="tel:+919876543210" className="text-green-600 font-medium">
                +91 98765 43210
              </a>{" "}
              or{" "}
              <a href="mailto:support@turfcricket.com" className="text-green-600 font-medium">
                support@turfcricket.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
