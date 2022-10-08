<template>
  <section class="chartPage">
    <div class="chartHeader">
      <h1>chart Page</h1>
    </div>
    <div class="chartListContent"></div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {}
  },
}
</script>

<style lang="less">
/*图表页面*/
/*---------------------------------------------------------*/
.chartPage {
  width: 100%;
  height: 100%;
  padding: 1em;
}
.chartListContent {
  width: 100%;
  height: 96%;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow1);
  border-radius: 25px;
}
/*遮罩*/
.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(51, 51, 51, 0.4);
  z-index: 65;
  /*display: none;*/
}
</style>