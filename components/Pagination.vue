<template>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" v-if="pagination.page > 1" @click="previous">Previous</a>
        <a class="pagination-next" v-if="pagination.pages > pagination.page" @click="next">Next</a>
        <ul class="pagination-list">
            <li v-for="pg in page_links" :key="pg" :class="{active: pg==pagination.page}">
                <span class="pagination-ellipsis" v-if="isNaN(pg)">{{pg}}</span>
                <a v-else :class="{'pagination-link': 1, 'is-current': pg==pagination.page}" @click="paginate(pg)"
                   :aria-label="'Go to page ' + pg" :title="'Page '+pg">{{pg}}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
  export default {
    props: ['pagination'],
    computed: {
      page_links() {
        let c = this.pagination.page;
        let m = this.pagination.pages;
        if (m === 0) {
          return [];
        }
        if (m === 1) {
          return [1];
        }
        let delta = 2,
          range = [],
          rangeWithDots = [],
          l;
        range.push(1);
        for (let i = c - delta; i <= c + delta; i++) {
          if (i < m && i > 1) {
            range.push(i);
          }
        }
        range.push(m);
        for (let i of range) {
          if (l) {
            if (i - l === 2) {
              rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
              rangeWithDots.push('...');
            }
          }
          rangeWithDots.push(i);
          l = i;
        }
        return rangeWithDots;
      }
    },
    methods: {
      paginate(pg) {
        if (pg === this.pagination.page) {
          return;
        }
        this.emit(pg);
      },
      next() {
        this.emit(this.pagination.page + 1);
      },
      previous() {
        this.emit(this.pagination.page - 1);
      },
      emit(pg) {
        this.$emit('paginate', pg);
      }
    }
  }
</script>