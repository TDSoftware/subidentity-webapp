<template>
    <Modal :open="open" @update:open="$emit('update:open', $event)">
        <template #title>
            Transfer Token
        </template>
        <template #body>
            <div class="row inputs">
                <div class="mb-3 col">
                    <label class="form-label fw-bold">Amount in {{identity.balance.symbol}}</label>
                    <input
                            v-model="tokenAmount"
                            type="number"
                            class="form-control input-address"
                            placeholder="0.00"
                            @keypress.enter="sendToken"
                    />
                </div>
                <div
                    class="mb-3 col"
                >
                    <label class="form-label fw-bold">Receiver</label>
                    <div>{{identity.basicInfo.display}}</div>
                    <div class="text-muted" style="overflow-wrap: anywhere">{{identity.basicInfo.address}}</div>
                </div>
            </div>
            <Alert class="mt-3" v-if="error" :message="error" />
            <div class="buttons">
                <div>
                    <button
                        class="btn btn-primary text-white d-block"
                        :disabled="busy"
                        @click="sendToken"
                    >
                        <Spinner v-if="busy" />
                        TRANSFER
                    </button>
                    </div>
                    <div class="">
                        <button
                            class="btn btn-dark d-block"
                            :disabled="busy"
                            @click="closeSendToken"
                        >
                            CANCEL
                        </button>
                  </div>
            </div>
        </template>
    </Modal>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "../../common/Modal.vue";
import Spinner from "@/components/common/Spinner.vue";
import Alert from "@/components/common/Alert.vue";
import { Identity } from "@npmjs_tdsoftware/subidentity";

@Options({
    components: {
        Modal,
        Spinner,
        Alert
    },
    props: {
        open: {
            type: Boolean,
            required: true
        },
        identity: {
            type: Object,
            required: true
        }
    }
})

export default class TokenModal extends Vue{
    identity!: Identity;
    open!: boolean;
    tokenAmount = "";
    busy = false;
    error = "";

    sendToken(){
        this.error = "";
        if (!this.validateInput()){
            this.error = "Please insert a positive float as token amount.";
        }
        else{
            alert("This Feature will be added soon :)");
        }
    }
    closeSendToken(){
        this.$emit("update:open", false);
    }
    validateInput(){
        //eslint-disable-next-line
        const positiveFloat = new RegExp("^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$");
        return positiveFloat.test(this.tokenAmount);
    }
}

</script>

<style lang="scss" scoped>
@import "../../../styles/variables";
.input-address {
  border: solid 1px #dee2e6 !important;
}

.input-name {
  border-style: none;
  background: none;
  padding-left: 0;
}

.buttons {
  display: flex;
  flex-direction: row;
  & > div {
    margin-right: 1rem;
  }
}

@include media-breakpoint-down(lg) {
  .buttons {
    margin-top: 1rem;
    & > div {
      width: 100%;
      &:first-child {
        margin-bottom: 0.75rem;
      }
      button {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    }
  }
}

@include media-breakpoint-down(lg) {
  .inputs {
    display: flex;
    flex-direction: column;
  }
}
</style>