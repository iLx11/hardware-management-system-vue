<template>
  <section class="constructor">
    <div class="bg"></div>
    <div class="construction">
      <!-- 页面头部 -->
      <Header @adress="adress" @status="status" @client="client"></Header>
      <!-- 页面内容 -->
      <Content></Content>
    </div>
  </section>
</template>

<script>
import Header from "./Header.vue"
import Content from "./Content.vue"

export default {
  data: function () {
    return {
      MQTTAdress: "",
      MQTTStatus: false,
      MQTTClient: "",
    }
  },
  components: {
    Header,
    Content,
  },
  methods: {
    adress(e) {
      this.MQTTAdress = e
    },
    status(e) {
      this.MQTTStatus = e
    },
    client(e) {
      this.MQTTClient = e
    },
  },
}
</script>

<style lang="less">
.constructor {
  width: 100%;
  height: 100%;
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    /*background: rgba(243, 246, 253, 1.0);*/
    background: url("../../assets/img/bg.png");
  }
  /*页面结构*/
  .construction {
    width: 97%;
    height: 92%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
}
</style>