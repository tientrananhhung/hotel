import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    snackbar: {
      status: false,
      content: "Alert",
      type: "success",
      timeout: 2000
    }
  },
  mutations: {
    TOKEN: (state, data) => {
      state.token = data;
    },
    USER: (state, data) => {
      Vue.set(state, "user", data);
    },
    SNACKBAR: (state, data) => {
      Vue.set(state, "snackbar", data);
    }
  },
  actions: {
    Init({ dispatch }) {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        if (token) {
          dispatch("setToken", token).then(() => {
            resolve(true);
          });
        } else {
          resolve();
        }
      });
    },
    async setToken({ commit, dispatch }, token) {
      commit("TOKEN", token);
      localStorage.setItem("token", token);
      // set token vao axios
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      // lay user
      await dispatch("getUser");
    },
    async getUser({ commit }) {
      await axios
        .post("/details", { email: localStorage.getItem("EMAIL") })
        .then(res => {
          // console.log(res.data);
          commit("USER", res.data.success);
        });
    },
    signOut() {
      localStorage.removeItem("token");
      window.location.href = "#/login";
    }
  }
});
