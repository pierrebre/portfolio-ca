export interface ProjectCardProps {
  readonly id: number;
  readonly image: string;
  readonly title: string;
  readonly client: string;
  readonly services: string[];
  readonly duration: string;
  readonly results: string[];
}

export const projects: ProjectCardProps[] = [
  {
    id: 1,
    title: "Fashion E-commerce App",
    client: "Global Retail Brand",
    services: ["Mobile UX", "React Native", "Payment Gateway"],
    duration: "8 Months",
    results: ["4.8 App Store Rating", "300% Mobile Sales Increase"],
    image: "https://picsum.photos/id/7/1000/800",
  },
  {
    id: 2,
    title: "Health Monitoring Platform",
    client: "Medical Tech Startup",
    services: ["iOS/Android App", "Wearable Integration"],
    duration: "10 Months",
    results: ["1M+ Active Users", "92% User Retention"],
    image: "https://picsum.photos/id/1/1000/800",
  },
  {
    id: 3,
    title: "Enterprise SaaS Dashboard",
    client: "Fortune 500 Company",
    services: ["Data Visualization", "Cloud Architecture", "Admin Panel"],
    duration: "1 Year",
    results: ["40% Efficiency Boost", "$1.5M Annual Savings"],
    image: "https://picsum.photos/id/4/1080/720",
  },
];
