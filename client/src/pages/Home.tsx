import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import type { Project } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: featuredProjects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });

  const handleViewAllProjects = () => {
    setLocation("/projekty");
  };

  return (
    <main>
      <Hero />
      <FeaturedProjects 
        projects={featuredProjects}
        isLoading={isLoading}
        onViewAll={handleViewAllProjects}
      />
      <section id="o-nas">
        <About />
      </section>
      <section id="kontakt">
        <ContactForm />
      </section>
    </main>
  );
}