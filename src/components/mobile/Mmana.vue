<template>
  <section class="kalada_m_c">
    <!-- 修改硬件 -->
    <div class="content conH changeH" v-show="showChangeHardware">
      <div class="C_t">
        <div class="ct">
          <div class="con_hardware">
            <form :model="formDataAlter">
              <div>
                <h5>硬件名:</h5>
                <input
                  v-model="formDataAlter.hardwareName"
                  class="h_inp"
                  type="text"
                  name=""
                />
              </div>
              <div>
                <h5>硬件port:</h5>
                <input
                  v-model="formDataAlter.hardwarePort"
                  class="h_inp"
                  type="text"
                  name=""
                />
              </div>
              <div>
                <h5>硬件ID:</h5>
                <div class="hw_sub">
                  <select v-model="formDataAlter.hardwareId" class="h_inp">
                    <option value="AGSW01">AGSW01</option>
                    <option value="SPSW01">SPSW01</option>
                  </select>
                  <div @click="changeHardwareDo" class="conH_sub changeH_sub">
                    修改
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="C_t">
        <div class="ct">
          <div class="mana_nav">
            <div class="user_nav" :class="{active_color: !activeColor}" @click="showUL">
              <h1>User</h1>
            </div>
            <div class="hardware_nav" :class="{active_color: activeColor}" @click="showHL">
              <h1>Hardware</h1>
            </div>
            <div class="addHardware" v-show="showAddBox" @click="showBox">
              <h1>添加硬件</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加硬件信息输入 -->
    <div class="content conH addH" v-show="showAddHardware">
      <div class="C_t">
        <div class="ct">
          <div class="add_hardware con_hardware">
            <form :model="formDataAdd">
              <div>
                <h5>硬件名:</h5>
                <input
                  v-model="formDataAdd.hardwareName"
                  class="addh_inp"
                  type="text"
                  name=""
                />
              </div>
              <div>
                <h5>硬件port:</h5>
                <input
                  v-model="formDataAdd.hardwarePort"
                  class="addh_inp"
                  type="text"
                  name=""
                />
              </div>
              <div>
                <h5>硬件ID:</h5>
                <div class="hw_sub">
                  <select v-model="formDataAdd.hardwareId" class="addh_inp">
                    <option value="AGSW01">AGSW01</option>
                    <option value="SWSW01">SWSW01</option>
                  </select>
                  <div @click="addHardware" class="conH_sub addH_sub">添加</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- 硬件列表显示 -->
    <section>
      <ul id="hardware_list" v-show="showUserList">
        <li class="user_l" :key="v.id" v-for="(v, k) in HardwareList">
          <div class="content">
            <div class="C_t">
              <div class="ct">
                <div class="glass"></div>
                <div class="hardware_data">
                  <div>
                    <h5>ID:</h5>
                    &nbsp;&nbsp;{{ v.id }}
                  </div>
                  <div>
                    <h5>硬件名:</h5>
                    <h3>{{ v.name }}</h3>
                  </div>
                  <div class="hardwareStatus">
                    <h5 @click="changeStatus(k)">硬件状态:</h5>
                    &nbsp;&nbsp;
                    <p v-if="v.status">启用</p>
                    <p v-if="!v.status">禁用</p>
                  </div>
                  <div>
                    <h5>硬件port:</h5>
                    &nbsp;&nbsp;
                    <p>{{ v.hardwarePort }}</p>
                    <h5>硬件ID:</h5>
                    &nbsp;&nbsp;
                    <p>{{ v.hardwareId }}</p>
                  </div>
                </div>
                <div class="mana_c">
                  <svg
                    @click="changeHardware(k)"
                    class="icon"
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-xiugai"></use></svg
                  >&nbsp;&nbsp;
                  <svg @click="delHardware(k)" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-danseshixintubiao--copy"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- 用户列表显示 -->
      <ul id="user_list" v-show="showHardwareList">
        <li class="user_l" :key="v.id" v-for="(v, k) in userList">
          <div class="content">
            <div class="C_t">
              <div class="ct">
                <div class="glass"></div>
                <div class="user_data">
                  <div>
                    <h5>ID:</h5>
                    &nbsp;&nbsp;{{ v.id }}
                  </div>
                  <div>
                    <h5>用户:</h5>
                    <h3>{{ v.name }}</h3>
                  </div>
                  <div>
                    <h5>登录状态:</h5>
                    &nbsp;&nbsp;
                    <p v-if="v.status">已登录</p>
                    <p v-if="!v.status">未登录</p>
                    <h5>是否管理员:</h5>
                    &nbsp;&nbsp;
                    <p v-if="v.mana">是</p>
                    <p v-if="!v.mana">否</p>
                  </div>
                  <div></div>
                </div>
                <div class="mana_c">
                  <svg @click="changeMana(k)" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianjiayonghu"></use></svg
                  >&nbsp;&nbsp;
                  <svg @click="delUser(k)" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shanchuyonghu"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <!-- 占位开始 -->
    <!------------------------------------------------------------>
    <div class="content">
      <div class="zhanwei"></div>
    </div>
    <!-- 占位结束 -->
    <!------------------------------------------------------------>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      userList: [],
      HardwareList: [],
      showUserList: true,
      showHardwareList: false,
      showAddBox: false,
      showAddHardware: false,
      showChangeHardware: false,
      activeColor: false,
      currentId: "",
      formDataAlter: {
        hardwareName: "",
        hardwarePort: "",
        hardwareId: "",
      },
      formDataAdd: {
        hardwareName: "",
        hardwarePort: "",
        hardwareId: "",
      },
    }
  },
  mounted() {
    this.userLoad()
    this.hardwareLoad()
  },
  methods: {
    showUL() {
      this.showUserList = true
      this.showHardwareList = false
      this.showAddBox = false
      this.showAddHardware = false
      this.activeColor = false
    },
    showHL() {
      this.showUserList = false
      this.showHardwareList = true
      this.showAddBox = true
      this.showAddHardware = false
      this.activeColor = true
    },
    showBox() {
      this.showAddHardware = true
    },
    //加载完成后执行（导入列表）
    async userLoad() {
      const { data: res } = await this.$http.get("/users")
      this.userList = res.data
    },
    //删除用户
    delUser(k) {
      this.$confirm("确定要删除此用户吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "/users/" + this.userList[k].id
          )
          if (res.code == 10021) {
            this.userLoad()
            this.$message.info("删除成功")
          } else {
            this.$message.info("删除失败")
          }
        })
        .catch(() => {
          this.$message.info("取消删除")
        })
    },
    changeMana(k) {
      this.$confirm("您确定要更改此用户的管理员权限吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.userList[k].mana
            ? this.changeUser(1, 0, this.userList[k].name)
            : this.changeUser(1, 1, this.userList[k].name)
        })
        .catch(() => {
          this.$message.info("取消更改")
        })
    },
    async changeUser(method = null, value = null, name = null) {
      const { data: res } = await this.$http.post("/users/" + method, {
        value,
        name,
      })
      if (res.data == true) {
        this.$message.success("修改成功")
        //load
        if (method == 3) {
          this.current_user = value
        }
      }
    },
    maskHide() {
      this.showChangeh = false
      this.showMask = false
    },
    async hardwareLoad() {
      const { data: res } = await this.$http.get("/hardwares")
      this.HardwareList = res.data
    },
    //硬件部分
    async addHardware() {
      if (this.formDataAdd != null && this.formDataAdd != "") {
        const { data: res } = await this.$http.post("/hardwares", {
          name: this.formDataAdd.hardwareName,
          hardwareId: this.formDataAdd.hardwareId,
          hardwarePort: this.formDataAdd.hardwarePort,
        })
        if (res.data == true) {
          this.$message.success("添加成功")
          this.hardwareLoad()
        }
      }
    },
    changeHardware(k) {
      this.showChangeHardware = true
      this.currentId = k
    },
    async changeHardwareDo() {
      if (this.formDataAlter != null && this.formDataAlter != "") {
        const { data: res } = await this.$http.put("/hardwares", {
          id: this.currentId,
          name: this.formDataAlter.hardwareName,
          hardwareId: this.formDataAlter.hardwareId,
          hardwarePort: this.formDataAlter.hardwarePort,
        })
        if (res.data == true) {
          this.$message.success("修改成功")
          this.hardwareLoad()
        } else {
          this.$message.success("修改失败")
        }
        this.showChangeHardware = false
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
      this.$confirm("请问是否要更改此硬件的状态", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const { data: res } = await this.$http.put(
            "/hardwares/" + this.HardwareList[k].id,
            {
              status: that.HardwareList[k].status == true ? 0 : 1,
            }
          )
          if (res.data == true) {
            this.$message.success("修改成功")
            this.hardwareLoad()
          }
        })
        .catch(() => {
          this.$message.info("取消修改")
        })
    },
    delHardware(k) {
      this.$confirm("请问是否要删除此硬件", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "/hardwares/" + this.HardwareList[k].id
          )
          if (res.data == true) {
            this.$message.success("删除成功")
            this.hardwareLoad()
          }
        })
        .catch(() => {
          this.$message.info("取消删除")
        })
    },
  },
}
</script>

<style lang="less" scoped>
@bgcolor-1: rgba(231, 238, 238, 0.6);
@font-color-2: rgba(51, 51, 51, 0.8);
.C_t {
  width: 94%;
  height: auto;
  margin: auto;
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.8);
  border-radius: 20px;
  padding: 0.5em;
  margin-bottom: 0.9em;
  background: rgba(255, 255, 255, 0.8);
}

.ct {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  position: relative;
}
.mana_nav {
  width: 100%;
  /*height: 3em;*/
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-flow: row wrap;
  color: @font-color-2;
}

.mana_nav .user_nav,
.mana_nav .hardware_nav {
  width: 47%;
  height: 3em;
  border-radius: 12px;
  text-align: center;
  line-height: 3em;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  background: rgba(255, 255, 255, 0.95);
}

.addHardware {
  width: 97.5%;
  height: 3em;
  border-radius: 12px;
  text-align: center;
  line-height: 3em;
  margin-top: 0.5em;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  background: rgba(255, 255, 255, 0.4);
}
.con_hardware {
  width: 100%;
  height: 14em;
}

.con_hardware div {
  margin-top: 0.3em;
}

.con_hardware input,
.con_hardware select {
  width: 100%;
  border: none;
  /*height: 2.7em;*/
  height: 43px;
  background-color: @bgcolor-1;
  /*box-shadow: 0 0 0 1.5px rgba(211, 215, 212, 1.0);*/
  border-radius: 6px;
  text-align: center;
  font-size: 19px;
}

.con_hardware select {
  width: 47% !important;
  height: 43px !important;
  margin-top: 5px;
}

.con_hardware .conH_sub {
  width: 47%;
  height: 43px;
  border-radius: 12px;
  text-align: center;
  line-height: 43px;
  background: rgba(195, 92, 93, 0.3);
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
}
.con_hardware .conH_sub:active {
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.1);
}
// .mana_nav .user_nav {
//   background: rgba(233, 240, 240, 0.7);
// }
.active_color {
  background: rgba(233, 240, 240, 0.7) !important;
}
.changeH {
  position: fixed;
  top: 25%;
  left: 50%;
  margin-left: -46.5%;
  background: rgba(255, 255, 255, 1);
  z-index: 66;
}

.hw_sub {
  display: flex;
  justify-content: space-between;
}

.user_data {
  width: 100%;
  height: 4em;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
}

.hardware_data {
  width: 100%;
  height: 6em;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
}

.user_data h3,
.user_data h5,
p,
.hardware_data h3,
.hardware_data h5,
p {
  display: inline-block;
}

.user_data h3,
.hardware_data h3 {
  padding-left: 1em;
  margin-top: -3px;
  color: rgba(0, 0, 0, 0.8);
}

/*178, 182, 182*/
.user_data h5,
.hardware_data h5 {
  color: rgba(107, 121, 142, 0.98);
}

.user_data p,
.hardware_data p {
  font-size: 12px;
  color: rgba(0, 139, 139, 0.5);
  margin-right: 1em;
}

.mana_c {
  width: 20%;
  height: 100%;
  position: absolute;
  right: 1px;
}

.mana_c .icon {
  font-size: 13px;
}
</style>