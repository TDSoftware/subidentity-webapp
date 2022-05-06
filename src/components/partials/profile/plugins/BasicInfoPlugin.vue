<template>
    <Accordion>
        <template #title>Basic Info</template>
        <template #body>
            <div v-if="identity.basicInfo.address">
                <p class="mb-0 fw-bold">Address</p>
                <div class="d-flex flex-row">
                    <p
                        class="fw-light text-muted"
                        style="overflow-wrap: anywhere"
                    >
                        {{ identity.basicInfo.address }}
                    </p>
                    <!-- TODO: add copy to clip board feature -->
                    <span class="text-decoration-none link-primary mx-2">
                        <ion-icon size="small" name="copy-outline"></ion-icon>
                    </span>
                </div>
            </div>
            <!-- TODO: add this -->
            <!-- <div>
                <p class="mb-0 fw-bold">Balance</p>
                <p class="fw-light text-muted">-</p>                
            </div> -->
            <div v-if="identity.basicInfo.display">
                <p class="mb-0 fw-bold">Full name</p>
                <div class="d-flex flex-row">
                    <p class="fw-light text-muted">
                        {{ identity.basicInfo.display }}
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
                        <ion-icon
                            size="small"
                            name="link-outline"
                            class="pt-1"
                        ></ion-icon>
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
                        href="identity.basicInfo.web"
                        target="_blank"
                    >
                        <ion-icon
                            size="small"
                            class="pt-1"
                            name="link-outline"
                        ></ion-icon>
                    </a>
                </div>
            </div>
            <!-- TODO: add this -->
            <!-- <div>
                <p class="mb-0 fw-bold">Judgements</p>
                <p class="fw-light text-muted">
                    Registrar determined this identity as
                    <span class="text-success">good</span>
                </p>
            </div> -->
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
}
</script>