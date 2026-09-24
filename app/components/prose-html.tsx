import type { MouseEvent } from "react";
import { useNavigate } from "react-router";

/**
 * HTML statique issu d'un MDX (article, étude de cas), mis en forme par
 * @tailwindcss/typography. Les liens internes du contenu sont de simples <a> :
 * on intercepte le clic pour naviguer côté client, comme un <Link>.
 */
export default function ProseHtml({ html, className = "" }: { html: string; className?: string }) {
  const navigate = useNavigate();

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest("a");
    const href = link?.getAttribute("href");
    if (!link || !href?.startsWith("/") || href.startsWith("//") || link.target) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    // Clic délégué aux liens du contenu (Entrée sur un lien déclenche aussi un clic).
    <div
      onClick={onClick}
      className={`prose prose-base md:prose-lg max-w-none
        prose-headings:font-bold
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
        prose-h2:mt-10 prose-h3:mt-6 prose-h3:mb-2
        prose-p:leading-relaxed
        prose-a:underline-offset-2 hover:prose-a:no-underline
        prose-code:text-sm prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-code:before:content-none prose-code:after:content-none
        [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-base-content/10
        prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:border-l-4
        [&_blockquote]:rounded-r-xl [&_blockquote]:bg-primary/5 [&_blockquote]:py-4
        prose-table:text-sm [&_thead_th]:bg-base-200 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
