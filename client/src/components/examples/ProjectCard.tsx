import ProjectCard from '../ProjectCard';
import type { Project } from '@shared/schema';
import interiorImage from "@assets/generated_images/Luxury_apartment_interior_61d7261a.png";

export default function ProjectCardExample() {
  // Todo: remove mock functionality
  const mockProject: Project = {
    id: "1",
    name: "Bemowo Vita",
    location: "Warszawa, Bemowo",
    description: "Nowoczesne osiedle w zielonej części Warszawy. Wysokiej jakości wykończenia, duże balkony i tarasy, bliskość parków i komunikacji miejskiej.",
    priceFrom: 850000,
    availableUnits: 23,
    totalUnits: 156,
    imageUrl: interiorImage,
    featured: true,
  };

  return <ProjectCard project={mockProject} />;
}