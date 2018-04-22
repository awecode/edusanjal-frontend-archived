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
  create(state, collection_name) {
    Vue.set(state, collection_name, [{objects: [], pagination: {}, pages: {}}]);
  },
  update(state, [collection_name, data]) {
    let collection = state[collection_name];
    // Create collection if it doesn't exist
    if (!collection) {
      collection = Vue.set(state, collection_name, {objects: [], pagination: {}, pages: {}});
    }
    // Find current page
    let page_no = data.pagination.page.toString();
    // Update pagination
    collection.pagination = data.pagination;
    // Find ids of objects in current page
    let ids = data.results.map(obj => obj.id);
    // Remove each id from all other pages
    ids.forEach(id => {
      Object.keys(collection.pages).forEach(key => {
        let page = collection.pages[key];
        if (page.includes(id)) {
          page = page.splice(page.indexOf(id), 1);
        }
      });
    });
    // Update current page ids
    collection.pages[page_no] = ids;
    // Update/add to objects list
    data.results.forEach(obj => {
      let index = collection.objects.findIndex(x => x.id == obj.id);
      if (index === -1) {
        collection.objects.push(obj);
      } else {
        collection.objects[index] = obj;
      }
    });
  },
  update_item(state, [collection_name, key, data]) {
    let collection = state[collection_name];
    collection.objects[key] = data;
  },
  add_item(state, [collection_name, data]) {
    let collection = state[collection_name];

    if (!collection) {
      collection = Vue.set(state, collection_name, [{objects: [], pagination: {}, pages: {}}])[0];
    }
    collection.objects.push(data);
  },
};

export const actions = {
  async get_item({commit, store}, [collection_name, key]) {
    let url = `/${collection_name}/${key}/`;
    let {data} = await api.get(url);
    commit('update_item', [collection_name, key, data]);
  }
};