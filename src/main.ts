import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(store, key).use(router).use(Toast).mount("#app");
