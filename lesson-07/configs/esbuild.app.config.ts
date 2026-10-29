import { readFile, rm, writeFile } from 'node:fs/promises';
import { context, type BuildOptions } from 'esbuild';

const modeArgument = process.argv.find((argument) => argument.startsWith('--mode='));
const mode = modeArgument?.slice('--mode='.length) ?? 'prod';

if (mode !== 'dev' && mode !== 'prod') {
    throw new Error(`Unknown build mode "${mode}". Use --mode=dev or --mode=prod.`);
}

const options: BuildOptions = {
    entryPoints: ['src/app/index.ts'],
    outdir: 'dist',
    entryNames: 'app',
    chunkNames: 'chunks/[name]-[hash]',
    bundle: true,
    minify: mode === 'prod',
    sourcemap: mode === 'prod',
    splitting: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2020',
    treeShaking: true,
};

if (mode === 'dev') {
    await rm(new URL('../dist/app.js.map', import.meta.url), { force: true });
}

const buildContext = await context(options);
await buildContext.rebuild();

const sourceHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const outputHtml = sourceHtml.replace('src="/dist/app.js"', 'src="./app.js"');

if (outputHtml === sourceHtml) {
    throw new Error('Could not find the esbuild entrypoint in index.html.');
}

await writeFile(new URL('../dist/index.html', import.meta.url), outputHtml);

if (mode === 'dev') {
    console.log('Watching for changes (dev mode, minification disabled)...');
    await buildContext.watch();
} else {
    await buildContext.dispose();
    console.log('Production build complete (minified with sourcemaps).');
}