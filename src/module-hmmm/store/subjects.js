const subjects = {
  state: {
    EditInfo: {},
    directorys: {},
  },
  mutations: {
    setEditInfo: (state, payload) => {
      state.EditInfo = payload;
    },
    setDirectorys: (state, payload) => {
      state.directorys = payload;
    },
  },
  actions: {
    getEdit(context, payload) {
      context.commit("setEditInfo", payload);
    },
    getDirectorys(context, payload) {
      context.commit("setDirectorys", payload);
    },
  },
};

export default subjects;
