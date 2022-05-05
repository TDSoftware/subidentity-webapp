<template>
    <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                >
                    <ion-icon
                        size=""
                        class="icon"
                        name="information-circle-outline"
                    ></ion-icon>
                    <span class="fw-bold mx-2">Basic Info</span>
                </button>
            </h2>
            <div
                id="panelsStayOpen-collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
            >
                <div class="accordion-body">
                    <div>
                        <p class="mb-0 fw-bold">Address</p>
                        <div class="d-flex flex-row">
                            <p class="fw-light text-muted">
                                5FEJV93P94SerQhOq4Be9AAR2hZtC...
                            </p>
                            <a
                                class="text-decoration-none link-primary mx-2"
                                href="#"
                            >
                                <ion-icon
                                    size="small"
                                    name="copy-outline"
                                ></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div>
                        <p class="mb-0 fw-bold">Balance</p>
                        <p class="fw-light text-muted">14,21 DOT</p>
                    </div>
                    <div>
                        <p class="mb-0 fw-bold">Full name</p>
                        <div class="d-flex flex-row">
                            <p class="fw-light text-muted">Michael Müller</p>
                        </div>
                    </div>
                    <div>
                        <p class="mb-0 fw-bold">E-Mail</p>
                        <p class="fw-light text-muted">
                            michael.mueller@example.de
                        </p>
                    </div>
                    <div>
                        <p class="mb-0 fw-bold">Twitter</p>
                        <div class="d-flex flex-row">
                            <p class="fw-light text-muted">
                                @michaelmuellerexample
                            </p>
                            <a
                                class="text-decoration-none link-primary mx-2"
                                href="#"
                            >
                                <ion-icon
                                    size="small"
                                    name="link-outline"
                                    class="pt-1"
                                ></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div>
                        <p class="mb-0 fw-bold">Website</p>
                        <div class="d-flex flex-row">
                            <p class="fw-light text-muted">
                                michael.mueller.example
                            </p>
                            <a
                                class="text-decoration-none link-primary mx-2"
                                href="#"
                            >
                                <ion-icon
                                    size="small"
                                    class="pt-1"
                                    name="link-outline"
                                ></ion-icon>
                            </a>
                        </div>
                    </div>
                    <div>
                        <p class="mb-0 fw-bold">Judgements</p>
                        <p class="fw-light text-muted">
                            Registrar determined this identity as
                            <span class="text-success">good</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {}
})
export default class Accordion extends Vue {}
</script>
<style scoped>
.icon {
    font-size: 26px;
}
</style>
