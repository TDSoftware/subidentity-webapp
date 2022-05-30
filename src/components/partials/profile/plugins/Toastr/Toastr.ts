import Toast from "./Toast.vue";
import _Vue from "vue";

type ToastModel = {
    text: string;
    type: string;
    subtle?: boolean;
};

export function Toastr(Vue: typeof _Vue): void {
    const ComponentClass = Vue.extend(Toast);
    const renderedToasts: Array<ToastModel> = [];

    Vue.prototype.$toastr = {

        error(text: string, subtle?: boolean, autoHide?: number): Promise<void> {
            if (renderedToasts.find((t: ToastModel) => t.text === text && t.type === "error")) return Promise.resolve();
            return this._renderToast(text, "error", subtle, autoHide);
        },

        success(text: string, subtle?: boolean, autoHide?: number): Promise<void> {
            if (renderedToasts.find((t: ToastModel) => t.text === text && t.type === "success")) return Promise.resolve();
            return this._renderToast(text, "success", subtle, autoHide);
        },

        info(text: string, subtle?: boolean, autoHide?: number): Promise<void> {
            if (renderedToasts.find((t: ToastModel) => t.text === text && t.type === "info")) return Promise.resolve();
            return this._renderToast(text, "info", subtle, autoHide);
        },

        _renderToast(text: string, type: string, subtle?: boolean, autoHide?: number): Promise<void> {
            return new Promise((resolve: () => void) => {
                const instance = new ComponentClass({
                    data: {
                        toast: {
                            text,
                            type,
                            subtle
                        },
                        autoHide: subtle,
                        duration: typeof autoHide === "number" ? autoHide : 2000
                    }
                });
                document.body.appendChild(instance.$mount().$el);
                renderedToasts.push({text, type});
                instance.$on("close", () => {
                    document.body.removeChild(instance.$mount().$el);
                    instance.$destroy();
                    renderedToasts.splice(renderedToasts.findIndex((t: ToastModel) => t.text === text && t.type === type), 1);
                    resolve();
                });
            });
        }
    };
}
