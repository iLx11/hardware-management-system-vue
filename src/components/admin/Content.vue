<template>
  <section class="content">
    <!-- 导航组件 -->
    <Navigation></Navigation>
    <!-- 路由组件 -->
    <div class="component">
      <router-view></router-view>
    </div>
    <!-- MQTT组件 -->
    <Mqtt></Mqtt>
  </section>
</template>

<script>
import Navigation from './Navigation.vue' 
import Mqtt from './Mqtt.vue'     

export default {
  data: function () {
    return {}
  },
  components: {
        Navigation,
        Mqtt,
  },
}
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    height: 87%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}
.component {
    width: 65%;
    height: 100%;
    background: var(--bgcolor);
    /*box-shadow: var(--bgshadow1);*/
    border-radius: 25px;
}
</style>