
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad"
  ];

  const venues = [
    {
      id: 1,
      name: "Cricket Zone Arena",
      location: "Bandra West, Mumbai",
      grounds: 3,
      priceRange: "₹800-1200/hour",
      rating: 4.5,
      reviews: 127,
      amenities: ["Parking", "Changing Room", "Equipment", "Refreshments"],
      image: "/placeholder.svg",
      city: "Mumbai"
    },
    {
      id: 2,
      name: "Sports Hub Cricket",
      location: "Koramangala, Bangalore",
      grounds: 2,
      priceRange: "₹600-1000/hour",
      rating: 4.3,
      reviews: 89,
      amenities: ["Parking", "Changing Room", "Coaching"],
      image: "/placeholder.svg",
      city: "Bangalore"
    },
    {
      id: 3,
      name: "Champions Cricket Club",
      location: "Gurgaon, Delhi NCR",
      grounds: 4,
      priceRange: "₹900-1500/hour",
      rating: 4.7,
      reviews: 203,
      amenities: ["Parking", "Changing Room", "Equipment", "Refreshments", "AC"],
      image: "/placeholder.svg",
      city: "Delhi"
    }
  ];

  const filteredVenues = venues.filter(venue => 
    (!selectedCity || venue.city === selectedCity) &&
    (!searchQuery || venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     venue.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">TC</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">TurfCricket</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Book Your Perfect
            <span className="text-green-600"> Cricket </span>
            Experience
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and book premium turf cricket venues in your city. Play with friends, join tournaments, and be part of the cricket community.
          </p>
          
          {/* Search Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search Venues</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search by name or location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  Find Venues
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">
              {selectedCity ? `Cricket Venues in ${selectedCity}` : "Popular Cricket Venues"}
            </h3>
            <p className="text-gray-600">{filteredVenues.length} venues found</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map(venue => (
              <Card key={venue.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => navigate(`/venue/${venue.id}`)}>
                <div className="relative">
                  <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <Badge className="absolute top-3 right-3 bg-green-500">{venue.grounds} Grounds</Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{venue.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {venue.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price Range</span>
                      <span className="font-semibold text-green-600">{venue.priceRange}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {venue.reviews} reviews
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        Available today
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.slice(0, 3).map(amenity => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {venue.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{venue.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TurfCricket?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make cricket booking simple, social, and seamless for players and venue owners alike.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Find Nearby Venues</h4>
              <p className="text-gray-600">Discover cricket venues near you with detailed information and real-time availability.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Instant Booking</h4>
              <p className="text-gray-600">Book your preferred time slots instantly with our real-time booking system.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Build Community</h4>
              <p className="text-gray-600">Connect with other players, form teams, and join tournaments in your area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">TC</span>
                </div>
                <h4 className="text-xl font-bold">TurfCricket</h4>
              </div>
              <p className="text-gray-400">Making cricket accessible to everyone, everywhere.</p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Venues</a></li>
                <li><a href="#" className="hover:text-white">Book Now</a></li>
                <li><a href="#" className="hover:text-white">Join Community</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">For Venues</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">List Your Venue</a></li>
                <li><a href="#" className="hover:text-white">Owner Dashboard</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TurfCricket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
