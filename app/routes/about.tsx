import { Link } from "react-router";
import {
  Code2,
  Zap,
  Leaf,
  Users,
  CheckCircle,
  ExternalLink,
  Mail,
} from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import JsonLd from "~/components/json-ld";
import type { Route } from "./+types/about";

export function links() {
  return [
    { rel: "preload", as: "image", type: "image/avif", href: "/images/me-800.avif" },
  ];
}

export function meta({}: Route.MetaArgs) {
  const url = "https://pierrebarbe.ca/about";
  const image = "https://pierrebarbe.ca/images/pb-og-image.jpg";

  return [
    { title: "À propos — Pierre Barbé, développeur web freelance Montréal" },
    { tagName: "link", rel: "canonical", href: url },
    {
      name: "description",
      content:
        "Développeur web freelance à Montréal, spécialisé en web-performance, automatisation n8n et éco-conception. Découvrez mon parcours, ma stack et mes valeurs.",
    },
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    {
      property: "og:title",
      content: "À propos — Pierre Barbé, développeur web freelance Montréal",
    },
    {
      property: "og:description",
      content:
        "Parcours, stack technique, certifications et valeurs d'un développeur web freelance basé à Montréal.",
    },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: "profile" },
    { property: "og:locale", content: "fr_CA" },
    { name: "twitter:title", content: "À propos — Pierre Barbé" },
    {
      name: "twitter:description",
      content: "Développeur web freelance à Montréal, spécialisé en performance et automatisation.",
    },
    { name: "twitter:image", content: image },
  ];
}

const timeline = [
  {
    year: "2025",
    title: "Freelance & Spécialisation performance",
    description:
      "+38 points Lighthouse sur un e-commerce WordPress. Mise en place de pipelines CI/CD et workflows n8n pour des PME montréalaises. Lancement de pierrebarbe.ca avec un score Lighthouse 95+.",
  },
  {
    year: "2024",
    title: "Automatisation & intégration IA",
    description:
      "Premiers projets d'intégration IA : chatbots GPT entraînés sur contenu client, recherche sémantique. Déploiement de workflows n8n pour cliniques et agences. Spécialisation DevOps sur VPS Linux.",
  },
  {
    year: "2023",
    title: "Développement full-stack agence",
    description:
      "Développement de sites et applications web pour des clients variés : e-commerces Shopify, refontes WordPress, intégrations API. Plus de 20 projets livrés.",
  },
  {
    year: "2022",
    title: "Premiers projets clients",
    description:
      "Optimisation de sites WordPress existants, audits de performance Lighthouse, premiers projets d'automatisation. Découverte de l'éco-conception web.",
  },
  {
    year: "2021",
    title: "Formation et projets personnels",
    description:
      "Autodidacte puis formation intensive React, TypeScript, Node.js. Premiers projets open source et contributions communautaires.",
  },
];

const stack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Router", "TypeScript", "Tailwind CSS", "DaisyUI"],
  },
  {
    category: "Backend & CMS",
    items: ["Node.js", "WordPress", "WooCommerce", "Shopify"],
  },
  {
    category: "Performance & SEO",
    items: ["Lighthouse", "WebPageTest", "Core Web Vitals", "Schema.org", "Ahrefs"],
  },
  {
    category: "Automatisation & IA",
    items: ["n8n", "Make (Integromat)", "OpenAI API", "Resend", "Zapier"],
  },
  {
    category: "Infra & DevOps",
    items: ["Vercel", "Docker", "GitHub Actions", "Nginx", "Linux VPS"],
  },
];

const values = [
  {
    icon: Zap,
    title: "Performance avant tout",
    description:
      "Un site lent perd des clients. Je mesure, j'optimise, je mesure encore. Chaque milliseconde compte — pour vos utilisateurs et pour Google.",
  },
  {
    icon: Leaf,
    title: "Éco-conception",
    description:
      "Le numérique représente 4 % des émissions mondiales. Un site éco-conçu est aussi un site plus rapide. Ces deux objectifs vont de pair.",
  },
  {
    icon: Users,
    title: "Accessibilité & inclusion",
    description:
      "Un site accessible est un site que tout le monde peut utiliser. Je vise WCAG 2.1 AA sur chaque projet, pas parce que c'est obligatoire, mais parce que c'est juste.",
  },
  {
    icon: Code2,
    title: "Code sobre, pas sur-ingénié",
    description:
      "Le meilleur code est celui qui fait exactement ce qu'il faut, pas plus. Je résiste à l'attrait des frameworks inutiles et des abstractions prématurées.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebPage", "AboutPage"],
      "@id": "https://pierrebarbe.ca/about#webpage",
      url: "https://pierrebarbe.ca/about",
      name: "À propos — Pierre Barbé, développeur web freelance Montréal",
      description:
        "Développeur web freelance à Montréal, spécialisé en web-performance, automatisation n8n et éco-conception.",
      inLanguage: "fr-CA",
      isPartOf: { "@id": "https://pierrebarbe.ca/#website" },
      about: { "@id": "https://pierrebarbe.ca/#person" },
      breadcrumb: { "@id": "https://pierrebarbe.ca/about#breadcrumb" },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://pierrebarbe.ca/about#profilepage",
      url: "https://pierrebarbe.ca/about",
      name: "À propos — Pierre Barbé",
      dateCreated: "2025-01-01T00:00:00-05:00",
      dateModified: "2026-04-21T00:00:00-04:00",
      mainEntity: {
        "@type": "Person",
        "@id": "https://pierrebarbe.ca/#person",
        name: "Pierre Barbé",
        url: "https://pierrebarbe.ca/about",
        jobTitle: "Développeur Web Freelance",
        knowsLanguage: ["fr-CA", "en"],
        knowsAbout: [
          "Web Development",
          "Web Performance",
          "Core Web Vitals",
          "Eco-design",
          "WCAG Accessibility",
          "WordPress",
          "WooCommerce",
          "React",
          "Next.js",
          "React Router",
          "TypeScript",
          "Node.js",
          "n8n",
          "Make",
          "Lighthouse",
          "SEO",
          "Schema.org",
          "Vercel",
          "Docker",
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://pierrebarbe.ca/about#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://pierrebarbe.ca/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "À propos",
        },
      ],
    },
  ],
};

export default function About() {
  return (
    <div className="bg-base-100 font-urbanist">
      <JsonLd data={aboutSchema} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
        />
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-base-content/40 h-px w-8" />
                <span className="text-base-content/70 text-sm font-medium tracking-widest uppercase">
                  Développeur web freelance
                </span>
              </div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Pierre Barbé
                <span className="text-primary block mt-1">développeur web freelance à Montréal</span>
              </h1>
              <p className="text-base-content/80 mt-6 text-lg leading-relaxed">
                Depuis 2021, j'aide les PME, e-commerces et agences du Québec à avoir
                des sites plus rapides, plus verts et mieux automatisés. Basé à Montréal,
                je travaille partout au Canada en télétravail — en français ou en anglais.
              </p>
              <p className="text-base-content/80 mt-4 text-lg leading-relaxed">
                Mon approche : du concret, de la transparence, et pas de promesses
                creuses. Je mesure, j'optimise, je documente. Vous savez toujours
                exactement ce que je fais et pourquoi.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn btn-primary rounded-full px-8">
                  <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                  Me contacter
                </Link>
                <a
                  href="https://www.linkedin.com/in/pierre-barb%C3%A9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost rounded-full px-8 border border-base-content/20"
                >
                  <ExternalLink className="h-4 w-4 mr-2" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/me-800.avif"
                  srcSet="/images/me-800.avif 800w, /images/me.avif 2662w"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Pierre Barbé, développeur web freelance à Montréal"
                  className="w-full h-auto max-h-[500px] object-cover"
                  width={800}
                  height={962}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-4 -left-4 bg-base-100 border border-base-content/10 rounded-xl px-5 py-4 shadow-lg">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { value: "50+", label: "Projets" },
                    { value: "100%", label: "Livraisons" },
                    { value: "3+", label: "Ans" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-primary text-xl font-bold">{stat.value}</div>
                      <div className="text-base-content/60 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-base-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Mes valeurs</h2>
            <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
              Ces principes guident chaque décision technique que je prends.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-base-100 rounded-2xl p-6 border border-base-content/10"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parcours */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Parcours</h2>
            <div className="bg-primary h-1 w-16 mx-auto mt-4 rounded-full" />
          </div>
          <ol className="relative border-l border-base-content/20 space-y-10 ml-4">
            {timeline.map((item) => (
              <li key={item.year} className="ml-8">
                <span className="absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary ring-4 ring-base-100">
                  <CheckCircle className="h-4 w-4 text-primary-content" aria-hidden="true" />
                </span>
                <time
                  className="mb-1 text-sm font-semibold text-primary"
                  dateTime={item.year}
                >
                  {item.year}
                </time>
                <h3 className="font-bold text-lg mt-0.5">{item.title}</h3>
                <p className="text-base-content/70 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stack technique */}
      <section className="bg-base-200 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Stack technique</h2>
            <p className="text-base-content/70 mt-4">
              Les outils que j'utilise au quotidien sur mes projets clients.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stack.map((group) => (
              <div
                key={group.category}
                className="bg-base-100 rounded-2xl p-5 border border-base-content/10"
              >
                <h3 className="font-bold text-sm text-primary uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-base-content/80"
                    >
                      <div className="bg-primary/20 h-1.5 w-1.5 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelance vs agence */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Pourquoi choisir un freelance plutôt qu'une agence ?
            </h2>
            <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
              Une question légitime — voici comment je me positionne face aux
              agences web de Montréal.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-base-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-primary">Pas d'intermédiaire</h3>
              <p className="text-base-content/80 text-sm leading-relaxed">
                Vous parlez directement à la personne qui code. Pas de chef de
                projet qui traduit, pas de briefs mal transmis, pas de délais qui
                s'étirent entre les équipes. La boucle entre vos retours et le
                déploiement prend des heures, pas des semaines.
              </p>
            </div>
            <div className="bg-base-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-primary">Tarifs plus justes</h3>
              <p className="text-base-content/80 text-sm leading-relaxed">
                Pas de locaux à payer, pas de couche commerciale, pas de marge
                sur des freelances sous-traitants. Le budget va dans le code et
                l'optimisation. Pour la plupart des projets PME, c'est 30 à 50 %
                moins cher qu'une agence à qualité égale.
              </p>
            </div>
            <div className="bg-base-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 text-primary">Code transparent</h3>
              <p className="text-base-content/80 text-sm leading-relaxed">
                Vous recevez un repo Git propre, une documentation claire et un
                code que n'importe quel autre développeur peut reprendre. Pas de
                lock-in technologique, pas de dépendance à mes outils. Votre
                projet reste le vôtre.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <p className="text-base-content/80 leading-relaxed">
              <strong>L'agence reste pertinente</strong> pour les gros projets
              multi-disciplinaires (branding + vidéo + pub + web + 10 profils
              coordonnés). Pour un site performant, un audit technique ou une
              automatisation ciblée, un freelance spécialisé livre plus vite, à
              meilleur coût. Si votre besoin dépasse mon périmètre, je vous
              redirige — je préfère ne pas prendre un projet plutôt que le bâcler.
            </p>
          </div>
        </div>
      </section>

      {/* Ressources */}
      <section className="bg-base-200 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Envie d'aller plus loin ?</h2>
          <p className="text-base-content/70 mt-4 leading-relaxed">
            Je partage régulièrement ce que j'apprends sur le blog. Quelques
            guides pratiques pour les PME québécoises :
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            <li>
              <Link
                to="/blog/core-web-vitals-guide-pme"
                className="btn btn-sm btn-ghost rounded-full border border-base-content/20"
              >
                Guide Core Web Vitals
              </Link>
            </li>
            <li>
              <Link
                to="/blog/loi-25-site-web-conformite-pme"
                className="btn btn-sm btn-ghost rounded-full border border-base-content/20"
              >
                Conformité Loi 25
              </Link>
            </li>
            <li>
              <Link
                to="/blog/cout-site-web-quebec-prix"
                className="btn btn-sm btn-ghost rounded-full border border-base-content/20"
              >
                Coût d'un site web au Québec
              </Link>
            </li>
            <li>
              <Link
                to="/blog/automatiser-business-n8n-pme"
                className="btn btn-sm btn-ghost rounded-full border border-base-content/20"
              >
                Automatiser sa PME avec n8n
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Travaillons ensemble</h2>
          <p className="text-base-content/70 mt-4 text-lg leading-relaxed">
            Vous avez un projet, un site à optimiser ou un processus à automatiser ?
            Parlons-en — premier échange gratuit, par mail ou visio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-primary rounded-full px-10 py-3">
              Parle-moi de ton projet
            </Link>
            <Link
              to="/blog"
              className="btn btn-ghost rounded-full px-10 py-3 border border-base-content/20"
            >
              Lire le blog
            </Link>
            <Link
              to="/services"
              className="btn btn-ghost rounded-full px-10 py-3 border border-base-content/20"
            >
              Voir mes services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
