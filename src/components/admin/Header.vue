<template>
  <!-- 头部组件 -->
  <div class="header">
    <!-- 页面遮罩 -->
    <div v-show="showMask" class="cover" @click="maskHide"></div>
    <div class="sysName">💻HARDWARESYSTEM</div>
    <div class="MQTTconnect">
      <input v-model="mqttInp" @blur="MQTTConnect" id="mqt" type="text" placeholder="MQTT_address" />
    </div>
    <div @click="exit" class="exit">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuichu"></use>
      </svg>
    </div>
    <div class="user">
      <span>{{ current_user }}</span>
      <div class="userTools">
        <div @click="dataTransfer(1)" class="userNameChange">更改用户名</div>
        <div @click="dataTransfer(2, current_user)" class="userPasswChange">
          更改密码
        </div>
      </div>
    </div>
    <div v-show="showChangeBox" class="userChangeBox">
      <input
        v-model.trim="changeUInp"
        type="text"
        placeholder="请输入更改的内容"
      />
      <div class="Boxsub" @click="subChange">👌</div>
    </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import { postChangeUser, getUserByName } from '@/API/userAPI.js'

export default {
  data: function () {
    return {
      changeUInp: '',
      switch: '',
      current_user: '',
      showChangeBox: false,
      showMask: false,
      mqttInp: '',
      options: {
        // mqtt客户端id
        // clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        clientId: '75ee4e39450943889749e9924e3a982c'
        // connectTimeout: 3,
      }
    }
  },
  created () {
    // 根据cookie获取用户
    this.current_user = this.getCookie('user')
    if (this.currentUser !== '' && this.currentUser != null) {
      this.changeUser(2, 1, this.current_user)
    } else {
      this.$message.warning('用户未登录')
      // 跳转到登陆界面
      // this.$router.push("/login")
    }
  },
  methods: {
    // 连接MQTT服务器
    MQTTConnect () {
      console.log('123123')
      if (this.mqttInp == null || this.mqttInp === '') {
        this.$message.warning('服务器地址为空')
      } else {
        // 给父组件传值
        this.$emit('address', this.mqttInp)
        const client = mqtt.connect(this.mqttInp, this.options)
        client.on('connect', () => {
          // 给父组件传状态
          this.$emit('status', true)
          // 给父组件传对象
          this.$emit('client', client)
          this.$message.success('连接成功')
        })
        client.on('error', function (err) {
          this.$message.error('连接失败')
          console.log(err)
          client.end()
        })
      }
    },
    // 用户退出
    exit () {
      this.$confirm('你真的想要退出吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.changeUser(2, 0, this.current_user)

          this.$message.success('退出成功')
        })
        .catch(() => {
          this.$message.info('取消退出')
        })
    },
    // 用户更改输入
    dataTransfer (a) {
      this.changeUInp = this.current_user
      this.showChangeBox = true
      this.showMask = true
      this.switch = a
    },
    // 将请求发到服务器
    async changeUser (method = null, value = null, name = null) {
      // 发起post请求修改用户
      const { data: res } = await postChangeUser(method, value, name)
      if (res.data === true) {
        this.$message.success('修改成功')
        // load
        if (method === 3) {
          this.current_user = value
        }
      }
    },
    // 修改用户的逻辑
    async subChange () {
      if (this.changeUInp != '' && this.changeUInp != null) {
        if (this.switch == 1) {
          // 获取当前输入的用户名，判读是否已经存在用户
          const { data: res } = await getUserByName(this.changeUInp)
          // 如果不存在则继续修改
          if (res.code === 10040) {
            if (this.current_user != null) {
              this.changeUser(3, this.changeUInp, this.current_user)
              this.showChangeBox = false
              this.showMask = false
            }
          } else {
            this.$message.warning('抱歉，此用户名已注册')
          }
        }
        if (this.switch === 2) {
          this.changeUser(4, this.changeUInp, this.current_user)
        }
      } else {
        this.$message.warning('请输入内容')
      }
    },
    // 隐藏遮罩
    maskHide () {
      this.showChangeBox = false
      this.showMask = false
    },
    // 获取用户 cookie
    getCookie (objname) {
      const arrstr = document.cookie.split('; ')
      for (let i = 0; i < arrstr.length; i++) {
        const temp = arrstr[i].split('=')
        if (temp[0] === objname) return unescape(temp[1])
      }
    }
  }
}
</script>

<style>
:root {
  --bgcolor: rgba(255, 255, 255, 0.9);
  --bgshadow1: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  --bgshadow2: 3px 4px 12px 3px rgba(111, 109, 133, 0.13);
}

.header {
  width: 100%;
  height: 3em;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow1);
  border-radius: 10px;
  padding: 0.4em;
  font-family: "youshe";
}

.content {
  width: 100%;
  height: 87%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
/*头部*/
/*-------------------------------------------------------------*/
.header .user {
  width: 6em;
  height: 100%;
  /*position: absolute;
    right: 0;*/
  box-shadow: var(--bgshadow1);
  background: rgba(255, 255, 255, 0.8);
  float: right;
  border-radius: 5px;
  border: 0.05px solid rgba(51, 51, 51, 0.3);
  color: rgba(51, 51, 51, 0.6);
  text-align: center;
  padding: 0.2em;
  margin-right: 1.8em;
  cursor: pointer;
  position: relative;
}

.header .sysName {
  padding-left: 0.2em;
  font-size: 26px;
  float: left;
  color: rgba(51, 51, 51, 0.7);
}

.MQTTconnect {
  width: 15em;
  height: 100%;
  float: left;
  margin-left: 3em;
  padding: 0.1em;
}
.MQTTconnect input {
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: 0 0 0 0.9px rgba(51, 51, 51, 0.8);
  border-radius: 12px;
  text-align: center;
}
.header .exit {
  float: right;
  cursor: pointer;
}
.header .userTools {
  width: 100%;
  height: 7em;
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: var(--bgshadow2);
  border-radius: 6px;
  display: none;
  padding: 0.3em;
}
.header .userTools div {
  width: 100%;
  height: 45%;
  margin-bottom: 0.3em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header .user:hover .userTools {
  display: block;
}
.userChangeBox {
  width: 19em;
  height: 8em;
  background: rgba(255, 255, 255, 1);
  box-shadow: var(--bgshadow2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 66;
  padding: 2em;
  border-radius: 9px;
}
.userChangeBox input {
  width: 100%;
  height: 70%;
  border: 1.2px solid rgba(51, 51, 51, 0.7);
  border-radius: 12px;
  text-align: center;
  font-size: 19px;
}
.userChangeBox .Boxsub {
  width: 4em;
  height: 4em;
  background: rgba(51, 51, 51, 0.6);
  border-radius: 100% 0 9px 0;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  z-index: 66;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
