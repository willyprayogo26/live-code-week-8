<template>
  <div>
    <h1 v-if="!isLogin">Silahkan login dahulu biar buttonnya enable</h1>
    <div>
      <AddApodForm/>
      <div class="row">
        <div class="col-6">
          <SearchBar @setSearch="setSearch"/>
          <ApodList :isNew="isNew" :search="search" @seeDetail="seeDetail"/>
        </div>
        <div class="col-6">
          <router-view :detail="detail"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AddApodForm from "@/components/AddApodForm.vue";
import SearchBar from "@/components/SearchBar.vue";
import ApodList from "@/components/ApodList.vue";
import ApodDetail from "@/components/ApodDetail.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  name: "home",
  components: {
    AddApodForm,
    SearchBar,
    ApodList,
    ApodDetail
  },
  computed: {
    ...mapState(["isNew", "isLogin"])
  },
  data() {
    return {
      search: "",
      detail: {}
    };
  },
  methods: {
    setSearch(data) {
      this.search = data;
    },
    seeDetail(id) {
      axios({
        method: "GET",
        url: `/apods/${id}`,
        headers: {
          "Access-Token": localStorage.getItem("accessToken")
        }
      })
        .then(({ data }) => {
          this.detail = data;
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
    }
  }
};
</script>
