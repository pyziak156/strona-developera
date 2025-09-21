import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Home, Bed, Square, Building, Phone } from "lucide-react";
import type { Project, Apartment } from "@shared/schema";

export default function ProjectDetails() {
  const { id } = useParams();

  const { data: project, isLoading: projectLoading } = useQuery<Project>({
    queryKey: ['/api/projects', id],
    enabled: !!id,
  });

  const { data: apartments = [], isLoading: apartmentsLoading } = useQuery<Apartment[]>({
    queryKey: ['/api/projects', id, 'apartments'],
    enabled: !!id,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (projectLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Skeleton className="h-64 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót do strony głównej
          </Button>
        </Link>
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4" data-testid="error-title">Projekt nie znaleziony</h1>
            <p className="text-muted-foreground" data-testid="error-description">
              Projekt o podanym ID nie istnieje w naszej bazie danych.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/">
        <Button variant="ghost" className="mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Powrót do projektów
        </Button>
      </Link>

      {/* Project Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="relative">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-64 lg:h-80 object-cover rounded-lg"
            data-testid="project-hero-image"
          />
          {project.featured && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground" data-testid="featured-badge">
              Polecane
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="project-name">
              {project.name}
            </h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg" data-testid="project-location">{project.location}</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed" data-testid="project-description">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary" data-testid="price-from">
                  {formatPrice(project.priceFrom)}
                </div>
                <div className="text-sm text-muted-foreground">Cena od</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary" data-testid="available-units">
                  {project.availableUnits}
                </div>
                <div className="text-sm text-muted-foreground">Dostępne mieszkania</div>
              </CardContent>
            </Card>
          </div>

          <Button size="lg" className="w-full" data-testid="button-contact">
            <Phone className="h-5 w-5 mr-2" />
            Skontaktuj się z nami
          </Button>
        </div>
      </div>

      {/* Available Apartments */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground" data-testid="apartments-title">
            Dostępne mieszkania
          </h2>
          <div className="flex items-center text-muted-foreground">
            <Home className="h-5 w-5 mr-2" />
            <span data-testid="total-apartments">{project.totalUnits} mieszkań w projekcie</span>
          </div>
        </div>

        {apartmentsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : apartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <Card key={apartment.id} className="hover-elevate transition-all duration-300" data-testid={`apartment-card-${apartment.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg" data-testid={`apartment-number-${apartment.id}`}>
                      Mieszkanie {apartment.number}
                    </CardTitle>
                    <Badge variant={apartment.available ? "default" : "secondary"} data-testid={`apartment-status-${apartment.id}`}>
                      {apartment.available ? "Dostępne" : "Zarezerwowane"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span data-testid={`apartment-rooms-${apartment.id}`}>{apartment.rooms} pokoje</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span data-testid={`apartment-area-${apartment.id}`}>{apartment.area} m²</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span data-testid={`apartment-floor-${apartment.id}`}>{apartment.floor} piętro</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-xl font-bold text-primary text-center" data-testid={`apartment-price-${apartment.id}`}>
                      {formatPrice(apartment.price)}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={!apartment.available}
                    data-testid={`button-apartment-interest-${apartment.id}`}
                  >
                    {apartment.available ? "Jestem zainteresowany" : "Niedostępne"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2" data-testid="no-apartments-title">
                Brak dostępnych mieszkań
              </h3>
              <p className="text-muted-foreground" data-testid="no-apartments-description">
                Wszystkie mieszkania w tym projekcie zostały już sprzedane lub zarezerwowane.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}