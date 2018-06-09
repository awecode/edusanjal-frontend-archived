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
                <form @change="changed">
                    <div v-for="(value, key) in values" :key="key">
                        <label class="checkbox">
                            <input v-model="value.checked" type="checkbox">
                            {{key}} [{{value.global}}]
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["agg", "filters", "name", "param"],
  methods: {
    changed() {
      let fields = [];
      Object.entries(this.values).forEach(function(obj) {
        if (obj[1].checked) {
          fields.push(obj[0]);
        }
      });
      let out_data = {};
      //        if (fields.length) {
      out_data[this.param] = fields;
      //        }
      this.$emit("filter", out_data);
    }
  },
  data() {
    let values = {};
    // Build facet from aggregation
    if (
      this.agg.global &&
      this.agg.global[this.param] &&
      this.agg.global[this.param].length
    ) {
      this.agg.global[this.param].forEach(facet => {
        values[facet.key] = {
          global: facet.doc_count,
          checked: false
        };
      });
    }
    // Get initial facet values
    let filters = this.filters[this.param];
    //      console.log(filters);
    if (process.browser) {
      if (filters) {
        filters = Utils.stringToArray(filters);
        filters.forEach(val => {
          if (typeof values[val] == "undefined") {
            values[val] = {};
          }
          values[val].checked = true;
        });
      }
    }
    return {
      values: values
    };
  }
};
</script>