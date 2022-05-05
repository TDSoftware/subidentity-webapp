const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                options.compilerOptions = {
                    ...(options.compilerOptions || {}),
                    isCustomElement: tag => /^ion-/.test(tag) || tag === "polkadot-web-identicon"
                };
                return options;
            });
    }
});
