import doctors from "../json/doctors.json";
import type { ImageRef } from "@/content/stories";

export type Doctor = {
  id: string;
  slug: string;
  name: string;
  role: string | null;
  image: ImageRef | null;
  praanAcademyCertified: boolean;
  description: string | null;
};

export const careTeam = doctors as Doctor[];
