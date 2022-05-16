import { shallowMount } from "@vue/test-utils";
import Pagination from "@/components/common/Pagination.vue";

describe("Pagination.vue", () => {
    describe("When next and previous buttons are not disabled", () => {
        it("should emit change event and return correct page number ", async function () {
            const wrapper = shallowMount(Pagination, {
                props: {
                    totalPages: 12,
                    currentPage: 2,
                    previous: 1,
                    next: 3,
                    maxVisibleButtons: 3
                }
            });

            const previousButton = wrapper.find({
                ref: "previous-button"
            });
            const nextButton = wrapper.find({
                ref: "next-button"
            });

            await previousButton.trigger("click");
            await nextButton.trigger("click");

            expect((previousButton.element as HTMLInputElement).disabled).toBe(false);
            expect((nextButton.element as HTMLInputElement).disabled).toBe(false);
            expect(wrapper.emitted().onPagechange[0]).toEqual([1]);
            expect(wrapper.emitted().onPagechange[1]).toEqual([3]);
        });
    });

    describe("When next and previous props are undefined and buttons are disabled", () => {
        it("should not emit change event", async function () {
            const wrapper = shallowMount(Pagination, {
                props: {
                    totalPages: 12,
                    currentPage: 1,
                    previous: undefined,
                    next: undefined,
                    maxVisibleButtons: 3
                }
            });

            const previousButton = wrapper.find({
                ref: "previous-button"
            });
            const nextButton = wrapper.find({
                ref: "next-button"
            });
            await previousButton.trigger("click");
            await nextButton.trigger("click");

            expect((previousButton.element as HTMLInputElement).disabled).toBe(true);
            expect((nextButton.element as HTMLInputElement).disabled).toBe(true);
            expect(wrapper.emitted()["onPagechange"]).toBeFalsy();
        });
    });
});