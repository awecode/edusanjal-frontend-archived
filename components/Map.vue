<template>
    <div class="map-wrapper">
        <div v-if="isStatic" class="has-text-centered" id="static-map-wrapper" @click="loadDynamic">
            <img height="640" width="640" :data-src="staticUrl" alt="Map" title="Click to browse"/>
        </div>
        <div v-else class="g-map" id="g-map"></div>
    </div>
</template>

<script>
  export default {
    props: {
      'lat': {}, 'lng': {}, 'name': {}, 'zoom': {default: 14}
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
&markers=label:${this.initial}%7C${this.lat},${this.lng}&key=${this.key}&size=${this.staticWidth}x${this.staticHeight}`;
      },
      initial() {
        if (this.name) {
          return this.name[0];
        }
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
          label: this.initial
        });
        marker.setMap(map);
        if (this.name) {
          let infowindow = new google.maps.InfoWindow({
            content: this.name
          });
          infowindow.open(map, marker);
        }
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

<style lang="scss">
    $mapBg: #ebe8de;

    .g-map {
        height: 400px;
        margin: 0 auto;

    }

    #static-map-wrapper {
        width: 100%;
        cursor: pointer;
        img {
            border: 1px solid #fff;
        }
    }

    .map-wrapper {
        background: $mapBg;
    }
</style>