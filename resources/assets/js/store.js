import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null
  },
  mutations: {
    TOKEN: (state, data) => {
      state.token = data;
    },
    USER: (state, data) => {
      Vue.$set(state, "user", data);
    }
  },
  actions: {
    Init({ dispatch }) {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        if (token) {
          dispatch("setToken", token);
          resolve(true);
        } else {
          resolve();
        }
      });
    },
    setToken({ commit }, token) {
      commit("TOKEN", token);
      localStorage.setItem("token", token);
      // set token vao axios
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // lay user
    }
  }
});
