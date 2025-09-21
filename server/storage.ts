import { 
  users, projects, apartments,
  type User, type InsertUser,
  type Project, type InsertProject,
  type Apartment, type InsertApartment
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Apartment methods
  getApartmentsByProject(projectId: string): Promise<Apartment[]>;
  getApartment(id: string): Promise<Apartment | undefined>;
  createApartment(apartment: InsertApartment): Promise<Apartment>;
  updateApartment(id: string, apartment: Partial<InsertApartment>): Promise<Apartment | undefined>;
  deleteApartment(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.featured));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.featured, true));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject || undefined;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Apartment methods
  async getApartmentsByProject(projectId: string): Promise<Apartment[]> {
    return await db.select().from(apartments).where(eq(apartments.projectId, projectId));
  }

  async getApartment(id: string): Promise<Apartment | undefined> {
    const [apartment] = await db.select().from(apartments).where(eq(apartments.id, id));
    return apartment || undefined;
  }

  async createApartment(apartment: InsertApartment): Promise<Apartment> {
    const [newApartment] = await db
      .insert(apartments)
      .values(apartment)
      .returning();
    return newApartment;
  }

  async updateApartment(id: string, apartment: Partial<InsertApartment>): Promise<Apartment | undefined> {
    const [updatedApartment] = await db
      .update(apartments)
      .set(apartment)
      .where(eq(apartments.id, id))
      .returning();
    return updatedApartment || undefined;
  }

  async deleteApartment(id: string): Promise<boolean> {
    const result = await db.delete(apartments).where(eq(apartments.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();