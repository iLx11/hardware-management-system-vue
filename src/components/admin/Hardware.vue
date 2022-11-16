<template>
  <section class="hardwarePage">
    <Changeh
      @hsub="hsub"
      ref="ccomp"
      @maskHide="maskHide"
      :showChangeh="showChangeh"
      :showMask="showMask"
    ></Changeh>
    <div class="hardwareHeader">
      <h1>hardware Page</h1>
      <div @click="addHardware" class="hardwareAdd">
        <h5>➕添加硬件</h5>
      </div>
    </div>
    <div class="hardwareListContent">
      <ul class="hardware_list">
        <li>
          <div class="hardList-header">
            <div>
              <h5>ID:</h5>
            </div>
            <div>
              <h5>硬件名:</h5>
            </div>
            <div>
              <h5>硬件状态:</h5>
            </div>
            <div>
              <h5>硬件port:</h5>
            </div>
            <div>
              <h5>硬件ID:</h5>
            </div>
          </div>
        </li>
        <li :key="v.id" v-for="(v, k) in HardwareList">
          <div class="hardware-list-content">
            <div class="hardware_data">
              <div>
                {{ v.id }}
              </div>
              <div>
                <h3>{{ v.name }}</h3>
              </div>
              <div @click="changeStatus(k)" class="hardwareStatus">
                <p v-if="v.status">启用</p>
                <p v-if="!v.status">禁用</p>
              </div>
              <div>
                <p>{{ v.hardwarePort }}</p>
              </div>
              <div>
                <p>{{ v.hardwareId }}</p>
              </div>
            </div>
            <div class="mana_c">
              <svg @click="changeHardware(k)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiugai"></use></svg
              >&nbsp;&nbsp;
              <svg @click="delHardware(k)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danseshixintubiao--copy"></use>
              </svg>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Changeh from "./Changeh.vue"
export default {
  data: function () {
    return {
      HardwareList: [],
      showChangeh: false,
      showMask: false,
      state: true,
      changeId: "",
    }
  },
  mounted() {
    this.hardwareLoad()
    // console.log(Changeh.data().formData)
  },
  components: {
    Changeh,
  },
  methods: {
    maskHide() {
      this.showChangeh = false
      this.showMask = false
    },
    async hardwareLoad() {
      const { data: res } = await this.$http.get("/hardwares")
      this.HardwareList = res.data
    },
    //硬件部分
    addHardware() {
      this.showChangeh = true
      this.showMask = true
      this.state = true
    },
    async addHardwareDo(formData) {
      const { data: res } = await this.$http.post("/hardwares", {
        name: formData.hardwareName,
        hardwareId: formData.hardwareId,
        hardwarePort: formData.hardwarePort,
      })

      if (res.data == true) {
        this.$message.success("添加成功")
        this.hardwareLoad()
      }
    },
    changeHardware(k) {
      this.changeId = k
      this.showChangeh = true
      this.showMask = true
      this.state = false
      this.$refs.ccomp.formData.hardwareName = this.HardwareList[k].name
      this.$refs.ccomp.formData.hardwarePort = this.HardwareList[k].hardwarePort
      this.$refs.ccomp.formData.hardwareId = this.HardwareList[k].hardwareId
    },
    async changeHardwareDo(id, formData) {
      const { data: res } = await this.$http.put("/hardwares", {
        id: id,
        name: formData.hardwareName,
        hardwareId: formData.hardwareId,
        hardwarePort: formData.hardwarePort,
      })
      if (res.data == true) {
        this.$message.success("修改成功")
        this.hardwareLoad()
      }
    },
    hsub() {
      if (this.$refs.ccomp.formData != null) {
        this.showChangeh = false
        this.showMask = false
        if (this.state) {
          console.log(this.status)
          this.addHardwareDo(this.$refs.ccomp.formData)
        } else {
          if (this.changeId != null) {
            this.changeHardwareDo(
              this.HardwareList[this.changeId].id,
              this.$refs.ccomp.formData
            )
          }
        }
      } else {
        this.$message.warning("有输入框未填写哦")
      }
    },
    changeStatus(k) {
      let that = this
      this.$confirm("请问是否要更改此硬件的状态", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const { data: res } = await that.$http.put(
            "/hardwares/" + that.HardwareList[k].id,
            {
              status: that.HardwareList[k].status == true ? 0 : 1,
            }
          )
          if (res.data == true) {
            that.$message.success("修改成功")
            that.hardwareLoad()
          }
        })
        .catch(() => {
          this.$message.info("取消修改")
        })
    },
    delHardware(k) {
      let that = this
      this.$confirm("请问是否要删除此硬件", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const { data: res } = await that.$http.delete(
            "/hardwares/" + that.HardwareList[k].id
          )
          if (res.data == true) {
            that.$message.success("删除成功")
            that.hardwareLoad()
          }
        })
        .catch(() => {
          that.$message.info("取消删除")
        })
    },
  },
}
</script>

<style lang="less">
.hardwareAdd h5 {
  width: 60%;
  background: rgba(255, 255, 255, 0.8);
  border: 1.8px solid rgba(51, 51, 51, 0.6);
  border-radius: 12px;
  padding: 0.1em;
}
</style>