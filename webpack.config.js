var Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('./src/Resources/public')
    .setPublicPath('/bundles/cowegisclient')
    .addEntry('cowegis', './js/client.js')
    .disableSingleRuntimeChunk()
    .setManifestKeyPrefix('cowegis')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(false)
    .enablePostCssLoader()
    .configureFilenames({
        css: 'css/[name].css',
        js: 'js/[name].js'
    })
;

const config = Encore.getWebpackConfig();

// Fix issue occurs with @mapbox/maki
config.node = {
    fs: 'empty'
}

module.exports = config