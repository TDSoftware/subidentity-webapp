<template>
  <div class="bg-white">
    <div class="row p-2 pt-5 justify-content-start text-muted fw-bold">
      <h6 class="col-2">Name</h6>
      <h6 class="col-3">E-MAIL</h6>
      <h6 class="col-3">ADDRESS</h6>
      <h6 class="col-2">CHAIN</h6>
      <h6 class="col-2">PROFILE</h6>
    </div>

    <div class="row rounded border">
      <div class="col-2 p-2">
        <div class="d-flex flex-row">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            height="45"
            width="45"
            class="rounded-circle p-0"
            alt="Cinque Terre"
          />
          <h6 class="p-2">Micheal Muller</h6>
        </div>
      </div>
      <div class="col-3 p-3 fw-light text-muted">
        michael.mueller@example.de
      </div>
      <div class="col-3 p-3 fw-light text-muted">
        5FEJV93P94SerQhOq4Be9AC...
      </div>
      <div class="col-2 p-3">
        <div class="d-flex flex-row badge text-capitalize bg-light">
          <div class="fw-light text-muted">
            <ion-icon
              size="small"
              class="fw-light text-muted"
              name="git-network-outline"
            ></ion-icon>
          </div>
          <div class="mx-2">Polkadot</div>
        </div>
      </div>
      <div class="col-2 p-3">
        <a class="text-decoration-none link-primary" href="#">Details --></a>
      </div>
    </div>

    <div class="row rounded border">
      <div class="col-2 p-2">
        <div class="d-flex flex-row">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            height="45"
            width="45"
            class="rounded-circle p-0"
            alt="Cinque Terre"
          />
          <h6 class="p-2">Micheal Muller</h6>
        </div>
      </div>
      <div class="col-3 p-3 fw-light text-muted">
        michael.mueller@example.de
      </div>
      <div class="col-3 p-3 fw-light text-muted">
        5FEJV93P94SerQhOq4Be9AC...
      </div>
      <div class="col-2 p-3">
        <div class="d-flex flex-row badge text-capitalize bg-light">
          <div class="fw-light text-muted">
            <ion-icon
              size="small"
              class="fw-light text-muted"
              name="git-network-outline"
            ></ion-icon>
          </div>
          <div class="mx-2">Polkadot</div>
        </div>
      </div>
      <div class="col-2 p-3">
        <a class="text-decoration-none link-primary" href="#">Details --></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class IdentityList extends Vue {}
</script>