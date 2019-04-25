<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card mb-4">
          <div class="card-header text-center">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="inputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                >
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="inputPassword"
                  placeholder="Password"
                >
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      inputEmail: "",
      inputPassword: ""
    };
  },
  methods: {
    login() {
      const input = {
        email: this.inputEmail,
        password: this.inputPassword
      };

      this.$store.dispatch("toLogin", input);

      this.inputEmail = "";
      this.inputPassword = "";
    }
  }
};
</script>

<style>
</style>
