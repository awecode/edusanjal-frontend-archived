// TODO Use vue-router's stringify
const queryString = require('query-string');

export const state = () => ({
  institutes: {objects: [], pagination: {}}
});

export const getters = {
  get_items: (state) => (collection_name) => {
    return state[collection_name].objects;
  },
  get_pagination: (state) => (collection_name) => {
    return state[collection_name].pagination;
  }
};

export const mutations = {
  update_data(state, [collection_name, data]) {
    let collection = state[collection_name];
    collection.pagination = data.pagination;
    collection.objects = data.results;
  },
};

export const actions = {
  async get_data({commit}, [collection_name, filters, page]) {
    filters.page = page;
    let url = `/${collection_name}/?${queryString.stringify(filters)}`;
    let {data} = await api.get(url);
    commit('update_data', [collection_name, data]);
  }
};