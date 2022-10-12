<template>
  <section class="bottom_nav">
    <!-- <div class="glass_1"></div> -->
    <div class="font">
      <div class="move_cube" :style="{ left: cubeLeft }">
        <p>{{cubeName}}</p>
      </div>
      <div :key="v.id" v-for="(v, k) in navList" @click="changeNav(k)">
        <router-link :to="v.path">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="v.href"></use>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      cubeLeft: "",
      cubeName: '',
      navList: [
        {
          id: 1,
          isActive: false,
          name: "control",
          href: "#icon-a-3d",
          path: "/mobile/control",
        },
        {
          id: 2,
          isActive: false,
          name: "mqtt",
          href: "#icon-a-Diagramroot",
          path: "/mobile/mqtt",
        },
        {
          id: 3,
          isActive: false,
          name: "mana",
          href: "#icon-Pyramid",
          path: "/mobile/mana",
        },
        {
          id: 4,
          isActive: false,
          name: "user",
          href: "#icon-a-Snippetchart",
          path: "/mobile/user",
        },
      ],
    }
  },
  methods: {
    changeNav(k) {
      this.cubeLeft = k * 25 + 4 + "%"
      this.cubeName = this.navList[k].name
    },
  },
}
</script>

<style lang="less" scoped>
/*底部导航开始*/
/*-----------------------------------------------------------*/
.bottom_nav {
  position: fixed;
  width: 94%;
  height: 60px;
  bottom: 0.8em;
  left: 50%;
  margin-left: -47%;
  background: rgba(255, 255, 255, 0.85);
  z-index: 5;
  border-radius: 20px;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
}

.font {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  position: relative;
  overflow: hidden;
}

.move_cube {
  width: 17%;
  height: 85%;
  position: absolute;
  left: 4%;
  z-index: -1;
  border-radius: 12px;
  background: rgba(242, 222, 221, 0.9);
  transition: 0.5s ease-in-out;
}

.move_cube p {
  font-size: 10px;
  transform: translateY(-3px);
}

svg:active {
  transform: scale(0.9);
}
</style>