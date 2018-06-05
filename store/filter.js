const queryString = require('query-string');


export const state = () => ({
  institutes: {objects: [], pagination: {}}
});

export const getters = {
  get_items: (state) => (collection_name, page) => {
    return state[collection_name].objects;
  },
  get_pagination: (state) => (collection_name) => {
    return state[collection_name].pagination;
  }
};

export const mutations = {
  update_item(state, [collection_name, key, data]) {
    let collection = state[collection_name];
    collection.objects[key] = data;
    let obj = collection.objects[key] = collection.objects[key] || {};
    Object.assign(obj, data);
  },
  update_data(state, [collection_name, data]) {
    let collection = state[collection_name];
    collection.pagination = data.pagination;
    collection.objects = data.results;
  },
  update_list_ssr(state, [collection_name, data, key_name, page]) {
    let collection = state[collection_name];
    collection.pagination = data.pagination;
    let page_array = Object.entries(data.pages)[0];
    if (page_array) {
      collection.pages[page_array[0]] = page_array[1];
    }
    //  TODO remove from other pages? page_array[1]
    Object.assign(collection.objects, data.objects);
  },
};

export const actions = {
  async get_data({commit}, [collection_name, filters, page]) {
    // Do not save filtered data in state, return directly
    filters.page = page;
    let url = `/${collection_name}/?${queryString.stringify(filters)}`;
    let {data} = await api.get(url)
    //   .then(function (res) {
    //   console.log(res.data.results);
    //   return res.data.results;
    // });
    commit('update_data', [collection_name, data]);
  }
};