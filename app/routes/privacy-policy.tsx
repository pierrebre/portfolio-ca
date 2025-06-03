export default function PrivacyPolicy() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
      <p className="mb-4 text-sm text-gray-500">
        Dernière mise à jour : 3 juin 2025
      </p>

      <p className="mb-4">
        Chez Pierre Barbé, développeur web freelance basé au Québec, la
        protection de votre vie privée est une priorité. Cette politique
        explique quelles données sont collectées, comment elles sont utilisées
        et vos droits en tant qu’utilisateur.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">📬 Données collectées</h2>
      <p className="mb-4">
        Les informations recueillies via le formulaire de contact sont : prénom,
        nom de famille, adresse courriel et message. Aucune autre donnée n’est
        collectée.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        🎯 Utilisation des données
      </h2>
      <p className="mb-4">
        Les données sont utilisées uniquement pour répondre à votre demande.
        Elles transitent par le service Resend et ne sont jamais revendues ni
        partagées.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        🕓 Durée de conservation
      </h2>
      <p className="mb-4">
        Les messages sont conservés durant 1 mois avant suppression définitive.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🔐 Sécurité</h2>
      <p className="mb-4">
        Les données sont protégées par des accès sécurisés (mot de passe, 2FA).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        👤 Responsable des données
      </h2>
      <p className="mb-4">
        Pierre Barbé –{" "}
        <a
          href="mailto:contact@pierrebarbe.ca"
          className="text-primary underline"
        >
          contact@pierrebarbe.ca
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">🧾 Vos droits</h2>
      <p className="mb-4">
        Vous pouvez demander à consulter, modifier ou supprimer vos données à
        tout moment, en écrivant à l’adresse ci-dessus.
      </p>
    </section>
  );
}
