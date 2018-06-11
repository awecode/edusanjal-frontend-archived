// TODO Use vue-router's stringify
const queryString = require('query-string');

export const state = () => ({
  institutes: { objects: [], pagination: {}, aggregation: {} },
  programs: { objects: [], pagination: {}, aggregation: {} }
});

export const getters = {
  get_items: (state) => (collection_name) => {
    return state[collection_name].objects;
  },
  get_pagination: (state) => (collection_name) => {
    return state[collection_name].pagination;
  },
  get_aggregation: (state) => (collection_name) => {
    return state[collection_name].aggregation;
  }
};

export const mutations = {
  update_data(state, [collection_name, data, rootState]) {
    let collection = state[collection_name];
    collection.pagination = data.pagination;
    collection.aggregation = data.local_agg;
    collection.objects = data.results;
    // Update global aggregation
    rootState.collection[collection_name].aggregation = data.global_agg;
  },
};

export const actions = {
  async get_data({ commit, rootState }, [collection_name, filters, page]) {
    filters = Utils.clone(filters);
    filters.page = page;
    let url = `/${collection_name}/?${queryString.stringify(filters)}`;
    let { data } = await api.get(url);
    commit('update_data', [collection_name, data, rootState]);
  }
};