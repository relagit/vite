import { builtinModules } from "node:module";
import { defineConfig } from "rollup";
import dts from "vite-plugin-dts";

import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    input: "src/index.ts",
    output: {
        dir: "dist",
        format: "es",
    },
    external: builtinModules.concat(["node:fs", "node:path", "node:module"]),
    plugins: [dts({ rollupTypes: true }), typescript()],
});
