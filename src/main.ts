import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {store, key} from "./store";
import {Toastr} from "./components/partials/profile/plugins/Toastr/Toastr";

createApp(App).use(store, key).use(router).use(Toastr).mount("#app");
