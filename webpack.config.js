module.exports = {
    entry : "./src/index",

    output : {
        filename      : './index.js',
        library       : "Mixture",
        libraryTarget : 'umd'
    },

    devtool : 'source-map',

    resolve : {
        extensions : [ '.ts', '.js' ] 
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'ts'
            }
        ],

        preLoaders : [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};
