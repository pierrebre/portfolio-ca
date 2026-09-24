import type { UseFormRegisterReturn } from "react-hook-form";

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
