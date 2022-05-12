<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: previous === undefined }">
                <button
                    type="button"
                    :disabled="previous === undefined"
                    class="page-link"
                    @click="onClickPreviousPage"
                >
                    Previous
                </button>
            </li>
            <li
                v-for="page in pages"
                :class="{ active: currentPage === page.name }"
                class="page-item"
                :key="page.name"
            >
                <button
                    @click="onClickPage(page.name)"
                    :disabled="page.isDisabled"
                    type="button"
                    class="page-link"
                >
                    {{ page.name }}
                </button>
            </li>
            <li class="page-item" :class="{ disabled: next === undefined }">
                <button
                    @click="onClickNextPage"
                    type="button"
                    :disabled="next === undefined"
                    class="btn page-link"
                >
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    props: {
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
        previous: {
            type: Number || undefined,
            required: true
        },
        next: {
            type: Number || undefined,
            required: true
        },
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3
        }
    }
})
export default class Pagination extends Vue {
    currentPage!: number;
    totalPages!: number;
    maxVisibleButtons!: number;

    get startPage() {
        // When on the first page
        if (this.currentPage === 1) {
            return 1;
        }

        // When on the last page
        if (this.currentPage === this.totalPages) {
            if (this.currentPage >= 3) {
                return this.totalPages - 2;
            }
        }

        // When inbetween
        return this.currentPage - 1;
    }

    get pages() {
        let range = [];

        for (
            let i = this.startPage;
            i <=
            Math.min(
                this.startPage + this.maxVisibleButtons - 1,
                this.totalPages
            );
            i++
        ) {
            range.push({
                name: i,
                isDisabled: i === this.currentPage
            });
        }
        return range;
    }

    onClickNextPage() {
        this.$emit("onPagechange", this.currentPage + 1);
    }
    onClickPreviousPage() {
        this.$emit("onPagechange", this.currentPage - 1);
    }
    onClickPage(page: number) {
        this.$emit("onPagechange", page);
    }
}
</script>

<style lang="scss" scoped>
</style>