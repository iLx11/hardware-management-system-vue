<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
}
</script>

<style>
body,
html{
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
  font-family: "youshe";
  src: url("./assets/font/YSHaoShenTi.ttf");
}
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
