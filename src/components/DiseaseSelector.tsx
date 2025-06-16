
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Disease {
  id: string;
  name: string;
  icon: string;
  specialists: string[];
}

interface DiseaseSelectorProps {
  diseases: Disease[];
  selectedDisease: string;
  onSelectDisease: (diseaseId: string) => void;
}

const DiseaseSelector = ({ diseases, selectedDisease, onSelectDisease }: DiseaseSelectorProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Your Condition</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {diseases.map((disease) => (
            <div
              key={disease.id}
              onClick={() => onSelectDisease(disease.id === selectedDisease ? "" : disease.id)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                ${selectedDisease === disease.id 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{disease.icon}</div>
                <h3 className="font-medium text-sm text-gray-900">{disease.name}</h3>
                <div className="mt-2">
                  {disease.specialists.map((specialist, index) => (
                    <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                      {specialist}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedDisease && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Showing doctors specializing in <strong>{diseases.find(d => d.id === selectedDisease)?.name}</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiseaseSelector;
