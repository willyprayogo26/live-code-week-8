<template>
  <div class="card-body">
    <h5 class="card-title">{{apod.title}}</h5>

    <div v-if="apod.mediaType === 'image'">
      <!-- FOR IMAGE -->
      <img class="card-img-top" :src="apod.url" alt="Card image cap">
    </div>
    <div v-if="apod.mediaType === 'video'">
      <!-- FOR VIDEO -->
      <iframe width="498" height="332" :src="apod.url"></iframe>
    </div>

    <div class="mt-3">
      <button class="btn btn-primary mr-2" @click="seeDetail(apod._id)">See detail</button>
      <button class="btn btn-danger" @click="deleteApod(apod._id)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  props: ["apod"],
  name: "ApodItem",
  methods: {
    deleteApod(id) {
      axios({
        method: "DELETE",
        url: `/apods/${id}`,
        headers: {
          "Access-Token": localStorage.getItem("accessToken")
        }
      })
        .then(({ data }) => {
          this.$store.commit("setNew");
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
      this.$emit("seeDetail", id);
      this.$router.push(`/apod/${id}`);
    }
  }
};
</script>

<style>
</style>
