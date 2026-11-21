import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las instrucciones para agentes viven en el AGENTS.md raíz del monorepo.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
