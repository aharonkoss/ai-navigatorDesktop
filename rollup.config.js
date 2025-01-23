import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import { exec } from 'child_process';

const __ENV__ = process.env.NODE_ENV ?? 'development';

export default (args) => {
    return {
        input: 'src/main.js',

        output: {
            file: 'dist/main.js',
           // format: 'esm', // Ensure ESM format
           format: 'iife',
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
                verbose: true
            }),
            {
                // Plugin to start the Node.js API service
                name: 'start-api-service',
                buildStart() {
                    console.log("Starting API service...");
                    exec('node server.js', (err, stdout, stderr) => {  // Start the server.js API service
                        if (err) {
                            console.error(`Error starting server: ${stderr}`);
                            return;
                        }
                        console.log(stdout); // Output server logs
                    });
                }
            }
        ],
        watch: {
            clearScreen: false, // Do not clear console on re-run
        }
    };
};
