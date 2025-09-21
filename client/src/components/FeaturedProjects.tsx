import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "./ProjectCard";
import { ArrowRight } from "lucide-react";
import type { Project } from "@shared/schema";

interface FeaturedProjectsProps {
  projects: Project[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

export default function FeaturedProjects({ projects, isLoading, onViewAll }: FeaturedProjectsProps) {
  const handleViewAll = () => {
    console.log("View all projects triggered");
    onViewAll?.();
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="featured-title">
            Nasze najnowsze projekty
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="featured-description">
            Poznaj nasze flagowe inwestycje mieszkaniowe w najlepszych lokalizacjach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
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
            ))
          ) : (
            projects.slice(0, 3).map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onClick={() => console.log(`Navigate to project ${project.id}`)}
              />
            ))
          )}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleViewAll}
            data-testid="button-view-all-projects"
          >
            Zobacz wszystkie projekty
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}