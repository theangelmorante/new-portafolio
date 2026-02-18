export interface Project {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  url?: string;
  githubUrl?: string;
  technologies: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Skill {
  id?: string;
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "tools" | "other";
  level: "beginner" | "intermediate" | "advanced" | "expert";
  icon?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  website?: string;
}
