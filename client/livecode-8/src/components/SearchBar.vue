<template>
  <form class="input-group mb-3" @submit.prevent="find">
    <input
      type="text"
      name="search"
      id="search"
      v-model="inputName"
      class="form-control"
      autocomplete="off"
      placeholder="Search..."
    >
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="submit" v-if="isLogin">Search</button>
      <button class="btn btn-outline-secondary" type="submit" v-if="!isLogin" disabled>Search</button>
    </div>
  </form>
</template>

<script>
import axios from '@/api/axios';
import Swal from 'sweetalert2';
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      inputName: ""
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    find() {
      this.$emit('setSearch', this.inputName)
    }
  }
};
</script>

<style>
</style>
