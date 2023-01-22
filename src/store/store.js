import { createStore } from 'vuex'

export default createStore({
  state: {
    // HOST : "http://localhost:2000",
    HOST : "https://admin.monkey-school.ch",
    popUp : {
      dispay : false,
      succes : Boolean,
      message : "",
    },

  },
  mutations: {
    popUpClass(state, payload){ // parametre attendu ( succes , message )
        state.popUp.display = true
        payload.succes ? state.popUp.succes = true : state.popUp.succes = false
        state.popUp.message = payload.message 
    }

  },
  actions: {
  },
  modules: {
  }
})
