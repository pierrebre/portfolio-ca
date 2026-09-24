/**
 * Formate une date calendaire "AAAA-MM-JJ" (frontmatter) en français.
 *
 * `new Date("2026-03-26")` vaut minuit UTC : formatée dans le fuseau local,
 * elle devient le 25 mars à Montréal alors que le serveur (UTC) rend le 26.
 * Le rendu en UTC garde le même jour partout et évite l'erreur d'hydratation.
 */
export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
