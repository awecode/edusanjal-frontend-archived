<template>
    <div class="card" v-if="this.hasValues">
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
          <div v-if="this.search" class="control has-icons-left has-icons-right">
            <input placeholder="Search..." v-model="q" class="input"/>
            <span class="icon is-small is-left">
              <FA i="search"/>
            </span>
          </div>
            <div class="content">
                <form @change="changed">
                    <div v-for="(value, key) in values" :key="key">
                        <label class="checkbox">
                            <input v-model="value.checked" type="checkbox">
                            {{key}} [
                            <span v-if="hasFilters">{{value.local}}/</span>
                            {{value.global}}]
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    agg: {},
    filters: {},
    name: "",
    param: "",
    search: { default: false }
  },
  data() {
    return {
      q: ""
    };
  },
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
  computed: {
    hasFilters() {
      return !Utils.isFalsy(this.filters);
    },
    hasValues() {
      return !Utils.isFalsy(this.values) || this.q;
    },
    values() {
      let values = {};

      // Build global facet from aggregation
      if (
        this.agg.global &&
        this.agg.global[this.param] &&
        this.agg.global[this.param].length
      ) {
        this.agg.global[this.param].forEach(facet => {
          let match = !this.q || Utils.strContains(facet.key, this.q);
          if (match) {
            values[facet.key] = {
              global: facet.doc_count,
              local: 0,
              checked: false
            };
          }
        });
      }

      // Build local facet from aggregation
      if (
        this.agg.local &&
        this.agg.local[this.param] &&
        this.agg.local[this.param].length
      ) {
        this.agg.local[this.param].forEach(facet => {
          values[facet.key].local = facet.doc_count;
        });
      }

      // Get initial facet values
      let filters = this.filters[this.param];
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
      return values;
    }
  }
};
</script>