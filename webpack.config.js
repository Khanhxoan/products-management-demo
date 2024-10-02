const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        bundle: "./src/index.jsx",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),

        new CleanWebpackPlugin(),
    ],
    optimization: {
        runtimeChunk: {
            name: "manifest",
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
            chunks: "all",
        },
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        historyApiFallback: {
            index: "/index.html",
        },
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        devMiddleware: {
            writeToDisk: true, // Thêm dòng này để ghi file vào thư mục dist
        },
    },
    mode: "development",
    devtool: "eval-source-map",
};
