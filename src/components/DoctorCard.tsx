
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  fees: number;
  isAvailable: boolean;
  nextSlot: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: () => void;
}

const DoctorCard = ({ doctor, onBookAppointment }: DoctorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <Badge 
                    variant={doctor.isAvailable ? "default" : "secondary"}
                    className={doctor.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {doctor.isAvailable ? "Available" : "Busy"}
                  </Badge>
                </div>
                
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{doctor.experience}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
              </div>

              {/* Booking Info */}
              <div className="text-right md:text-left md:w-48">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-bold text-gray-900">${doctor.fees}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Next Available</p>
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <Clock className="h-4 w-4" />
                      <span>{doctor.nextSlot}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={onBookAppointment}
                    className="w-full"
                    disabled={!doctor.isAvailable}
                  >
                    {doctor.isAvailable ? "Book Appointment" : "Join Waitlist"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
