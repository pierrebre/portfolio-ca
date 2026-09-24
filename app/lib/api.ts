const SEND_ERROR =
  "L'envoi a échoué. Merci de réessayer dans un instant ou d'écrire à contact@pierrebarbe.ca.";

/**
 * Envoie un formulaire en JSON à l'API (VITE_API_URL, injectée au build).
 *
 * En cas d'échec, lève une Error dont le message peut être affiché tel quel
 * au visiteur : jamais de message technique (JSON invalide sur une page
 * d'erreur HTML, "Failed to fetch", URL "undefined/…").
 */
export async function postToApi(path: string, body: unknown): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_URL;
  if (!baseUrl) {
    console.error("[api] VITE_API_URL n'est pas défini au build");
    throw new Error(SEND_ERROR);
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(`[api] ${path} : requête impossible`, err);
    throw new Error(SEND_ERROR);
  }

  if (!response.ok) {
    // L'API répond { error } en JSON, mais un 404/502 peut renvoyer du HTML.
    const data = await response.json().catch(() => null);
    console.error(`[api] ${path} : HTTP ${response.status}`, data);
    // Les erreurs 4xx de l'API (validation, limite d'envoi) sont destinées
    // au visiteur ; les 5xx restent génériques.
    if (response.status < 500 && typeof data?.error === "string") {
      throw new Error(data.error);
    }
    throw new Error(SEND_ERROR);
  }
}
