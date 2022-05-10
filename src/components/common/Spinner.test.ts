import { shallowMount } from "@vue/test-utils";
import Spinner from "./Spinner.vue";

describe("Spinner.vue", () => {
    it("should render the spinner with the correct passed props", async () => {
        const color = "#090590";
        const width = 5;
        const size = 100;
        const wrapper = shallowMount(Spinner, {
            props: {
                color,
                width,
                size
            }
        });
        const el = wrapper.find(".spinner");
        const styles = getComputedStyle(el.element);
        expect(styles.borderColor).toBe(color);
        expect(styles.borderWidth).toBe(width + "px");
        expect(styles.width).toBe(size + "px");
        expect(styles.height).toBe(size + "px");
    });
});