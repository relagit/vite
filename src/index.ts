import { builtinModules } from "node:module";
import { type UserConfig } from "vite";

import getEntrypoints, { configExists, makeConfig } from "./entrypoints";

export type RelaGitViteOptions = Partial<{
    entrypoints: {
        plugin: string;
        native?: string;
    };
    external: string[];
}>;

export const defineConfig = (options: RelaGitViteOptions = {}): UserConfig => {
    const entrypoints = options.entrypoints ?? {
        plugin: "src/index.ts",
        native: "src/native.ts",
    };

    if (!configExists()) {
        makeConfig(entrypoints);
    }

    return {
        build: {
            target: "esnext",
            outDir: "dist",
            emptyOutDir: true,
            lib: {
                entry: getEntrypoints(entrypoints),
                formats: ["es"],
                fileName: (_, name) => `${name}.js`,
            },
            rollupOptions: {
                external: ["relagit:actions", "relagit:themes"].concat(builtinModules).concat(builtinModules.map((module) => `node:${module}`)),
            },
        },
    };
};

export default defineConfig;
