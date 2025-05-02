export type ServiceProps = {
  readonly icon: string;
  readonly name: string;
  readonly description: string;
};

export const services: ServiceProps[] = [
  {
    icon: "https://picsum.photos/id/1/200/300",
    name: "Web Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, nisi.",
  },
  {
    icon: "https://picsum.photos/id/2/200/300",
    name: "UI/UX Design",
    description:
      "Dolorum deserunt explicabo veritatis accusamus, eius assumenda expedita nobis.",
  },
  {
    icon: "https://picsum.photos/id/3/200/300",
    name: "SEO Optimization",
    description:
      "Labore dolor in, at incidunt possimus odit itaque praesentium?",
  },
];
