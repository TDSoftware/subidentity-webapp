import { shallowMount } from "@vue/test-utils";
import CustomSelect from "@/components/common/CustomSelect.vue";

describe("CustomSelect.vue", () => {

    describe("When options is given", () => {
        const wrapper = shallowMount(CustomSelect, {
            props: {
                options: [{ key: "key", displayValue: "display" }]
            },
            stubs: ["ion-icon"]
        });
        it("should emit the correct event and value on selecting an option", async function () {
            const selectOption = wrapper.find(".select-option");

            // await wrapper.vm.$nextTick();
            await selectOption.trigger("click");

            expect(wrapper.emitted()["update:selectedKey"]).toBeTruthy();
            const eventArgs = (wrapper.emitted()["update:selectedKey"][0] as string[]);
            expect(eventArgs[0]).toBe("key");
        });

        it("should emit the correct default value when custom select is created", async function () {
            const eventArgs = (wrapper.emitted()["update:selectedKey"][0] as string[]);
            expect(eventArgs[0]).toBe("key");
        });
    });


    describe("When no options is given", () => {
        it("should pass empty array as props ", async function () {
            const wrapper = shallowMount(CustomSelect, {
                props: {
                    options: []
                },
                stubs: ["ion-icon"]
            });
            expect(wrapper.html()).toBeTruthy();
        });

    });
});