
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Star, Settings, LogOut, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+91 98765 43210",
    totalBookings: 15,
    favoriteVenues: 3,
    memberSince: "January 2024"
  });

  const upcomingBookings = [
    {
      id: "TC123456",
      venueName: "Cricket Zone Arena",
      location: "Bandra West, Mumbai",
      date: "2024-01-15",
      time: "06:00 PM",
      ground: "Ground A",
      amount: 1200,
      status: "confirmed"
    },
    {
      id: "TC789012",
      venueName: "Sports Hub Cricket",
      location: "Koramangala, Bangalore",
      date: "2024-01-18",
      time: "08:00 AM",
      ground: "Ground B",
      amount: 800,
      status: "confirmed"
    }
  ];

  const bookingHistory = [
    {
      id: "TC345678",
      venueName: "Champions Cricket Club",
      location: "Gurgaon, Delhi NCR",
      date: "2024-01-10",
      time: "07:00 PM",
      ground: "Ground C",
      amount: 1500,
      status: "completed"
    },
    {
      id: "TC901234",
      venueName: "Cricket Zone Arena",
      location: "Bandra West, Mumbai",
      date: "2024-01-05",
      time: "06:00 PM",
      ground: "Ground A",
      amount: 1200,
      status: "completed"
    }
  ];

  const favoriteVenues = [
    {
      id: 1,
      name: "Cricket Zone Arena",
      location: "Bandra West, Mumbai",
      rating: 4.5,
      lastVisited: "2024-01-10"
    },
    {
      id: 2,
      name: "Sports Hub Cricket",
      location: "Koramangala, Bangalore",
      rating: 4.3,
      lastVisited: "2024-01-18"
    }
  ];

  const handleLogout = () => {
    navigate("/");
  };

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
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-gray-600">Manage your bookings and discover new cricket venues</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-green-600">{user.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Favorite Venues</p>
                  <p className="text-2xl font-bold text-blue-600">{user.favoriteVenues}</p>
                </div>
                <Star className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-lg font-bold text-purple-600">{user.memberSince}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{booking.venueName}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          {new Date(booking.date).toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{booking.ground}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-green-600">₹{booking.amount}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Cancel Booking</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Upcoming Bookings</h3>
                  <p className="text-gray-600 mb-4">You don't have any upcoming cricket sessions</p>
                  <Button 
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Booking History */}
          <TabsContent value="history" className="space-y-4">
            {bookingHistory.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.venueName}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.location}
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        {new Date(booking.date).toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">{booking.ground}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">₹{booking.amount}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">View Receipt</Button>
                    <Button size="sm" variant="outline">Book Again</Button>
                    <Button size="sm" variant="outline">Rate & Review</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Favorite Venues */}
          <TabsContent value="favorites" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {favoriteVenues.map((venue) => (
                <Card key={venue.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{venue.name}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {venue.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Last visited: {new Date(venue.lastVisited).toLocaleDateString('en-IN')}
                    </p>
                    
                    <Button 
                      className="w-full"
                      onClick={() => navigate(`/venue/${venue.id}`)}
                    >
                      Book Now
                    </Button>
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

export default Dashboard;
