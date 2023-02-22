<template>
  <!-- 表单开始 -->
  <section>
    <div class="kalada">
      <div class="sub">
        <div class="drop-shadow">
          <div class="glass"></div>
          <div class="login-box">
            <h2>LogIn</h2>
            <form :model="formData">
              <div class="user-box">
                <input
                  type="text"
                  v-model="formData.name"
                  name=""
                  id="user"
                  autocomplete="off"
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
import { postUserLogin } from '@/API/userAPI.js'
import { md5 } from '../assets/js/md5.js'

export default {
  data: function () {
    return {
      formData: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async submit (res) {
      if (this.formData.name !== '' && this.formData.password !== '') {
        this.formData.password = md5(this.formData.password)
        // 验证用户名与密码
        const { data: res } = await postUserLogin(this.formData)
        if (res.code === 10041) {
          this.$message.success('验证成功')
          const clientW = document.documentElement.clientWidth
          if (clientW > 600) {
            this.$router.push('/admin')
          } else {
            this.$router.push('/mobile')
          }
        } else {
          this.$message.warning('验证失败')
          setTimeout(() => {
            this.$confirm('账号未注册，是否跳转到注册页面', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            })
              .then(() => {
                this.$router.push('/Register')
              })
              .catch(() => {
                this.$message.info('取消跳转')
              })
          }, 3000)
        }
      } else {
        this.$message.warning('有输入框未填写')
      }
    }
  }
}
</script>

<style lang="less">
.kalada {
  width: 100%;
  height: 100%;
}
.sub {
  width: 100%;
  height: 43.5em;
  background-image: url("../assets/img/3.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-items: center;
  align-items: center;
  filter: saturate(70%);
}

.glass {
  height: 100%;
  width: 100%;
  background-image: url("../assets/img/3.jpg");
  background-size: cover;
  background-position: center;
  clip-path: inset(9em);
  position: absolute;
  -webkit-filter: blur(12px);
  filter: blur(12px);
  z-index: 1;
}

.drop-shadow {
  height: 100%;
  width: 100%;
  -webkit-filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.3));
  filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
}

.drop-shadow > span {
  position: absolute;
  z-index: 5;
  color: white;
  font-size: 4em;
  letter-spacing: 0.75em;
  padding-left: 0.375em;
}

@media (max-width: 750px) {
  .glass {
    clip-path: inset(2.5em);
    -webkit-filter: blur(15px);
    filter: blur(15px);
  }

  .drop-shadow:before {
    top: 2.5em;
    width: calc(100% - 3.5em);
  }

  .drop-shadow > span {
    font-size: 4em;
  }

  .login-box {
    width: 60% !important;
  }
}

.login-box {
  z-index: 2;
}

.login-box {
  align-items: center;
  justify-items: center;
  border-radius: 10px;
  width: 20%;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  font-size: 45px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: 0;
  border-bottom: 1px solid #fff;
  outline: 0;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 20px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #94f2f7;
  font-size: 17px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #94f2f7;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #94f2f7, 0 0 25px #94f2f7, 0 0 50px #94f2f7,
    0 0 100px #94f2f7;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #94f2f7);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #94f2f7);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}
</style>
