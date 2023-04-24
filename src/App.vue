<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted () {
    // let hardwareIP = "http://192.168.0.111"
    const hardwareIP = 'http://192.168.0.200'
    localStorage.setItem('hardwareIP', hardwareIP) // 储存函数
    const videoIP = 'http://192.168.0.114/mjpeg/1'
    localStorage.setItem('videoIP', videoIP)
  }
}
</script>

<style>
@media screen and (max-width: 500px) {
  .el-message-box {
    width: 300px !important;
  }
}
body,
html,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@font-face {
  font-family: 'youshe';
  src: url('./assets/font/YSHaoShenTi.ttf');
}

/* @font-face {
  font-family: "ceyy";
  src: url("./assets/font/ceyy.ttf");
} */
.icon {
  width: 1.8em;
  height: 1.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

a,
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

li {
  list-style-type: none;
}
</style>
