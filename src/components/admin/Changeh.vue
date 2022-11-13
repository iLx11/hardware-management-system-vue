<template>
  <section>
    <!-- 页面遮罩 -->
    <div v-show="showMask" class="cover" @click="$emit('maskHide')"></div>
    <!-- 修改硬件 -->
    <div v-show="showChangeh" class="changeH">
      <div class="con_hardware">
        <form :model="formData">
          <div>
            <h5>硬件名:</h5>
            <input
              v-model.trim="formData.hardwareName"
              class="h_inp"
              type="text"
              name=""
            />
          </div>
          <div>
            <h5>硬件port:</h5>
            <input
              v-model.trim="formData.hardwarePort"
              class="h_inp"
              type="text"
              name=""
            />
          </div>
          <div>
            <h5>硬件ID:</h5>
            <select v-model.trim="formData.hardwareId" class="h_inp">
              <option value="AGSW01">灯光</option>
              <option value="AGSW11">舵机</option>
              <option value="SPSW02">继电器2</option>
              <option value="SPSW12">步进电机2</option>
              <option value="SPSW03">继电器3</option>
              <option value="SPSW13">步进电机3</option>
            </select>
          </div>
        </form>
        <section @click="$emit('hsub')" class="changeH_sub">
          <h1>👌</h1>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      formData: {
        hardwareName: "23",
        hardwarePort: "",
        hardwareId: "",
      },
    }
  },
  props: ["showChangeh", "showMask"],
}
</script>

<style lang="less" scoped>
/*硬件修改*/
.changeH {
  width: 48%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
  box-shadow: var(--bgshadow2);
  z-index: 66;
  padding: 2.5em;
  border-radius: 9px;
  form {
    width: 100%;
    height: 100%;
  }
}
.con_hardware {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
}
.con_hardware div {
  width: 90%;
  height: 27%;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: flex-start;
}
.con_hardware div input {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(51, 51, 51, 0.8);
  border-radius: 12px;
  text-align: center;
  font-size: 20px;
}
.con_hardware div select {
  width: 50%;
  height: 100%;
  border-radius: 12px;
  padding-left: 2em;
}
.changeH_sub {
  width: 7em;
  height: 7em;
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(51, 51, 51, 0.7);
  border-radius: 100% 0 9px 0;
}
.changeH_sub h1 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  color: rgba(255, 255, 255, 0.6);
}
/*遮罩*/
.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.4);
  z-index: 65;
  /*display: none;*/
}
</style>