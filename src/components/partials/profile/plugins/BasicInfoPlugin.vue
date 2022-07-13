<template>
    <Accordion icon="information-circle-outline.svg">
        <template #title>BASIC INFO</template>
        <template #body>
            <div
                v-if="identity.basicInfo.address"
                @click="copy(identity.basicInfo.address)"
            >
                <p class="mb-0 fw-bold">Address</p>
                <div class="d-flex flex-row">
                    <p
                        class="fw-light text-muted"
                        style="overflow-wrap: anywhere"
                        id="id"
                    >
                        {{ identity.basicInfo.address }}
                    </p>
                    <span class="text-decoration-none link-primary mx-2">
                        <img
                            src="../../../../assets/icons/copy-outline-primary.svg"
                            style="width: 18px"
                        />
                    </span>
                </div>
            </div>
            <div v-if="balance">
                <p class="mb-0 fw-bold">Balance</p>
                <p class="fw-light text-muted">{{ balance }}</p>
            </div>
            <div v-if="identity.basicInfo.legal">
                <p class="mb-0 fw-bold">Full Name</p>
                <div class="d-flex flex-row">
                    <p class="fw-light text-muted">
                        {{ identity.basicInfo.legal }}
                    </p>
                </div>
            </div>
            <div v-if="identity.basicInfo.email">
                <p class="mb-0 fw-bold">E-Mail</p>
                <p class="fw-light text-muted">
                    {{ identity.basicInfo.email }}
                </p>
            </div>
            <div v-if="identity.basicInfo.twitter">
                <p class="mb-0 fw-bold">Twitter</p>
                <div class="d-flex flex-row">
                    <p class="fw-light text-muted">
                        {{ identity.basicInfo.twitter }}
                    </p>
                    <a
                        class="text-decoration-none link-primary mx-2"
                        target="_blank"
                        :href="
                            'https://twitter.com/' + identity.basicInfo.twitter
                        "
                    >
                        <img
                            src="../../../../assets/icons/link-outline-primary.svg"
                            style="width: 16px"
                        />
                    </a>
                </div>
            </div>
            <div v-if="identity.basicInfo.web">
                <p class="mb-0 fw-bold">Website</p>
                <div class="d-flex flex-row">
                    <p class="fw-light text-muted">
                        {{ identity.basicInfo.web }}
                    </p>
                    <a
                        class="text-decoration-none link-primary mx-2"
                        :href="identity.basicInfo.web"
                        target="_blank"
                    >
                        <img
                            src="../../../../assets/icons/link-outline-primary.svg"
                            style="width: 16px"
                        />
                    </a>
                </div>
            </div>

            <div v-if="judgements[0]">
                <p class="mb-0 fw-bold">Judgements</p>
                <div v-for="(judgement, index) in judgements" :key="index">
                    <p
                        v-if="judgement === 'feepaid'"
                        class="fw-light text-muted"
                    >
                        Account requested judgement
                    </p>
                    <p v-else class="fw-light text-muted">
                        A Registrar determined this identity as
                        <span class="text-success">
                            {{ judgement }}
                        </span>
                    </p>
                </div>
            </div>
        </template>
    </Accordion>
</template>

<script lang="ts">
import Accordion from "@/components/common/Accordion.vue";
import { Identity } from "@npmjs_tdsoftware/subidentity";
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
        Accordion
    },
    props: {
        identity: {
            type: Object,
            required: true
        }
    }
})
export default class BasicInfoPlugin extends Vue {
    identity!: Identity;

    get judgements() {
        return this.identity.judgements?.map((judgement: string) =>
            judgement.toLowerCase()
        );
    }

    get balance() {
        const { total, symbol } = this.identity.balance ?? {};
        if (!total || !symbol) return "";
        return this.getNumberFormatter(symbol, total);
    }

    async copy(s: string) {
        if (!s) return;
        await navigator.clipboard.writeText(s);
        let element = document.getElementById("id") as HTMLDivElement;
        if (element.classList.contains("flash")) return;
        element.className += " flash";
        setTimeout(function () {
            element.classList.remove("flash");
        }, 500);
    }

    getNumberFormatter(currency: string, total: string) {
        try {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency
            }).format(Number(total));
        } catch (error) {
            return `${currency} ${total}`;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../../styles/variables";
.flash {
    color: $primary !important;
}
</style>