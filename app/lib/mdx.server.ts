/**
 * Compilation MDX → HTML statique, partagée par le blog et les études de cas.
 * Ne s'exécute jamais côté client (suffixe .server.ts).
 */

import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";

// Un slug est un nom de fichier : minuscules, chiffres et tirets. Tout le
// reste (« ../ », « %2f »…) est refusé avant de toucher au disque.
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

const textOf = (node: HastNode): string =>
  node.value ?? node.children?.map(textOf).join("") ?? "";

const isElement = (node: HastNode, tagName: string) =>
  node.type === "element" && node.tagName === tagName;

/**
 * Plugin rehype : accessibilité du HTML des articles.
 * - Tableau : enveloppé dans une zone défilante focalisable (sur mobile, le
 *   défilement horizontal doit être possible au clavier), nommée d'après le
 *   titre de section qui la précède pour distinguer les tableaux entre eux.
 * - Liste de tâches (remark-gfm) : la case et son texte dans un <label>,
 *   sinon la case n'a pas de nom accessible.
 */
function rehypeAccessibleContent() {
  let lastHeading = "";
  let tableCount = 0;

  const transform = (node: HastNode): HastNode => {
    node.children = node.children?.map(transform);

    if (["h2", "h3", "h4"].some((tag) => isElement(node, tag))) {
      lastHeading = textOf(node).trim();
    }

    if (isElement(node, "table")) {
      tableCount += 1;
      return {
        type: "element",
        tagName: "div",
        properties: {
          className: ["table-scroll"],
          tabIndex: 0,
          role: "region",
          ariaLabel: lastHeading
            ? `Tableau ${tableCount} : ${lastHeading}`
            : `Tableau ${tableCount}`,
        },
        children: [node],
      };
    }

    const classes = node.properties?.className;
    if (
      isElement(node, "li") &&
      Array.isArray(classes) &&
      classes.includes("task-list-item")
    ) {
      node.children = [
        { type: "element", tagName: "label", properties: {}, children: node.children },
      ];
    }

    return node;
  };

  return (tree: HastNode) => {
    lastHeading = "";
    tableCount = 0;
    transform(tree);
  };
}

const evaluateOptions: EvaluateOptions = {
  jsx,
  jsxs,
  Fragment,
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeAccessibleContent],
};

/** Compile le corps MDX et le rend en HTML statique (aucune interactivité). */
export async function compileMdx(content: string): Promise<string> {
  const { default: Content } = await evaluate(content, evaluateOptions);
  return renderToStaticMarkup(createElement(Content as React.ComponentType));
}
