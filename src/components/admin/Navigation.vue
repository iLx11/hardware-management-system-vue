<template>
  <div class="nav">
    <ul>
      <li :key="v.id" v-for="(v, k) in navList">
        <router-link :to="v.path">
          <div @click="navchange(k)" :class="{ navActive: v.isActive }">
            <svg
              class="icon"
              aria-hidden="true"
              :class="{ navActiveSvg: v.isActive }"
            >
              <use :xlink:href="v.href"></use>
            </svg>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      navList: [
        {
          id: 1,
          isActive: false,
          name: "control",
          href: "#icon-zhuye",
          path: "/admin/control"
        },
        {
          id: 2,
          isActive: false,
          name: "user",
          href: "#icon-yonghu",
          path: "/admin/user"
        },
        {
          id: 3,
          isActive: false,
          name: "hardware",
          href: "#icon-bangongyingjian",
          path: "/admin/hardware"
        },
        {
          id: 4,
          isActive: false,
          name: "chart",
          href: "#icon-Rise",
          path: "/admin/chart"
        },
      ],
    }
  },
  methods: {
    navchange(k) {
      this.navList[k].isActive = true
      this.navList.forEach((o, i) => {
        if (i != k) {
          o.isActive = false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.nav {
  width: 7%;
  height: 100%;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow1);
  padding: 5em 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
    div {
      width: 2.6em;
      height: 2.6em;
      border-radius: 50%;
      /*background: rgba(0, 0, 0, 0.4);*/
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2em;
      cursor: pointer;
    }
    li:nth-child(1)  div {
      background: rgba(51, 51, 51, 0);
      box-shadow: var(--bgshadow2);
    }
    li:nth-child(1)  div svg {
      filter: brightness(100%);
    }
    div:nth-child(3) {
      font-size: 1.1em;
    }
    li div:hover {
      background: rgba(51, 51, 51, 0.4)
    }
  }
}
.navActive {
  background: rgba(51, 51, 51, 0.4) !important;
}
.navActiveSvg {
  filter: brightness(400%) !important;
}
</style>