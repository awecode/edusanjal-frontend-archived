<template>
    <div class="g-map" id="g-map">Hey</div>
</template>

<script>
  export default {
    props: {
      'lat': {}, 'lng': {}, 'zoom': {default: 14}
    },
    mounted: function () {

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

      if (window.google) {
        window.initMap();
      } else {
        ClientUtils.loadScript(`https://maps.googleapis.com/maps/api/js?key=${config.googleMapKey}&v=3&callback=initMap`);
      }

    }
  };
</script>

<style scoped>
    .g-map {
        height: 600px;
        margin: 0 auto;
        background: gray;
    }
</style>