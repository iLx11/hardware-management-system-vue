<template>
  <section class="kalada_user">
        <!-- 页面遮罩 -->
    <div v-show="showMask" class="cover" @click="maskHide"></div>
    <section>
      <div class="content">
        <div class="ct">
          <div class="user-content">
            <div @click="exit" class="exit">
              <svg
                t="1664153717866"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2607"
                width="24"
                height="24"
              >
                <path
                  d="M679.253333 921.6h-409.6c-58.026667 0-102.4-44.373333-102.4-102.4V204.8c0-58.026667 44.373333-102.4 102.4-102.4h409.6c58.026667 0 102.4 44.373333 102.4 102.4v34.133333c0 20.48-13.653333 34.133333-34.133333 34.133334s-34.133333-13.653333-34.133333-34.133334V204.8c0-20.48-13.653333-34.133333-34.133334-34.133333h-409.6c-20.48 0-34.133333 13.653333-34.133333 34.133333v614.4c0 20.48 13.653333 34.133333 34.133333 34.133333h409.6c20.48 0 34.133333-13.653333 34.133334-34.133333v-34.133333c0-20.48 13.653333-34.133333 34.133333-34.133334s34.133333 13.653333 34.133333 34.133334v34.133333c0 58.026667-44.373333 102.4-102.4 102.4z m201.386667-395.946667c6.826667-10.24 3.413333-23.893333-3.413333-34.133333l-102.4-136.533333c-10.24-13.653333-34.133333-17.066667-47.786667-6.826667-13.653333 10.24-17.066667 34.133333-6.826667 47.786667l61.44 81.92h-307.2c-20.48 0-34.133333 13.653333-34.133333 34.133333s13.653333 34.133333 34.133333 34.133333h375.466667c13.653333 0 23.893333-6.826667 30.72-20.48z m-105.813333 143.36l27.306666-34.133333c10.24-13.653333 6.826667-37.546667-6.826666-47.786667s-37.546667-6.826667-47.786667 6.826667l-27.306667 34.133333c-10.24 13.653333-6.826667 37.546667 6.826667 47.786667 6.826667 3.413333 13.653333 6.826667 20.48 6.826667 10.24 0 20.48-3.413333 27.306667-13.653334z m-13.653334 10.24c3.413333-3.413333 6.826667-3.413333 10.24-6.826666 0-3.413333 3.413333-3.413333 3.413334-3.413334 0-3.413333 3.413333-3.413333 3.413333-6.826666s0-3.413333 3.413333-6.826667V648.533333c0-10.24-3.413333-17.066667-10.24-23.893333-3.413333-3.413333-6.826667-6.826667-10.24-6.826667-6.826667-3.413333-13.653333-3.413333-20.48-3.413333-3.413333 0-3.413333 0-6.826666 3.413333-3.413333 0-3.413333 3.413333-6.826667 3.413334s-3.413333 3.413333-6.826667 3.413333c-6.826667 6.826667-10.24 13.653333-10.24 23.893333 0 10.24 3.413333 17.066667 10.24 23.893334 0 0 3.413333 3.413333 6.826667 3.413333s3.413333 3.413333 6.826667 3.413333 3.413333 0 6.826666 3.413334h6.826667c3.413333 0 10.24 0 13.653333-3.413334z"
                  fill="#8a8a8a"
                  p-id="2608"
                ></path>
              </svg>
            </div>
            <h1 class="current-user">{{current_user}}</h1>
            <div class="name-change" @click="dataTransfer(1)">修改用户名</div>
            <div class="password-change" @click="dataTransfer(2)">修改密码</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="C_t">
          <div class="ct">
            <div class="app_qb"></div>
            <div class="message">
              扫码下载软件，有更为流畅、迅速、便捷、清晰的体验，还有更多功能。
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="userChange" v-show="showChangeBox">
      <input
       v-model.trim="changeUInp"
        type="text"
        name=""
        id="change_put"
        placeholder="请输入"
        autofocus
        autocomplete="off"
      />
      <svg
        id="user_c_inp"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="32px"
        height="32px"
      >
        <path
          d="M 9 6 C 5.6983746 6 3 8.6983746 3 12 L 3 20 C 3 23.301625 5.6983746 26 9 26 C 12.301625 26 15 23.301625 15 20 L 15 12 C 15 8.6983746 12.301625 6 9 6 z M 17 6 L 17 26 L 19 26 L 19 19.320312 L 21.154297 16.283203 L 26.722656 26 L 29 26 L 22.429688 14.486328 L 28.451172 6 L 26 6 L 19 15.863281 L 19 6 L 17 6 z M 9 8 C 11.220375 8 13 9.7796254 13 12 L 13 20 C 13 22.220375 11.220375 24 9 24 C 6.7796254 24 5 22.220375 5 20 L 5 12 C 5 9.7796254 6.7796254 8 9 8 z"
        />
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      changeUInp: "",
      switch: "",
      current_user: "",
      showChangeBox: false,
       showMask: false,
    }
  },
  methods: {
    //用户退出
    exit() {
      this.$confirm("你真的想要退出吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.changeUser(2, 0, this.current_user)

          this.$message.success("退出成功")
        })
        .catch(() => {
          this.$message.info("取消退出")
        })
    },
    //用户更改输入
    dataTransfer(a) {
      this.changeUInp = this.current_user
      this.showChangeBox = true
      this.showMask = true
      this.switch = a
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
    //提交更改
    async subChange() {
      if (this.changeUInp != "" && this.changeUInp != null) {
        if (this.switch == 1) {
          const { data: res } = await this.$http.get(
            "/users/" + this.changeUInp
          )
          if (res.code == 10040) {
            if (this.current_user != null) {
              this.changeUser(3, this.changeUInp, this.current_user)
              this.showChangeBox = false
              this.showMask = false
            }
          } else {
            this.$message.warning("抱歉，此用户名已注册")
          }
        }
        if (this.switch == 2) {
          this.changeUser(4, this.changeUInp, this.current_user)
        }
      } else {
        this.$message.warning("请输入内容")
      }
    },
    maskHide() {
      this.showChangeBox = false
      this.showMask = false
    },
    getCookie(objname) {
      let arrstr = document.cookie.split("; ")
      for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=")
        if (temp[0] === objname) return unescape(temp[1])
      }
    },
  },
}
</script>

<style lang="less" scoped>
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
.user-content {
    width: 100%;
    height: 16em;
    border-radius: 30px;
}

.current-user {
    width: 4.5em;
    height: 4.5em;
    font-size: 45px;
    text-align: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.name-change {
    width: 10em;
    height: 10em;
    background: rgba(0, 139, 139, 0.2);
    box-shadow: -1px -1px 1px 0.5px white;
    border-radius: 50%;
    box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
    position: absolute;
    top: 40%;
    left: 60%;
    transform: translate(-2%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(51, 51, 51, 0.8);
    animation: cycle 6s linear infinite;

}

@keyframes cycle {
    0% ,100%{
        transform: scale(1.0) translate(-2%, -50%);
    }
    33% {
        transform: scale(1) translate(-10%, -40%);
    }
    66% {
        transform: scale(1.1) translate(5%, -45%);
    }

}
.name-change.active {
    box-shadow: 1px 1px 1px 0.5px white;
}

.password-change {
    width: 8em;
    height: 8em;
    background: rgba(231, 238, 238, 0.6);
    box-shadow: 0.7px -0.7px 1px 0.5px white;
    border-radius: 50%;
    box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
    position: absolute;
    top: 70%;
    left: 5%;
    display: flex;
    justify-content: center;
    transform: translate(-2%, -50%);
    align-items: center;
    color: rgba(51, 51, 51, 0.8);
    animation: cycle 6s linear 1s infinite;
}

.password-change:active {
    box-shadow: -1px 1px 1px 0.5px white;
}

.app_qb {
    width: 60%;
    height: 120px;
    box-shadow: 0 0 0 2px darkgrey;
    border-radius: 10px;
    float: left;
    background: url("../../assets/img/123.png")no-repeat;
    background-size: contain;
    background-position: center;
}

.message {
    width: 36%;
    height: 120px;
    /*box-shadow: 0 0 0 2px darkgrey;*/
    float: right;
    color: rgba(0, 139, 139, 0.5);
}

.exit {
    width: 6em;
    height: 6em;
    background: rgba(0, 139, 139, 0.1);
    box-shadow: -1px -1px 1px 0.5px white;
    border-radius: 50%;
    box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
    position: absolute;
    top: 20%;
    left: 10%;
        transform: translate(-2%, -50%);

    display: flex;
    justify-content: center;
    align-items: center;
    animation: cycle 6s linear 0.5s infinite;
}

.exit.active {
    transform: scale(1.05);
}
.userChange {
    width: 92%;
    border: none;
    height: 3.5em;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.55);
    border-radius: 20px;

    position: absolute;
    top: 34%;
    left: 50%;
    margin-left: -46%;
    z-index: 66;
}

#change_put {
    width: 82%;
    border: none;
    height: 4em;
    background: rgba(0, 0, 0, 0);
    text-align: center;
    transform: translateY(-1em);
    font-size: 18px;
    z-index: 66;

}

.userChange svg {
    height: 3.3em;
}

.glass_cover {
    width: 100%;
    height: 100%;
    display: none;
    position: fixed;
    top: 0;
    background: rgba(255, 255, 255, 0.6);
    filter: blur(20px);
    z-index: 4;
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
}
</style>