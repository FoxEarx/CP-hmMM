const subjects = {
  state: {
    EditInfo: {},
    directorys: {},
    detailsId: "",
  },
  mutations: {
    setEditInfo: (state, payload) => {
      state.EditInfo = payload;
    },
    setDirectorys: (state, payload) => {
      state.directorys = payload;
    },
    setDetailsId: (state, payload) => {
      state.detailsId = payload;
    },
  },
  actions: {
    getEdit(context, payload) {
      context.commit("setEditInfo", payload);
    },
    getDirectorys(context, payload) {
      context.commit("setDirectorys", payload);
    },
    getDetailsId(context, payload) {
      context.commit("setDetailsId", payload);
    },
  },
};

export default subjects;
