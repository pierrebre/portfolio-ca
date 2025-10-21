import { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    // Créer le script JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data).replace(/</g, '\\u003c');
    script.id = `jsonld-${Date.now()}`; // ID unique pour le cleanup

    // Injecter dans le head
    document.head.appendChild(script);

    // Cleanup au démontage du composant
    return () => {
      const existingScript = document.getElementById(script.id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [data]);

  return null; // Ne rend rien dans le body
}
