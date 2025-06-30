
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Users, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  
  const [formData, setFormData] = useState({
    playerName: "",
    email: "",
    phone: "",
    teamName: "",
    playerCount: "",
    specialRequests: "",
    paymentMethod: "",
    equipmentRental: false,
    coachingSession: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    let total = bookingData?.price || 0;
    if (formData.equipmentRental) total += 200;
    if (formData.coachingSession) total += 500;
    return total;
  };

  const handleBookingSubmit = async () => {
    if (!formData.playerName || !formData.email || !formData.phone || !formData.paymentMethod) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Booking confirmed successfully!");
      navigate("/booking-confirmation", { 
        state: { 
          ...bookingData, 
          ...formData, 
          bookingId: "TC" + Math.random().toString(36).substr(2, 9).toUpperCase(),
          totalAmount: calculateTotal()
        } 
      });
    }, 2000);
  };

  if (!bookingData) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Complete Your Booking</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Player Details</CardTitle>
                <CardDescription>Enter the primary contact person details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="playerName">Full Name *</Label>
                    <Input
                      id="playerName"
                      value={formData.playerName}
                      onChange={(e) => handleInputChange("playerName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamName">Team Name (Optional)</Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => handleInputChange("teamName", e.target.value)}
                      placeholder="Enter team name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="playerCount">Number of Players</Label>
                  <Select value={formData.playerCount} onValueChange={(value) => handleInputChange("playerCount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of players" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                        <SelectItem key={num} value={num.toString()}>{num} Player{num > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    placeholder="Any special requirements or requests..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
                <CardDescription>Enhance your cricket experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equipment"
                    checked={formData.equipmentRental}
                    onCheckedChange={(checked) => handleInputChange("equipmentRental", checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="equipment" className="font-medium">Equipment Rental</Label>
                    <p className="text-sm text-gray-600">Cricket bats, balls, pads, and helmets</p>
                  </div>
                  <Badge variant="secondary">+₹200</Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="coaching"
                    checked={formData.coachingSession}
                    onCheckedChange={(checked) => handleInputChange("coachingSession", checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="coaching" className="font-medium">Coaching Session</Label>
                    <p className="text-sm text-gray-600">Professional cricket coaching during your slot</p>
                  </div>
                  <Badge variant="secondary">+₹500</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="wallet">Digital Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">{bookingData.venue.name}</p>
                      <p className="text-sm text-gray-600">{bookingData.venue.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{bookingData.ground}</p>
                      <p className="text-sm text-gray-600">Ground Selection</p>
                    </div>
                  </div>

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
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Ground Booking</span>
                    <span>₹{bookingData.price}</span>
                  </div>
                  
                  {formData.equipmentRental && (
                    <div className="flex justify-between">
                      <span>Equipment Rental</span>
                      <span>₹200</span>
                    </div>
                  )}
                  
                  {formData.coachingSession && (
                    <div className="flex justify-between">
                      <span>Coaching Session</span>
                      <span>₹500</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total Amount</span>
                    <span className="text-green-600">₹{calculateTotal()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleBookingSubmit}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Confirm & Pay ₹{calculateTotal()}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Your booking will be confirmed instantly after payment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
