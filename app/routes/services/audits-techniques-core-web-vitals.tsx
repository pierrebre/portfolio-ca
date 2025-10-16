import {
  ClipboardCheck,
  CheckCircle2,
  FileText,
  TrendingUp,
} from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/audits-techniques-core-web-vitals";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Audit Technique de Site Web & Core Web Vitals | Montréal | Pierre Barbé",
    description:
      "Audit technique complet de votre site web : Core Web Vitals, performance, accessibilité, SEO et sécurité. Rapport clair et vulgarisé avec plan d'action concret. Audit gratuit de 30 min disponible à Montréal.",
    url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals",
    keywords:
      "audit technique site web Montréal, audit Core Web Vitals, analyse performance site, audit accessibilité WCAG, audit SEO technique, santé site web, développeur audit Québec",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Audits Techniques & Core Web Vitals",
  description:
    "Audit technique complet de votre site web : Core Web Vitals, performance, accessibilité, SEO et sécurité. Rapport clair et vulgarisé avec plan d'action concret.",
  url: "https://pierrebarbe.ca/services/audits-techniques-core-web-vitals",
  serviceType: "Technical Website Audit",
});

export default function AuditsTechniquesCoreWebVitals() {
  return (
    <div className="bg-base-100">
      {/* JSON-LD Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <Breadcrumbs
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Audits Techniques & Core Web Vitals" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                Audit à 360° de ton site
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Audits Techniques & Core Web Vitals
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Comprends enfin pourquoi ton site est lent, inaccessible ou
              invisible sur Google. Rapport clair + plan d'action.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
