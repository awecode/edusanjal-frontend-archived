<template>
    <div>
        <div v-if="isStatic" class="has-text-centered" id="static-map-wrapper">
            <img :data-src="staticUrl" alt="Map" title="Click to browse" @click="loadDynamic"/>
        </div>
        <div v-else class="g-map" id="g-map"></div>
    </div>
</template>

<script>
  export default {
    props: {
      'lat': {}, 'lng': {}, 'zoom': {default: 14}
    },
    data() {
      return {
        isStatic: true,
        staticWidth: 640,
        staticHeight: 400,
        key: config.googleMapKey,
      }
    },
    computed: {
      staticUrl() {
        return `https://maps.googleapis.com/maps/api/staticmap?center=${this.lat},${this.lng}&zoom=${this.zoom}&maptype=roadmap
&markers=${this.lat},${this.lng}&key=${this.key}&size=${this.staticWidth}x${this.staticHeight}`;
      }
    },
    mounted() {
      window.initMap = () => {
        const el = document.getElementById('g-map');
        const latLng = new google.maps.LatLng(this.lat, this.lng);
        const options = {
          zoom: this.zoom,
          center: latLng
        };
        const map = new google.maps.Map(el, options);
        const marker = new google.maps.Marker({
          position: latLng,
        });
        marker.setMap(map);
      };

    },
    methods: {
      loadDynamic() {
        this.isStatic = false;
        if (window.google && google.maps) {
          window.initMap();
        } else {
          ClientUtils.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.key}&v=3&callback=initMap`);
        }
      }
    }
  };
</script>

<style scoped>
    .g-map {
        height: 400px;
        margin: 0 auto;
        background: #ebe8de;
    }
    #static-map-wrapper img{
        cursor: pointer;
    }
</style>