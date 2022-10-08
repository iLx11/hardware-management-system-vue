<template>
  <!-- 表单开始 -->
  <section>
    <div class="kalada">
      <div class="sub">
        <div class="drop-shadow">
          <div class="glass"></div>
          <!-- <span>GLASS</span> -->
          <div class="login-box">
            <h2>RegisTer</h2>
            <form :model="formData">
              <div class="user-box">
                <input
                  type="text"
                  v-model="formData.name"
                  @blur="hasUser"
                  id="user"
                />
                <label>Username</label>
              </div>
              <div class="user-box">
                <input
                  type="password"
                  v-model="formData.password"
                  name=""
                  id="password"
                />
                <label>Password</label>
              </div>
              <a href="javascript:void(0)" id="sub" @click="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 表单结束 -->
</template>

<script>
import {md5} from '../assets/js/md5.js'
export default {
  data: function () {
    return {
      formData: {
        name: "",
        password: "",
      },
    }
  },
  methods: {
    async hasUser() {
      if (this.formData.name != "") {
        const { data: res } = await this.$http.get(
          "/users/" + this.formData.name
        )
        if (res.code == 10041) {
          this.$message.error("抱歉，该用户名已被占用")
          return false
        } else {
          this.$message.success("该用户名可用")
          return true
        }
      } else {
        this.$message.error("请输入内容")
      }
    },
    async submit(res) {
      if (this.formData.name != "" && this.formData.password != "") {
        if (this.hasUser()) {
          this.formData.password = md5(this.formData.password)
          const { data: res } = await this.$http.post(
            "/users/register",
            this.formData
          )
          if (res.code == 10011) {
            this.$message.success("注册成功")
            this.$router.push("/admin")
          } else {
            this.$message.error("注册失败")
          }
        }else {
          this.$message.info("抱歉，该用户名已被占用")
        }
      } else {
        this.$message.warning("有输入框未填写")
      }
    },
  },
}
</script>

<style lang="less">
</style>