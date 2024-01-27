import fs from "node:fs";
import path from "node:path";

export default (entries: { plugin: string; native?: string }): string[] => {
    const entrypoints = [entries.plugin];

    if (entries.native) {
        const nativeEntrypoint = path.join(process.cwd(), entries.native);

        if (fs.existsSync(nativeEntrypoint)) {
            entrypoints.push(nativeEntrypoint);
        }
    }

    return entrypoints;
};

export const makeConfig = (entries: { plugin: string; native?: string }): { plugin: string; native?: string } => {
    const out: ReturnType<typeof makeConfig> = {
        plugin: entries.plugin,
    };

    if (entries.native && fs.existsSync(path.join(process.cwd(), entries.native))) {
        out.native = entries.native;
    }

    return out;
};

export const configExists = (): boolean => {
    return fs.existsSync(path.join(process.cwd(), "relagit.json"));
};
