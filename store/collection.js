export const state = () => ({
  institutes: {objects: {}, pagination: {}, pages: {}, key: 'slug'}
});

export const getters = () => ({
  get_object: (state, getters) => (collection_name, key, key_name = 'slug') => {
    let collection = state[collection_name];
    if (collection) {
      return state[collection_name].objects.find(obj => obj[key_name] == key);
    }
  }
});

export const mutations = {
  update_item(state, [collection_name, key, data]) {
    let collection = state[collection_name];
    collection.objects[key] = data;
    let obj = collection.objects[key] = collection.objects[key] || {};
    Object.assign(obj, data);
  },
  update_list(state, [collection_name, page, data, key_name]) {
    let collection = state[collection_name];
    collection.pagination['count'] = data.count;
    collection.pagination['pages'] = data.pages;
    let page_list = collection.pages[page + ''] = [];
    for (let item of data.results) {
      let key = item[key_name];
      page_list.push(key);
      let obj = collection.objects[key] = collection.objects[key] || {};
      Object.assign(obj, item);
    }
  },
};

export const actions = {
  async get_list({commit, store}, [collection_name, page, key_name]) {
    let url = `/${collection_name}/?page=${page}`;
    let {data} = await api.get(url);
    commit('update_list', [collection_name, page, data, key_name]);
  },
  async get_item({commit, store}, [collection_name, key]) {
    let url = `/${collection_name}/${key}/`;
    console.log(url);
    let {data} = await api.get(url);
    commit('update_item', [collection_name, key, data]);
  },
  async update_item_from_ssr({commit, store}, [collection_name, key]) {
    let data = window.__NUXT__.state.collection[collection_name].objects[key]
    commit('update_item', [collection_name, key, data]);
  }
};