
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, Users, Camera, Stethoscope, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  const [faceDetection, setFaceDetection] = useState(false);

  // Mock doctor data
  const doctorInfo = {
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    license: "MD-12345",
    experience: "15 years"
  };

  const todayAppointments = [
    { id: 1, patient: "John Doe", time: "9:00 AM", type: "Consultation", status: "completed" },
    { id: 2, patient: "Jane Smith", time: "10:30 AM", type: "Follow-up", status: "in-progress" },
    { id: 3, patient: "Mike Johnson", time: "2:00 PM", type: "Check-up", status: "upcoming" },
    { id: 4, patient: "Sarah Williams", time: "3:30 PM", type: "Consultation", status: "upcoming" },
  ];

  const stats = [
    { label: "Today's Patients", value: "12", icon: Users, color: "text-blue-600" },
    { label: "Completed", value: "8", icon: CheckCircle, color: "text-green-600" },
    { label: "Remaining", value: "4", icon: Clock, color: "text-orange-600" },
    { label: "Revenue", value: "$1,800", icon: Users, color: "text-purple-600" }
  ];

  const handleAttendanceToggle = () => {
    setIsAvailable(!isAvailable);
    // Here you would typically send this to your backend
    console.log(`Doctor availability changed to: ${!isAvailable}`);
  };

  const handleFaceDetection = () => {
    setFaceDetection(!faceDetection);
    // Here you would integrate with face detection system
    console.log(`Face detection ${!faceDetection ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2" onClick={() => navigate('/')} className="cursor-pointer">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-900">DocSmart</span>
              <Badge variant="secondary" className="ml-2">Doctor Portal</Badge>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost">Schedule</Button>
              <Button variant="ghost">Patients</Button>
              <Button variant="ghost">Settings</Button>
              <Button>Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {doctorInfo.name}</h1>
            <p className="text-gray-600">{doctorInfo.specialty} • License: {doctorInfo.license}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={isAvailable ? "default" : "secondary"} className="text-sm">
              {isAvailable ? "Available" : "Unavailable"}
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Availability Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Availability Control
                </CardTitle>
                <CardDescription>
                  Manage your availability and attendance tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Manual Attendance</p>
                    <p className="text-sm text-gray-600">Toggle your availability status</p>
                  </div>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleAttendanceToggle}
                  />
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Face Detection</p>
                      <p className="text-sm text-gray-600">Automatic entry/exit tracking</p>
                    </div>
                    <Switch
                      checked={faceDetection}
                      onCheckedChange={handleFaceDetection}
                    />
                  </div>
                  
                  {faceDetection && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Camera className="h-4 w-4" />
                        <span className="text-sm font-medium">Face detection active</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        System will automatically track your entry and exit
                      </p>
                    </div>
                  )}
                </div>

                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Schedule
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>
                  Your scheduled appointments for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-semibold text-sm">{appointment.time}</p>
                        </div>
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            appointment.status === 'completed' ? 'default' :
                            appointment.status === 'in-progress' ? 'destructive' : 'secondary'
                          }
                          className="text-xs"
                        >
                          {appointment.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {appointment.status === 'in-progress' && <Clock className="h-3 w-3 mr-1" />}
                          {appointment.status === 'upcoming' && <Calendar className="h-3 w-3 mr-1" />}
                          {appointment.status.replace('-', ' ')}
                        </Badge>
                        {appointment.status === 'upcoming' && (
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {todayAppointments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No appointments scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
