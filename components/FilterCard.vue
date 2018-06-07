<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{filter.name}}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <FA i="angle-down"/>
      </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                <div class="checkboxes" v-if="filter.type === 'checkbox'">
                    <form ref="filterForm" @change="changed">
                        <div v-for="facet in filter.facets" :key="facet">
                            <label class="checkbox">
                                <input v-model="values[facet]" type="checkbox">
                                {{facet}}
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['filter', 'filters'],
    methods: {
      changed() {
        let fields = [];
        Object.entries(this.values).forEach(function (obj) {
          if (obj[1]) {
            fields.push(obj[0]);
          }
        });
        let out_data = {};
//        if (fields.length) {
        out_data[this.filter.param] = fields;
//        }
        this.$emit('filter', out_data);
      }
    },
    data() {
      // Get initial filter values
      let values = {};
      let filters = this.filters[this.filter.param];
      if (filters) {
        filters = Utils.stringToArray(filters);
        filters.forEach((val) => {
          values[val] = true
        });
      }
      return {
        'values': values,
      }
    },
  }
</script>