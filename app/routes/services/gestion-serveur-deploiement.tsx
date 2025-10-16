import { Server, Shield, Zap, LineChart, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "~/components/breadcrumbs";
import { generateSEOMeta, generateServiceSchema } from "~/utils/seo";
import type { Route } from "./+types/gestion-serveur-deploiement";

export function meta({}: Route.MetaArgs) {
  return generateSEOMeta({
    title:
      "Gestion Serveur & Déploiement de Sites Web | DevOps Montréal | Pierre Barbé",
    description:
      "Gestion d'infrastructure serveur, déploiement automatisé (CI/CD), mises à jour et sécurité pour sites web au Québec. Ton site en ligne, sécurisé et disponible 24/7. Développeur DevOps freelance à Montréal.",
    url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement",
    keywords:
      "gestion serveur Montréal, déploiement site web, CI/CD pipeline, DevOps freelance Québec, infrastructure cloud, hébergement web sécurisé, mises à jour serveur, disponibilité 24/7",
    type: "article",
  });
}

// JSON-LD Service Schema
const serviceSchema = generateServiceSchema({
  name: "Gestion Serveur & Déploiement",
  description:
    "Gestion d'infrastructure serveur, déploiement automatisé (CI/CD), mises à jour et sécurité. Ton site en ligne, sécurisé et disponible 24/7.",
  url: "https://pierrebarbe.ca/services/gestion-serveur-deploiement",
  serviceType: "Server Management and Deployment",
});

export default function GestionServeurDeploiement() {
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
            { label: "Gestion Serveur & Déploiement" },
          ]}
        />
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Server className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-medium">
                99,9% uptime garanti
              </span>
            </div>
            <h1 className="font-urbanist text-4xl font-bold md:text-5xl mb-6">
              Gestion Serveur & Déploiement
            </h1>
            <p className="font-urbanist text-base-content/80 mx-auto max-w-3xl text-lg md:text-xl">
              Ton site en ligne, sécurisé et disponible 24/7. Je gère la
              technique, tu gères ton business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Ce Que Je Gère Pour Toi
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card bg-base-200 p-8">
              <Server className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Gestion de Serveur
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Configuration initiale (VPS, cloud, shared hosting)</li>
                <li>• Optimisation des performances serveur</li>
                <li>• Mises à jour sécurité OS et logiciels</li>
                <li>• Monitoring 24/7 et alertes automatiques</li>
                <li>• Gestion des sauvegardes (quotidiennes + hebdomadaires)</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Déploiement Automatisé (CI/CD)
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Mise en place de pipelines Git → Production</li>
                <li>• Déploiements sans downtime</li>
                <li>• Rollback rapide en cas de problème</li>
                <li>• Environnements staging/production séparés</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Sécurité
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Certificats SSL/TLS (Let's Encrypt ou payant)</li>
                <li>• Firewall et protection DDoS</li>
                <li>• Hardening du serveur</li>
                <li>• Scans de vulnérabilités réguliers</li>
              </ul>
            </div>

            <div className="card bg-base-200 p-8">
              <LineChart className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-urbanist text-xl font-semibold mb-4">
                Monitoring & Support
              </h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Surveillance uptime (99,9% garanti)</li>
                <li>• Logs et analytics serveur</li>
                <li>• Support technique 24/7 (email/Slack)</li>
                <li>• Rapports mensuels de santé</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-base-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-12 text-center">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Est-ce que je peux garder mon hébergeur actuel ?
              </h3>
              <p className="text-base-content/80">
                Oui, je peux travailler avec ton hébergeur actuel (sauf si la performance ou sécurité est problématique). Je peux aussi recommander des hébergeurs fiables au Québec.
              </p>
            </div>

            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Qu'est-ce que le CI/CD et pourquoi j'en ai besoin ?
              </h3>
              <p className="text-base-content/80">
                Le CI/CD (Continuous Integration/Deployment) permet de déployer automatiquement tes modifications. Tu pousses ton code sur Git, et ton site se met à jour automatiquement. Plus d'erreurs manuelles, plus de downtime.
              </p>
            </div>

            <div className="card bg-base-100 p-6">
              <h3 className="font-urbanist text-xl font-semibold mb-3 text-base-content">
                Combien coûte la gestion serveur mensuelle ?
              </h3>
              <p className="text-base-content/80">
                Ça dépend de la complexité (nombre de sites, traffic, services). En moyenne, 150-300$/mois pour un site PME. Ça inclut monitoring 24/7, mises à jour, sauvegardes et support technique.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-content">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-urbanist text-3xl font-bold md:text-4xl mb-6">
            Besoin d'un Pro Pour Gérer Ton Serveur ?
          </h2>
          <p className="text-lg mb-10 opacity-90">
            Discutons de ton infrastructure et vois comment je peux t'aider.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <a
              href="/contact"
              className="btn btn-neutral rounded-full px-8 py-3"
            >
              Discuter de mon projet
            </a>
            <a
              href="https://calendly.com/contact-pierrebarbe/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-primary-content hover:bg-primary-content hover:text-primary border-primary-content rounded-full px-8 py-3"
            >
              Réserver une consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
