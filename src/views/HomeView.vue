<template>
  <div class="home">
    <!--    <img alt="Vue logo" src="../assets/logo.png"/>-->
    <!--    <div>-->
    <!--      <AmazingButton @click="onAmazingButtonClick">-->
    <!--        Toggle Text-->
    <!--      </AmazingButton>-->
    <!--      <p v-if="clicked">-->
    <!--        Yes that is so beautiful!-->
    <!--      </p>-->
    <!--    </div>-->
    <!--    <p>-->
    <!--      <AmazingButton class="login-button" @click="toggleAuthenticated">-->
    <!--        {{ $store.state.isAuthenticated ? "Logout" : "Login" }}-->
    <!--      </AmazingButton>-->
    <!--    </p>-->
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import AmazingButton from "@/components/AmazingButton.vue"; // @ is an alias to /src

@Options({
    components: {
        AmazingButton
    }
})
export default class HomeView extends Vue {

  private clicked = false;

  onAmazingButtonClick() {
      console.log("Yeah");
      this.clicked = !this.clicked;
  }

    // toggleAuthenticated() {
    //     if(this.$store.state.isAuthenticated) {
    //         this.$store.commit("logout");
    //     } else {
    //         this.$store.commit("login");
    //     }
    // }
}
</script>
