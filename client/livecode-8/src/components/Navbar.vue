<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">From NASA with love</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/">
            <a class="nav-link">Home</a>
          </router-link>
        </ul>
      </div>

      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <router-link to="/login" v-if="!isLogin">
            <a class="nav-link">Login</a>
          </router-link>
          <router-link to="/register" v-if="!isLogin">
            <a class="nav-link">Register</a>
          </router-link>
          <router-link to="/" v-if="isLogin">
            <a class="nav-link" @click="toLogout">Logout</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "navbar",
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    toLogout() {
      localStorage.clear();
      this.$router.push('/');
      this.changeIsLogin();
    },
    ...mapMutations(["changeIsLogin"])
  }
};
</script>

<style>
</style>
