<template>
  <section class="m-constructor">
    <header>hw</header>
    <section class="m-content">
      <router-view ref="component" @address="address" @status="status" @client="client"></router-view>
    </section>
    <Bnav></Bnav>
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
  background: rgba(0, 139, 139, 0.3);
  margin-bottom: 0.4em;
  border-radius: 0 0 12px 12px;
}
h3 {
  color: rgba(51, 51, 51, 0.9);
}
.m-constructor {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(243, 246, 253, 1);
  .m-content {
    width: 100%;
    height: auto;
  }
}
</style>
