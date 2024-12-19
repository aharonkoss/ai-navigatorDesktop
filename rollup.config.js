import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'

const __ENV__ = process.env.NODE_ENV ?? 'development';

export default (args) => {
    return {
        input: 'src/main.js',

        output: {
            file: 'dist/main.js',
            format: 'esm', // Ensure ESM format
            sourcemap: true,
        },

        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify(__ENV__),
                preventAssignment: true,
            }),
            nodeResolve({ browser: true }), // Resolve node_modules for browser compatibility
            commonjs(), // Support CommonJS modules like Navigo
            lwc(),
            args.watch &&
                serve({
                    open: false,
                    port: 3000,
                    contentBase: 'dist',
                }),
            args.watch && livereload('dist'),
            copy({
                targets: [
                    { src: 'src/public/*', dest: 'dist/' }, // Copy static files to /dist/
                ],
            }),
        ],
    };
};
