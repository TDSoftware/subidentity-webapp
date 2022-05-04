import { shallowMount } from "@vue/test-utils";
import SearchView from "@/views/SearchView.vue";
import { get } from "@/util/storage";

jest.mock("@/util/storage");
import { mocked } from "jest-mock";

const mockedGet = mocked(get);

describe("SearchView.vue", () => {
    it("should hide the recentSearch component if no recent search is available", () => {
        expect(true).toBe(false);

        // TODO: implement that

    });
});