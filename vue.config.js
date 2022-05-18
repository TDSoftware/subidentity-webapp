const { defineConfig } = require("@vue/cli-service");

const execSync = require("child_process").execSync;

process.env.VUE_APP_GIT_COMMIT_HASH = execSync("git rev-parse HEAD").toString().trim().substring(0, 7);
process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.plugins.delete("named-chunks");
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
