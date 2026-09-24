import type { UseFormRegisterReturn } from "react-hook-form";
import { Link } from "react-router";

/**
 * Champ piège anti-spam : hors écran, masqué aux lecteurs d'écran et hors du
 * parcours clavier, donc laissé vide par les humains. Un robot qui remplit
 * tous les champs le remplit aussi. Ne remplace pas une protection côté API.
 */
export function HoneypotField({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Ne pas remplir ce champ
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}

/** Message affiché sans JavaScript : l'envoi du formulaire en dépend. */
export function NoScriptNotice() {
  return (
    <noscript>
      <p className="text-sm">
        Formulaire indisponible sans JavaScript. Contact direct :{" "}
        <a href="mailto:contact@pierrebarbe.ca" className="link">
          contact@pierrebarbe.ca
        </a>
      </p>
    </noscript>
  );
}

/**
 * Mention Loi 25 sous chaque formulaire. `onNavigate` ferme la fenêtre d'audit
 * avant d'ouvrir la politique (sinon elle resterait par-dessus la page).
 */
export function PrivacyNotice({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <p className="text-base-content/70 text-xs">
      Tes informations servent uniquement à te répondre. Détails dans la{" "}
      <Link to="/politique-confidentialite" className="underline" onClick={onNavigate}>
        politique de confidentialité
      </Link>
      .
    </p>
  );
}
