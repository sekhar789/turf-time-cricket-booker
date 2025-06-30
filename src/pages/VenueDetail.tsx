
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, Users, Star, Phone, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const VenueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedGround, setSelectedGround] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  // Mock venue data (in real app, fetch from API)
  const venue = {
    id: 1,
    name: "Cricket Zone Arena",
    location: "Bandra West, Mumbai",
    description: "Premium indoor cricket facility with state-of-the-art synthetic turf and professional lighting. Perfect for corporate tournaments, friendly matches, and practice sessions.",
    grounds: 3,
    priceRange: "₹800-1200/hour",
    rating: 4.5,
    reviews: 127,
    phone: "+91 98765 43210",
    email: "info@cricketzone.com",
    amenities: ["Parking", "Changing Room", "Equipment Rental", "Refreshments", "Air Conditioning", "Professional Lighting"],
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    address: "123 Cricket Street, Bandra West, Mumbai - 400050",
    timings: "6:00 AM - 11:00 PM",
    grounds_info: [
      { id: 1, name: "Ground A", capacity: "12 players", type: "Premium" },
      { id: 2, name: "Ground B", capacity: "16 players", type: "Standard" },
      { id: 3, name: "Ground C", capacity: "12 players", type: "Premium" }
    ]
  };

  const timeSlots = [
    { time: "06:00 AM", price: 800, available: true },
    { time: "07:00 AM", price: 800, available: true },
    { time: "08:00 AM", price: 900, available: false },
    { time: "09:00 AM", price: 900, available: true },
    { time: "10:00 AM", price: 1000, available: true },
    { time: "11:00 AM", price: 1000, available: true },
    { time: "12:00 PM", price: 1200, available: true },
    { time: "01:00 PM", price: 1200, available: false },
    { time: "02:00 PM", price: 1200, available: true },
    { time: "03:00 PM", price: 1000, available: true },
    { time: "04:00 PM", price: 1000, available: true },
    { time: "05:00 PM", price: 1200, available: true },
    { time: "06:00 PM", price: 1200, available: true },
    { time: "07:00 PM", price: 1200, available: false },
    { time: "08:00 PM", price: 1200, available: true },
    { time: "09:00 PM", price: 1000, available: true },
    { time: "10:00 PM", price: 800, available: true },
  ];

  const handleBooking = () => {
    if (!selectedGround || !selectedSlot) {
      toast.error("Please select a ground and time slot");
      return;
    }
    
    const slot = timeSlots.find(s => s.time === selectedSlot);
    navigate("/booking", { 
      state: { 
        venue, 
        ground: selectedGround, 
        slot: selectedSlot, 
        price: slot?.price,
        date: selectedDate 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Venues
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">TurfCricket</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Venue Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-3 gap-2">
                  <img src={venue.images[0]} alt="Main venue" className="col-span-2 h-64 object-cover rounded-tl-lg" />
                  <div className="space-y-2">
                    <img src={venue.images[1]} alt="Venue 2" className="h-[calc(50%-4px)] object-cover rounded-tr-lg" />
                    <img src={venue.images[2]} alt="Venue 3" className="h-[calc(50%-4px)] object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Venue Details */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{venue.name}</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {venue.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{venue.rating}</span>
                    <span className="text-gray-500">({venue.reviews} reviews)</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{venue.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Contact Information</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {venue.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {venue.email}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Venue Details</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {venue.timings}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {venue.grounds} Cricket Grounds
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map(amenity => (
                      <Badge key={amenity} variant="secondary">{amenity}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Available Grounds</h4>
                  <div className="grid gap-2">
                    {venue.grounds_info.map(ground => (
                      <div key={ground.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium">{ground.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({ground.capacity})</span>
                        </div>
                        <Badge variant={ground.type === "Premium" ? "default" : "secondary"}>
                          {ground.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Your Slot</CardTitle>
                <CardDescription>Select date, ground, and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                {/* Ground Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Ground</label>
                  <Select value={selectedGround} onValueChange={setSelectedGround}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a ground" />
                    </SelectTrigger>
                    <SelectContent>
                      {venue.grounds_info.map(ground => (
                        <SelectItem key={ground.id} value={ground.name}>
                          {ground.name} - {ground.type} ({ground.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Available Time Slots</label>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map(slot => (
                      <Button
                        key={slot.time}
                        variant={selectedSlot === slot.time ? "default" : "outline"}
                        size="sm"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot.time)}
                        className="flex flex-col h-auto py-2"
                      >
                        <span className="text-xs">{slot.time}</span>
                        <span className="text-xs font-bold">₹{slot.price}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {selectedSlot && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Selected Slot:</span>
                      <span className="font-semibold">{selectedSlot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Price:</span>
                      <span className="font-semibold text-green-600">
                        ₹{timeSlots.find(s => s.time === selectedSlot)?.price}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  disabled={!selectedGround || !selectedSlot}
                >
                  Proceed to Book
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
