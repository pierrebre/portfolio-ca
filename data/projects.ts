export interface ProjectMetric {
  label: string;
  before: string;
  after: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly client: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly description: string;
  readonly challenge: string;
  readonly solution: string;
  readonly metrics: readonly ProjectMetric[];
  readonly duration: string;
  readonly year: number;
  readonly featured: boolean;
}

export const projects: Project[] = [];
