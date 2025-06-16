
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Star, Filter, Calendar, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "@/components/DoctorCard";
import DiseaseSelector from "@/components/DiseaseSelector";

// Mock data for diseases and doctors
const diseases = [
  { id: "fever", name: "Fever", icon: "🤒", specialists: ["General Medicine", "Internal Medicine"] },
  { id: "skin", name: "Skin Conditions", icon: "🩹", specialists: ["Dermatology"] },
  { id: "eye", name: "Eye Problems", icon: "👁️", specialists: ["Ophthalmology"] },
  { id: "heart", name: "Heart Issues", icon: "❤️", specialists: ["Cardiology"] },
  { id: "dental", name: "Dental Problems", icon: "🦷", specialists: ["Dentistry"] },
  { id: "bone", name: "Bone & Joint", icon: "🦴", specialists: ["Orthopedics"] }
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    rating: 4.8,
    experience: "15 years",
    location: "Downtown Medical Center",
    fees: 150,
    isAvailable: true,
    nextSlot: "2:30 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    diseases: ["fever"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    rating: 4.9,
    experience: "12 years",
    location: "Skin Care Clinic",
    fees: 200,
    isAvailable: true,
    nextSlot: "3:15 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    diseases: ["skin"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Ophthalmology",
    rating: 4.7,
    experience: "18 years",
    location: "Eye Care Center",
    fees: 180,
    isAvailable: false,
    nextSlot: "Tomorrow 9:00 AM",
    image: "https://images.unsplash.com/photo-1594824804732-ca8db7b2f9d7?w=400&h=400&fit=crop&crop=face",
    diseases: ["eye"]
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Cardiology",
    rating: 4.9,
    experience: "20 years",
    location: "Heart Institute",
    fees: 250,
    isAvailable: true,
    nextSlot: "4:00 PM",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    diseases: ["heart"]
  }
];

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [selectedDisease, setSelectedDisease] = useState("");
  const [sortBy, setSortBy] = useState("time");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter(doctor => {
    const matchesDisease = !selectedDisease || doctor.diseases.includes(selectedDisease);
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDisease && matchesSearch;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "fees") return a.fees - b.fees;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.nextSlot.localeCompare(b.nextSlot);
  });

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
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost">My Appointments</Button>
              <Button variant="ghost">Medical Records</Button>
              <Button>Profile</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Search for specialists and book appointments instantly</p>
        </div>

        {/* Disease Selection */}
        <DiseaseSelector 
          diseases={diseases}
          selectedDisease={selectedDisease}
          onSelectDisease={setSelectedDisease}
        />

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search doctors or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Earliest Available</SelectItem>
                    <SelectItem value="fees">Lowest Fees</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedDoctors.length} doctors 
            {selectedDisease && (
              <span> for {diseases.find(d => d.id === selectedDisease)?.name}</span>
            )}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {sortedDoctors.map((doctor) => (
            <DoctorCard 
              key={doctor.id} 
              doctor={doctor}
              onBookAppointment={() => navigate(`/booking/${doctor.id}`)}
            />
          ))}
        </div>

        {sortedDoctors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <Stethoscope className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or selecting a different condition.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
