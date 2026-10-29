import { build } from 'esbuild';

const entryPoints = ['src/lib/index.ts', 'src/lib/math.ts', 'src/lib/string.ts'];

const sharedOptions = {
    entryPoints,
    outbase: 'src/lib',
    bundle: true,
    platform: 'neutral' as const,
    external: ['react', 'react/*', 'react-dom', 'react-dom/*', 'lodash', 'lodash/*'],
};

await Promise.all([
    build({
        ...sharedOptions,
        outdir: 'dist/lib/esm',
        format: 'esm',
    }),
    build({
        ...sharedOptions,
        outdir: 'dist/lib/cjs',
        format: 'cjs',
        outExtension: { '.js': '.cjs' },
    }),
]);
