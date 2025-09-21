import { Request, Response, Router } from "express";
import { storage } from "./storage";
import { insertProjectSchema, insertApartmentSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// Projects routes
router.get("/api/projects", async (req: Request, res: Response) => {
  try {
    const projects = await storage.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ error: "Failed to get projects" });
  }
});

router.get("/api/projects/featured", async (req: Request, res: Response) => {
  try {
    const projects = await storage.getFeaturedProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error getting featured projects:", error);
    res.status(500).json({ error: "Failed to get featured projects" });
  }
});

router.get("/api/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error getting project:", error);
    res.status(500).json({ error: "Failed to get project" });
  }
});

router.post("/api/projects", async (req: Request, res: Response) => {
  try {
    const validatedData = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(validatedData);
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.patch("/api/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const partialData = insertProjectSchema.partial().parse(req.body);
    const project = await storage.updateProject(id, partialData);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/api/projects/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await storage.deleteProject(id);
    if (!success) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Apartments routes
router.get("/api/projects/:projectId/apartments", async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const apartments = await storage.getApartmentsByProject(projectId);
    res.json(apartments);
  } catch (error) {
    console.error("Error getting apartments:", error);
    res.status(500).json({ error: "Failed to get apartments" });
  }
});

router.get("/api/apartments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const apartment = await storage.getApartment(id);
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res.json(apartment);
  } catch (error) {
    console.error("Error getting apartment:", error);
    res.status(500).json({ error: "Failed to get apartment" });
  }
});

router.post("/api/apartments", async (req: Request, res: Response) => {
  try {
    const validatedData = insertApartmentSchema.parse(req.body);
    const apartment = await storage.createApartment(validatedData);
    res.status(201).json(apartment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Error creating apartment:", error);
    res.status(500).json({ error: "Failed to create apartment" });
  }
});

router.patch("/api/apartments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const partialData = insertApartmentSchema.partial().parse(req.body);
    const apartment = await storage.updateApartment(id, partialData);
    if (!apartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res.json(apartment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Error updating apartment:", error);
    res.status(500).json({ error: "Failed to update apartment" });
  }
});

router.delete("/api/apartments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await storage.deleteApartment(id);
    if (!success) {
      return res.status(404).json({ error: "Apartment not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting apartment:", error);
    res.status(500).json({ error: "Failed to delete apartment" });
  }
});

// Contact form endpoint
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required")
});

router.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const validatedData = contactFormSchema.parse(req.body);
    
    // Here you would typically send an email or save to database
    console.log("Contact form submission:", validatedData);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({ 
      success: true, 
      message: "Wiadomość została wysłana. Skontaktujemy się z Tobą w ciągu 24 godzin." 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid data", details: error.errors });
    }
    console.error("Error processing contact form:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;