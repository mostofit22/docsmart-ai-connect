
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Brain, Stethoscope, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Based Diagnosis",
      description: "Analyze patient symptoms and predict potential diseases using machine learning"
    },
    {
      icon: Users,
      title: "Smart Doctor Matching",
      description: "Connects patients with the most suitable specialists based on expertise and location"
    },
    {
      icon: Calendar,
      title: "Seamless Appointment Booking",
      description: "Real-time scheduling with instant availability updates"
    },
    {
      icon: Clock,
      title: "Predictive Wait Time",
      description: "AI-driven insights to reduce waiting periods and improve patient experience"
    }
  ];

  const stats = [
    { label: "Active Doctors", value: "500+", icon: Stethoscope },
    { label: "Patients Served", value: "10,000+", icon: Users },
    { label: "Average Wait Time", value: "15 min", icon: Clock },
    { label: "Cities Covered", value: "25+", icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-900">DocSmart</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" onClick={() => navigate('/patient-dashboard')}>
                Patient Portal
              </Button>
              <Button variant="ghost" onClick={() => navigate('/doctor-dashboard')}>
                Doctor Portal
              </Button>
              <Button onClick={() => navigate('/patient-dashboard')}>
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            AI-Powered Healthcare Platform
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Advanced Healthcare
            <span className="text-blue-600 block">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            DocSmart leverages cutting-edge artificial intelligence to optimize doctor availability, 
            streamline appointment scheduling, and enhance patient care while minimizing wait times.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/patient-dashboard')}>
              Find a Doctor
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/doctor-dashboard')}>
              Doctor Login
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how DocSmart revolutionizes healthcare with intelligent automation and data-driven insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience Smart Healthcare?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of patients and doctors who trust DocSmart for their healthcare needs. 
              Get started today and experience the future of medical care.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/patient-dashboard')}>
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
