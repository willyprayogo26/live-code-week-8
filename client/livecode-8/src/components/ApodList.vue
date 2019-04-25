<template>
  <div class="card mt-2">
    <ApodItem v-for="(apod, index) in searchApodByTitle" :key="index" :apod="apod" @seeDetail="seeDetail"/>
  </div>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";
import ApodItem from "@/components/ApodItem.vue";

export default {
  props: ["isNew", "search"],
  name: "ApodList",
  components: {
    ApodItem
  },
  watch: {
    isNew(newValue, oldValue) {
      if (newValue === true) {
        this.getList();
      }
    },
  },
  data() {
    return {
      apods: [],
    };
  },
  computed: {
    searchApodByTitle: function() {
      return this.apods.filter(apod =>
        apod.title.toLowerCase().match(this.search.toLowerCase())
      );
    }
  },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.getList();
    }
  },
  methods: {
    getList() {
      axios({
        method: "GET",
        url: `/apods`,
        headers: {
          "Access-Token": localStorage.getItem("accessToken")
        }
      })
        .then(({ data }) => {
          this.apods = data;
          this.$store.commit("setNewToFalse");
        })
        .catch(err => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: "animated swing"
            }
          });
        });
    },
    seeDetail(id) {
        this.$emit('seeDetail', id)
    }
  }
};
</script>

<style>
</style>
