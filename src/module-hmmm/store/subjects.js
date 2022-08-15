const subjects = {
  state: {
    EditInfo: {},
  },
  mutations: {
    setEditInfo: (state, payload) => {
      state.EditInfo = payload;
    },
  },
  actions: {
    getEdit(context, payload) {
      context.commit("setEditInfo", payload);
    },
  },
};

export default subjects;
