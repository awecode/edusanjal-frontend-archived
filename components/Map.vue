<template>
    <div class="google-map" id="gmap">Hey</div>
</template>

<script>
  export default {
    data: function () {
      return {
        mapName: "gmap",
        markerCoordinates: [{
          latitude: 51.501527,
          longitude: -0.1921837
        }, {
          latitude: 51.505874,
          longitude: -0.1838486
        }, {
          latitude: 51.4998973,
          longitude: -0.202432
        }]
      }
    },
    mounted: function () {
      window.initMap = () => {
        const element = document.getElementById('gmap');
        const options = {
          zoom: 14,
          center: new google.maps.LatLng(51.501527, -0.1921837)
        };
        const map = new google.maps.Map(element, options);
      };
      if (window.google) {
        window.initMap();
      } else {
        ClientUtils.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBH8iZPmK6CMd5kecnwLHDx4GnViREzBxM&v=3&callback=initMap');
      }
    }
  };
</script>

<style scoped>
    .google-map {
        width: 800px;
        height: 600px;
        margin: 0 auto;
        background: gray;
    }
</style>