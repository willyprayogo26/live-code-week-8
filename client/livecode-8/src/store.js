import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import Swal from 'sweetalert2';
import axios from '@/api/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isNew: false,
  },
  mutations: {
    changeIsLogin(state) {
      state.isLogin = !state.isLogin;
    },
    setNew(state) {
      state.isNew = !state.isNew
    },
    setNewToFalse(state) {
      state.isNew = false
    },
  },
  actions: {
    toLogin({ commit, state, dispatch }, input) {
      axios({
        method: 'POST',
        url: '/login',
        data: input,
      })
        .then(({ data }) => {
          localStorage.setItem('id', data.id);
          localStorage.setItem('email', data.email);
          localStorage.setItem('accessToken', data.accessToken);
          router.push('/');
          commit('changeIsLogin');
        })
        .catch((err) => {
          Swal.fire({
            title: err.response.data.message,
            animation: false,
            customClass: {
              popup: 'animated swing',
            },
          });
        });
    }
  },
});
