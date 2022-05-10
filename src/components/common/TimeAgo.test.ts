import TimeAgo from "@/components/common/TimeAgo.vue";
import { timeBetween } from "@/util/timeBetween";
import { shallowMount } from "@vue/test-utils";

describe("TimeAgo.vue", () => {
    it("should render the time returned by the timeBetween util", async () => {
        const fakeDate = new Date(123456789);
        const wrapper = shallowMount(TimeAgo, {
            props: {
                date: fakeDate
            }
        });
        await wrapper.vm.$nextTick();
        const timeDescription = timeBetween(fakeDate, new Date());
        expect(wrapper.text()).toContain(timeDescription);
    });
});