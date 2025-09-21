import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, MapPin, Home } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { useLocation } from "wouter";
import type { Project } from "@shared/schema";

export default function Projects() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFeatured = !showFeaturedOnly || project.featured;
    
    return matchesSearch && matchesFeatured;
  });

  const handleProjectClick = (projectId: string) => {
    setLocation(`/projekty/${projectId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="projects-title">
          Nasze projekty mieszkaniowe
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="projects-description">
          Poznaj pełną ofertę naszych inwestycji mieszkaniowych w najlepszych lokalizacjach Polski
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtry i wyszukiwanie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj po nazwie, lokalizacji lub opisie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-input"
              />
            </div>
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              data-testid="filter-featured"
            >
              Tylko polecane
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span data-testid="results-count">
              Znaleziono: {filteredProjects.length} z {projects.length} projektów
            </span>
            {showFeaturedOnly && (
              <Badge variant="secondary" data-testid="active-filter">
                Tylko polecane
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} data-testid={`project-skeleton-${index}`}>
              <div className="p-0">
                <Skeleton className="h-48 w-full rounded-t-lg" />
              </div>
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project.id)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Home className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h3 className="text-xl font-semibold mb-4" data-testid="no-results-title">
              Brak wyników wyszukiwania
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="no-results-description">
              Nie znaleźliśmy projektów spełniających podane kryteria. 
              Spróbuj zmienić filtry lub wyszukaj inną frazę.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setShowFeaturedOnly(false);
              }}
              data-testid="button-clear-filters"
            >
              Wyczyść filtry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}