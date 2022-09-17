import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CopyPlugin from 'copy-webpack-plugin';

const { NODE_ENV = 'production' } = process.env;
module.exports = {
    entry: './bin/index.ts',
    mode: NODE_ENV,
    target: 'node',
    //devtool: 'inline-source-map',
    output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/**/*',
                },
                {
                    from: 'views/**/*',
                },
                {
                    from: 'log/**',
                },
                {
                    from: path.resolve(__dirname, 'package.json'),
                },
                {
                    from: path.resolve(__dirname, '.env'),
                },
            ],
        }),
    ],
    externals: [nodeExternals()],
};
