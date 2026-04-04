# Projet : Service de Piscines Jolicoeur — Corrections site web et intégration CRM

## Informations générales

- **Client** : Service de Piscines Jolicoeur (Les Entreprises François Jolicoeur 3000 inc.)
- **Site** : https://www.piscinejolicoeur.com/
- **CRM** : Plannit (https://pro.plannit.io/)
- **Période** : Mars 2026
- **Durée facturée** : 6 heures
- **Rôle** : Développeur web freelance — diagnostic, correction et intégration

---

## Contexte du projet

Le client, une entreprise familiale spécialisée dans les piscines creusées sur la Rive-Nord de Montréal (en activité depuis 1999), avait un formulaire de demande de soumission sur son site WordPress qui présentait plusieurs dysfonctionnements dans sa liaison avec le CRM Plannit. Le site avait été développé par une agence externe (L'Atelier graphique) et n'avait plus de support technique actif. Le client a fourni un document listant 5 points de correction à effectuer.

---

## Stack technique du site

- **CMS** : WordPress 6.9.4
- **Hébergement** : Infomaniak (serveur mutualisé)
- **Thème** : Litho (avec thème enfant actif)
- **Page builder** : Elementor Pro
- **Formulaire** : Fluent Forms Pro 5.2.12 (formulaire multi-étapes)
- **Cache** : WP Super Cache (mode Expert / mod_rewrite)
- **SEO** : Rank Math SEO
- **SMTP** : FluentSMTP (mal configuré)
- **Sécurité** : Wordfence, WPS Hide Login
- **Anti-spam** : WP Armour Honeypot
- **CRM** : Plannit — API REST (POST /api/jobs) avec authentification par clé API

---

## Travaux réalisés — Détail par point

### Point 1 — Mapping des services formulaire → CRM (Corrigé)

**Problème** : Lorsqu'un visiteur sélectionnait un ou plusieurs services dans le formulaire (multi-select checkbox), l'information arrivait dans le champ « Description » du CRM au lieu du champ « Services ».

**Diagnostic** :
- Analyse du webhook Fluent Forms et du filtre PHP custom dans `functions.php` du thème enfant
- Le filtre `fluentform/webhook_request_args` (priorité 99999) interceptait le webhook et reconstruisait entièrement le payload JSON
- Le champ `job.services` de l'API Plannit attend un **tableau d'identifiants uniques** (IDs internes Plannit), mais le code envoyait les **labels texte** du formulaire
- Récupération de la liste complète des 21 services Plannit via `GET /api/services` avec la clé API
- Identification que les noms des services dans le formulaire ne correspondaient pas exactement aux noms dans Plannit (ex. : "Ouvertures et fermetures" = 2 services séparés dans Plannit)

**Correction** :
- Construction d'un mapping label formulaire → ID(s) Plannit dans le code PHP
- Utilisation de `strpos()` pour le matching au lieu d'un match exact, afin de contourner les problèmes d'apostrophes typographiques (`'` vs `'`) et de virgules dans les labels qui étaient coupés par le séparateur de Fluent Forms
- Le service "Ouvertures et fermetures de piscine creusée" est mappé vers 2 IDs Plannit distincts (Ouverture + Fermeture)
- Coordination avec le client pour la création d'un nouveau service dans Plannit ("Réparation et remplacement d'équipement de filtration et circulation", ID `ve0zegmgh8zg`) qui n'existait pas

**Technologies** : PHP, API REST Plannit, Fluent Forms hooks WordPress, cURL

---

### Point 2 — Champ « Êtes-vous déjà client ? » non transmis au CRM (Corrigé)

**Problème** : La réponse au champ radio "Êtes-vous déjà client ?" n'arrivait jamais dans le CRM.

**Diagnostic** :
- Le champ n'était tout simplement pas inclus dans le filtre PHP qui construit le payload
- Identification du name attribute du champ dans Fluent Forms (`input_radio_2`)
- Récupération des custom fields Plannit via `GET /api/customfields?resource=job`
- Identification du custom field correspondant : clé `1V1Soy6Zz`, type select, avec les valeurs `aXidGu8gN` (Oui) et `nzGzvzzcy` (Non)

**Correction** :
- Ajout de la récupération du champ `input_radio_2` dans le code PHP
- Mapping des valeurs "Oui"/"Non" vers les identifiants Plannit
- Injection dans le payload sous `job.customFields.1V1Soy6Zz`

**Technologies** : PHP, API REST Plannit (custom fields), Fluent Forms

---

### Point 3 — Page « Vie privée » dans le menu principal (Corrigé)

**Problème** : Le lien "Vie privée" apparaissait dans le menu de navigation principal du site, ce que le client trouvait trop visible.

**Correction** :
- Retrait du lien du menu principal via Apparence > Menus dans WordPress
- Proposition au client de placer le lien dans le pied de page sous "Informations légales" (en attente de validation du client)
- Conseil au client que la page doit rester accessible sur le site pour la conformité à la **Loi 25** (Loi sur la protection des renseignements personnels au Québec)

**Technologies** : WordPress (gestion des menus), connaissance réglementaire Loi 25

---

### Point 4 — Procédure « Détection de fuite d'eau » non visible (Corrigé)

**Problème** : Lorsqu'un visiteur sélectionnait "Détection de fuite d'eau et réparation de plomberie" comme service, une procédure devait s'afficher. Rien ne s'affichait, même en cochant la case.

**Diagnostic** :
- Le formulaire Fluent Forms contenait un bloc "Termes & Conditions" avec logique conditionnelle
- La condition utilisait l'opérateur **"égal"** au lieu de **"contient"** — incompatible avec un champ multi-select (la valeur est un tableau, jamais strictement "égale" à un seul choix)
- Un bloc HTML au-dessus contenait un **Lorem ipsum** jamais remplacé par le développeur précédent
- Le lien vers le PDF de procédure était en place mais le bloc ne s'affichait jamais à cause de la condition

**Correction** :
- Changement de l'opérateur de logique conditionnelle de "égal" → "contient"
- Remplacement du Lorem ipsum par un texte d'introduction contextuel guidant le visiteur vers la procédure
- Vérification que le lien PDF de la procédure de mesure d'eau fonctionne
- Application de la même logique conditionnelle au bloc HTML d'introduction

**Technologies** : Fluent Forms Pro (logique conditionnelle, formulaire multi-étapes)

---

### Point 5 — Soumissions en double dans le CRM (Diagnostiqué + Correctif en place)

**Problème** : Certaines soumissions de formulaire créaient deux entrées identiques dans le CRM Plannit, avec un écart de ~2 minutes entre les deux.

**Diagnostic approfondi** (investigation la plus complexe du projet) :

1. **Tests de soumission** : 8 soumissions tests via le formulaire, dont ~3 ont produit des doublons
2. **Analyse côté navigateur** : DevTools Network confirme un seul appel `admin-ajax.php` par soumission — pas de double-clic
3. **Analyse côté WordPress** : 
   - Les entrées Fluent Forms ne sont pas en double (une seule entrée par soumission)
   - Le WordPress Action Scheduler montre une seule action `fluentform/schedule_feedComplete` par soumission
   - Un seul webhook configuré dans Fluent Forms
   - Pas de code custom dans WPCode, pas de deuxième intégration
4. **Analyse côté front-end** : Aucun script Plannit widget/bot installé sur le site (vérifié dans le code source complet de la page)
5. **Logging** : Mise en place d'un fichier de log (`webhook-plannit-debug.log`) dans le filtre PHP — a confirmé que le filtre `fluentform/webhook_request_args` se déclenche **deux fois** pour une seule soumission, avec ~2 min d'écart
6. **Croisement des timestamps** : La deuxième exécution du filtre n'a **aucune action correspondante** dans le Action Scheduler

**Cause racine identifiée** : Race condition dans Action Scheduler (le système de traitement asynchrone utilisé par Fluent Forms). Action Scheduler possède deux voies d'exécution parallèles (WP-Cron + loopback async au shutdown) qui peuvent se chevaucher. L'acquisition du verrou via `update_option()` n'est pas atomique — deux processus peuvent croire simultanément qu'ils ont obtenu le verrou (bug documenté GitHub Action Scheduler #793). L'hébergement Infomaniak peut aggraver le problème avec un cron serveur potentiellement en double.

**Correctif appliqué** : Logging détaillé en place pour monitorer les occurrences. Solution identifiée : `add_filter('fluentform/notifying_async_webhook', '__return_false')` pour forcer l'exécution synchrone et éliminer Action Scheduler de l'équation. Contact du support Plannit avec les preuves techniques.

**Technologies** : PHP, WordPress Action Scheduler, Fluent Forms hooks, API REST Plannit, debug/logging, analyse de race conditions

---

## Tâches transversales

### Communication client
- Rédaction de multiples emails de diagnostic, suivi de progression et demandes d'accès
- Gestion de la problématique d'accès WordPress (emails transactionnels non fonctionnels, identifiants incorrects — 15+ emails échangés sur une journée)
- Identification que FluentSMTP est mal configuré (emails WordPress ne partent pas) — signalé au client

### Analyse de l'API Plannit
- Étude complète de la documentation Swagger de l'API Plannit (`/api/spec`)
- Requêtes API via cURL pour récupérer la liste des services (21) et des custom fields (3)
- Compréhension du modèle de données : jobs, contacts, services (IDs), custom fields (clés + valeurs prédéfinies), work orders

### Revue du code existant
- Audit du `functions.php` du thème enfant (filtre webhook custom)
- Revue du JavaScript custom du formulaire (logique conditionnelle radio buttons)
- Revue du CSS custom du formulaire (styling des boutons et dropdowns)
- Audit de la liste complète des 23 extensions WordPress installées
- Vérification de la configuration WP Super Cache (mode Expert)

---

## Compétences démontrées

- **WordPress** : thème enfant, hooks/filtres PHP, Fluent Forms Pro, Elementor, WP Super Cache, Action Scheduler, gestion des menus
- **Intégration API** : API REST Plannit, construction de payloads JSON, mapping de données entre systèmes, authentification par clé API
- **Debug** : logging custom, analyse de race conditions, croisement de timestamps entre systèmes, diagnostic par élimination systématique
- **Formulaires** : logique conditionnelle multi-étapes, multi-select, termes & conditions, encodage des caractères spéciaux
- **Conformité** : Loi 25 du Québec (politique de confidentialité)
- **Communication client** : vulgarisation technique, gestion de clients non-techniques, suivi de progression structuré

---

## Résultat

4 points sur 5 entièrement corrigés et validés par le client. Le point 5 (doublons) est diagnostiqué avec correctif en place et surveillance active. Le client a confirmé la satisfaction et souhaite confier des tâches supplémentaires.
