import FeaturedProjects from '../FeaturedProjects';
import type { Project } from '@shared/schema';
import buildingImage from "@assets/generated_images/Modern_apartment_building_exterior_bf1320ba.png";
import interiorImage from "@assets/generated_images/Luxury_apartment_interior_61d7261a.png";
import aerialImage from "@assets/generated_images/Aerial_view_residential_complex_a977c939.png";

export default function FeaturedProjectsExample() {
  // Todo: remove mock functionality
  const mockProjects: Project[] = [
    {
      id: "1",
      name: "Bemowo Vita",
      location: "Warszawa, Bemowo",
      description: "Nowoczesne osiedle w zielonej części Warszawy z wysokiej jakości wykończeniami i pełną infrastrukturą.",
      priceFrom: 850000,
      availableUnits: 23,
      totalUnits: 156,
      imageUrl: buildingImage,
      featured: true,
    },
    {
      id: "2", 
      name: "Krakowska Residence",
      location: "Kraków, Podgórze",
      description: "Ekskluzywne apartamenty w historycznej części Krakowa z widokiem na Wisłę i nowoczesną infrastrukturą.",
      priceFrom: 720000,
      availableUnits: 15,
      totalUnits: 89,
      imageUrl: interiorImage,
      featured: true,
    },
    {
      id: "3",
      name: "Green Valley",
      location: "Wrocław, Fabryczna", 
      description: "Zielone osiedle z apartamentami otoczonymi terenami rekreacyjnymi i parkami miejskimi.",
      priceFrom: 650000,
      availableUnits: 42,
      totalUnits: 234,
      imageUrl: aerialImage,
      featured: false,
    }
  ];

  return <FeaturedProjects projects={mockProjects} />;
}