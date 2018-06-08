<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{name}}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <FA i="angle-down"/>
      </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                <!--<div class="checkboxes" v-if="filter.type === 'checkbox'">-->
                <form @change="changed">
                <div v-for="(value, key) in values" :key="key">
                <label class="checkbox">
                <input v-model="value.checked" type="checkbox">
                {{key}} [{{value.global}}]
                </label>
                </div>
                </form>
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['agg', 'filters', 'name', 'param'],
    methods: {
      changed() {
        return;
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
      // Get initial facet values
      let values = {};
      if (this.agg.global && this.agg.global[this.param] && this.agg.global[this.param].length) {
        this.agg.global[this.param].forEach((facet) => {
          values[facet.key] = {
            global: facet.doc_count,
            checked: false
          }
        });
      }
//      let filters = this.filters[this.filter.param];
//      if (filters) {
//        filters = Utils.stringToArray(filters);
//        filters.forEach((val) => {
//          values[val] = true
//        });
//      }
      console.log(values);
      return {
        'values': values,
      }
    },
  }
</script>