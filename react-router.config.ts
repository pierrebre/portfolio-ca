import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // Comportements par défaut de React Router v8, activés dès maintenant pour
  // que la mise à jour soit sans surprise.
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
