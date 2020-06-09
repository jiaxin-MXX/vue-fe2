<template>
  <baidu-map class="bm-view" ak="U3MAvS8OUobPnV7gqUXfx5WWeajIoD2n" center="济南市高新区鑫盛大厦"  scroll-wheel-zoom :zoom="zoom" @ready="handler">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  </baidu-map>
</template>

<script>
import { BaiduMap, BmScale, BmGeolocation } from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmScale,
    BmGeolocation
  },
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 15
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
    }
  }
}
</script>

<style>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>