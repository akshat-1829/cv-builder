// libs/shared-types/src/lib/cv.types.ts
export interface BasicDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  summary: string;
  image?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  percentage: number;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  location: string;
  ctc: string;
  startDate: string;
  endDate: string | null;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  teamSize: number;
  duration: string;
  technologies: string[];
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
}

export interface SocialProfile {
  id: string;
  platform: string;
  url: string;
}

export interface CVData {
  id?: string;
  title: string;
  basicDetails: BasicDetails;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  socialProfiles: SocialProfile[];
}
