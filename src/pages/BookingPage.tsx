
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Stethoscope, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState("");
  const [duration, setDuration] = useState("15");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Mock doctor data (in real app, fetch by doctorId)
  const doctor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    rating: 4.8,
    experience: "15 years",
    location: "Downtown Medical Center",
    fees: 150,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  };

  const timeSlots = [
    "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM",
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM",
    "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM"
  ];

  const calculateFee = () => {
    const baseFee = doctor.fees;
    const durationMultiplier = parseInt(duration) / 15;
    return Math.round(baseFee * durationMultiplier);
  };

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }
    setShowLoginDialog(true);
  };

  const handleAuth = () => {
    // Here you would handle actual authentication
    setShowLoginDialog(false);
    // Simulate successful booking
    alert("Appointment booked successfully!");
    navigate('/patient-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient-dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-blue-900">DocSmart</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                />
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
                <Badge className="w-fit mx-auto">{doctor.experience}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{doctor.location}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Base Consultation Fee</p>
                  <p className="text-2xl font-bold text-blue-600">${doctor.fees}</p>
                  <p className="text-xs text-gray-500">for 15 minutes</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </CardTitle>
                <CardDescription>
                  Select your preferred time slot and consultation duration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <Label className="text-base font-medium">Select Date</Label>
                  <Input type="date" className="mt-2" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>

                {/* Duration Selection */}
                <div>
                  <Label className="text-base font-medium">Consultation Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 minutes - ${Math.round(doctor.fees * 0.67)}</SelectItem>
                      <SelectItem value="15">15 minutes - ${doctor.fees}</SelectItem>
                      <SelectItem value="30">30 minutes - ${doctor.fees * 2}</SelectItem>
                      <SelectItem value="45">45 minutes - ${doctor.fees * 3}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slots */}
                <div>
                  <Label className="text-base font-medium">Available Time Slots</Label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSlot(slot)}
                        className="text-xs"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <Label htmlFor="symptoms" className="text-base font-medium">Describe Your Symptoms (Optional)</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Briefly describe your symptoms or reason for visit..."
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Booking Summary */}
                {selectedSlot && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Booking Summary</h3>
                      <div className="space-y-1 text-sm">
                        <p><strong>Doctor:</strong> {doctor.name}</p>
                        <p><strong>Date:</strong> Today</p>
                        <p><strong>Time:</strong> {selectedSlot}</p>
                        <p><strong>Duration:</strong> {duration} minutes</p>
                        <p><strong>Fee:</strong> ${calculateFee()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button 
                  onClick={handleBooking}
                  className="w-full"
                  size="lg"
                  disabled={!selectedSlot}
                >
                  Book Appointment - ${calculateFee()}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login/Register Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Create Account"}</DialogTitle>
            <DialogDescription>
              {isLogin ? "Login to complete your booking" : "Create an account to book your appointment"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" />
            </div>
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
            )}
            <Button onClick={handleAuth} className="w-full">
              {isLogin ? "Login & Book" : "Register & Book"}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingPage;
