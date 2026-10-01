import stories from "../json/patient-stories.json";

export type ImageRef = { src: string; alt: string };

export type PatientStory = {
  id: string;
  slug: string;
  name: string;
  age: number | null;
  location: string | null;
  readTime: string | null;
  conditionTag: string | null;
  secondaryCondition: string | null;
  thumbnail: ImageRef | null;
  videoUrl: string | null;
  metric: { label: string | null; before: string | null; after: string | null; unit: string | null };
  heading: string | null;
  summary: string | null;
  conditions: string[];
  story: string | null;
  careTeamRole: string | null;
  timeline: { heading: string | null; body: string | null }[];
  conclusion: string | null;
  highlights: { value: string; label: string }[];
};

export const patientStories = stories as PatientStory[];

export function getPatientStory(slug: string) {
  return patientStories.find((s) => s.slug === slug);
}
