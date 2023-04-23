<template>
  <section class="m-constructor">
    <header>hw</header>
    <section class="m-content">
      <router-view ref="component" @address="address" @status="status" @client="client"></router-view>
    </section>
    <Bnav></Bnav>
    <div id="mobile-backg"></div>
  </section>
</template>

<script>
import Bnav from './Bnav.vue'

export default {
  data: function () {
    return {
      MQTTAddress: '',
      MQTTStatus: false,
      MQTTClient: ''
    }
  },
  mounted () {
  },
  components: {
    Bnav
  },
  methods: {
    address (e) {
      this.MQTTAddress = e
    },
    status (e) {
      this.MQTTStatus = e
    },
    client (e) {
      this.MQTTClient = e
    }
  }
}
</script>

<style lang="less">
header {
  height: 2em;
  background: rgb(224, 230, 231);
  margin-bottom: 0.4em;
  border-radius: 0 0 12px 12px;
}
h3 {
  color: rgba(51, 51, 51, 0.9);
}
#mobile-backg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(243, 246, 253, 1);
  z-index: -1;
}
.m-constructor {
  width: 100%;
  height: 100%;
  position: relative;
  .m-content {
    width: 100%;
    height: auto;
  }
}
</style>
