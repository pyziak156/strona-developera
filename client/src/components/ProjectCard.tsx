import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Home, ArrowRight } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleViewDetails = () => {
    console.log(`View details for project: ${project.name}`);
    onClick?.();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover-elevate cursor-pointer transition-all duration-300" data-testid={`project-card-${project.id}`}>
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`project-image-${project.id}`}
          />
          {project.featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground" data-testid={`featured-badge-${project.id}`}>
              Polecane
            </Badge>
          )}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm" data-testid={`availability-${project.id}`}>
            {project.availableUnits} wolnych
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors" data-testid={`project-name-${project.id}`}>
            {project.name}
          </h3>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">od</div>
            <div className="text-lg font-bold text-primary" data-testid={`project-price-${project.id}`}>
              {formatPrice(project.priceFrom)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm" data-testid={`project-location-${project.id}`}>{project.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Home className="h-4 w-4 mr-2" />
            <span data-testid={`project-units-${project.id}`}>{project.totalUnits} mieszkań</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewDetails}
            className="group-hover:bg-primary group-hover:text-primary-foreground"
            data-testid={`button-view-details-${project.id}`}
          >
            Zobacz szczegóły
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}