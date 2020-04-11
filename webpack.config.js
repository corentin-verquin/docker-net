module.exports = {
    mode: process.env.NODE_ENV === "PROD" ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    }
}