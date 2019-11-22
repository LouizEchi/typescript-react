const {
    override,
    overrideDevServer,
    addBundleVisualizer,
    addWebpackAlias,
    adjustWorkbox,
    watchAll,
} = require('customize-cra')
const path = require('path')
const fs = require('fs')

module.exports = {
    webpack: override(
        // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
        process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

        // add an alias for "ag-grid-react" imports
        addWebpackAlias({
            '@src': path.resolve(__dirname, 'src/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@constants': path.resolve(__dirname, 'src/constants/*'),
        }),

        // adjust the underlying workbox
        adjustWorkbox(wb =>
            Object.assign(wb, {
                skipWaiting: true,
                exclude: (wb.exclude || []).concat('index.html'),
            }),
        ),
    ),
    devServer: overrideDevServer(
        // dev server plugin
        watchAll(),
    ),
}
