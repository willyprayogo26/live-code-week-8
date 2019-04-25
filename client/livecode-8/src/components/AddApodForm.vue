<template>
  <div class="jumbotron">
    <div class="row justify-content-center text-center">
      <div class="col-6">
        <div>
          <h2>Add Astronomy Picture</h2>
          <p>
            <em>Please input date</em>, etc.
          </p>
          <form class="input-group" @submit.prevent="addApod">
            <datepicker v-model="date"></datepicker>
            <div class="input-group-append">
              <button class="btn btn-primary" type="submit" v-if="isLogin">Submit</button>
              <button class="btn btn-primary" type="submit" v-if="!isLogin" disabled>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import axios from "@/api/axios";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "AddApodForm",
  data() {
    return {
      date: ""
    };
  },
  components: {
    Datepicker
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    addApod() {
        let year = this.date.getFullYear()
        let month = this.date.getMonth() + 1
        let day = this.date.getDate()
        
        if(month < 10) {
            month = '0' + month
        }
        
        if(day < 10) {
            day = '0' + day
        }

      let input = {
        date: `${year}-${month}-${day}`
      };

      axios({
        method: "POST",
        url: `/apods`,
        data: input,
        headers: {
          "Access-Token": localStorage.getItem('accessToken'),
        }
      })
        .then(({ data }) => {
            this.$store.commit('setNew')
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

<style>
</style>
