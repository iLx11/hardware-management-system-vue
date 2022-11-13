<template>
  <!-- kalada_c开始 -->
  <!------------------------------------------------------------>
  <section class="kalada_c">
    <!-- 数据显示开始 -->
    <!------------------------------------------------------------>
    <section>
      <div class="content">
        <div class="C_t">
          <div class="ct">
            <div class="head_data">
              <div class="head_situation">
                <h1>
                  Data<br />
                  <h4>success</h4>
                </h1>
              </div>
              <div class="content_data">
                <div class="contentData">
                  <div class="weather">
                    <h3>Weather:</h3>
                    <div>
                      <span></span>
                      <p>Sun</p>
                    </div>
                  </div>
                  <div class="temp">
                    <h3>Temperature:</h3>
                    <div>
                      <span>26</span>
                      <p>℃</p>
                    </div>
                  </div>
                  <div class="hum">
                    <h3>humidity:</h3>
                    <div>
                      <span>30</span>
                      <p>%RH</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="headData">
                <div class="mqtt_connect">
                  <label>
                    <h3>MQTT</h3>
                    <h5>connect</h5>
                  </label>
                  <input
                    type="text"
                    name=""
                    placeholder="mqtt server address"
                    id="mqt"
                    v-model="mqttInp"
                    @blur="MQTTConnect"
                  />
                </div>
                <p id="mqtt_sit" style="font-size: 5px">CONNECTED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 数据显示结束 -->
    <!------------------------------------------------------------>
    <!-- 模拟控制开始 -->
    <section>
      <div class="content" :key="v.id" v-for="(v, k) in AnaList">
        <div class="C_t">
          <div class="ct ab">
            <div class="open led_open">
              <div class="led_situation">
                <h1>
                  {{ v.name }}:&nbsp;
                  <div class="state">Close</div>
                  <br />
                  <h4>success</h4>
                </h1>
              </div>
              <div @click="analogShow(k, $event)" class="analog led_analog">
                模拟调整
              </div>
            </div>
            <div class="switch led_switch">
              <div class="o_n led_on" @click="AnaSwitch(k, 'open')">
                <h4>打开</h4>
              </div>
              <div class="o_ff led_off" @click="AnaSwitch(k, 'close')">
                <h4>关闭</h4>
              </div>
            </div>
          </div>
          <section class="bar">
            <input
              class="bar-input analogInp"
              type="range"
              min="0"
              max="100"
              value="100"
            />
            <div class="ind">
              <div class="indicator">100%</div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <!------------------------------------------------------------>
    <!-- 简单控制开始 -->
    <section>
      <div class="content" :key="v.id" v-for="(v, k) in SpList">
        <div class="C_t">
          <div class="ct">
            <div class="con_open">
              <div class="con_situation">
                <h1>
                  {{ v.name }}<br />
                  <h4>
                    success&nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="state">Close</div>
                  </h4>
                </h1>
              </div>
              <div @click="SPSWControl(k, 'open')" class="con_o door_o">
                &nbsp;&nbsp;open
              </div>
              <div @click="SPSWControl(k, 'close')" class="con_c door_c">
                close&nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 控制门结束 -->
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
import mqtt from "mqtt"
export default {
  data: function () {
    return {
      AnaList: [],
      SpList: [],
      mqttInp: "",
      options: {
        //mqtt客户端id
        // clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        clientId: "75ee4e39450943889749e9924e3a982c",
        // connectTimeout: 3,
      },
    }
  },
  mounted() {
    this.hardwareLoad()
    let hardwareIP = "http://192.168.0.110"
    localStorage.setItem("hardwareIP", hardwareIP) //储存函数
  },
  methods: {
    // 连接MQTT服务器
    MQTTConnect() {
      console.log("123123")
      if (this.mqttInp == null || this.mqttInp == "") {
        this.$message.warning("服务器地址为空")
      } else {
        //给父组件传值
        this.$emit("address", this.mqttInp)
        let client = mqtt.connect(this.mqttInp, this.options)
        client.on("connect", () => {
          // 给父组件传状态
          this.$emit("status", true)
          //给父组件传对象
          this.$emit("client", client)
          this.$message.success("连接成功")
        })
        client.on("error", (err) => {
          this.$message.error("连接失败")
          client.end()
        })
      }
    },
    async hardwareLoad() {
      const { data: res } = await this.$http.get("/hardwares")
      this.hardwareLength = res.data.length
      let HardwareList = res.data
      let pattern1 = /^AGSW/
      let pattern2 = /^SPSW/
      this.AnaList = HardwareList.filter((o) => {
        return pattern1.test(o.hardwareId)
      })
      this.SpList = HardwareList.filter((o) => {
        return pattern2.test(o.hardwareId)
      })
    },
    //模拟引脚显示
    analogShow(k, ev) {
      let that = this
      if (ev.target.parentNode.parentNode.nextSibling.style.display == "none") {
        ev.target.parentNode.parentNode.nextSibling.style.display = "block"
        let barIn = ev.target.parentNode.parentNode.nextSibling.children[0]
        let indicator =
          ev.target.parentNode.parentNode.nextSibling.children[1].children[0]
        // let barIn = $(".bar-input").eq(k)[0]
        barIn.addEventListener("change", function () {
          indicator.innerHTML = barIn.value + "%"
          indicator.style.marginLeft = barIn.value + "%"
          that.AnaGet(k, "pwm", barIn.value)
        })
        //实时改变
        barIn.addEventListener("touchmove", function () {
          indicator.innerHTML = barIn.value + "%"
          indicator.style.marginLeft = barIn.value + "%"
          that.AnaGet(k, "pwm", barIn.value)
        })
      } else {
        ev.target.parentNode.parentNode.nextSibling.style.display = "none"
        barIn.removeEventListener("click")
        barIn.removeEventListener("change")
      }
    },
    //模拟控制硬件简单控制
    AnaSwitch(k, ins) {
      this.AnaGet(k, ins)
      console.log(ins)
      console.log(this.AnaList[k].hardwareId.substring(4))
    },
    async AnaGet(k, ins, pwm = 0) {
      // 读取硬件8266IP
      let hIP = localStorage.getItem("hardwareIP") //读取函数
      let num = this.AnaList[k].hardwareId.substring(4)
      const { data: res } = await this.$http.get(hIP + "/agswcontrol" + num, {
        params: {
          // name: this.AnaList[k].name,
          // hardwareId: this.AnaList[k].hardwareId,
          hardwarePort: this.AnaList[k].hardwarePort,
          instruction: ins,
          pwm: pwm,
        },
      })
    },
    //简单控制
    async SPSWControl(k, ins) {
      // 读取@硬件8266IP
      let hIP = localStorage.getItem("hardwareIP") //读取函数
      let num = this.SpList[k].hardwareId.substring(4)
       let json = {
          hardwarePort: this.SpList[k].hardwarePort,
          instruction: ins,
          num: ""
        }
      if (num == "02" || num == "03") {
        json.num = "relay"
      }else {
        json.num = "motor"
      }

      const { data: res } = await this.$http.get(hIP + "/spswcontrol" + num, {
        params: {
          // name: this.SpList[k].name,
          // hardwareId: this.SpList[k].hardwareId,
          jsonData: JSON.stringify(json),
        },
      })
      this.$message.success(this.SpList[k].name + "操作成功")
    },
  },
}
</script>

<style lang="less" scoped>
/*公用结构开始*/
/*-----------------------------------------------------------*/
@bgcolor: rgba(255, 255, 255, 0.17);
@bgcolor-1: rgba(231, 238, 238, 0.6);
@bgshadow1: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
@bgshadow2: 3px 4px 12px 3px rgba(111, 109, 133, 0.13);
@font-color-1: rgba(130, 174, 175, 0.9);
@font-color-2: rgba(51, 51, 51, 0.8);
.state {
  display: inline-block;
}

.content {
  width: 95%;
  margin: auto;
}

.C_t {
  width: 100%;
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
/*头部数据开始*/
/*-----------------------------------------------------------*/

.head_data {
  width: 100%;
  height: 230px;
  box-shadow: 0 0 0 1.5px rgba(211, 215, 212, 1);
  border-radius: 13px;
  position: relative;
  .head_situation {
    width: 80%;
    position: absolute;
    text-align: center;
    top: 0px;
    left: 50%;
    margin-left: -40%;
    z-index: 5;
    color: @font-color-1;
    box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
    border-radius: 0 0 15px 15px;
    padding: 0.2em;
  }
  .content_data {
    width: 100%;
    height: 35%;
    position: absolute;
    bottom: 30%;
    background-color: rgba(231, 238, 238, 0.6);
    .contentData {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      align-items: center;
      div {
        width: 100%;
        height: 30%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        div {
          width: 25%;
          height: 100%;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
}

.headData {
  width: 100%;
  height: 40%;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 5;
  bottom: 0px;
  .mqtt_connect {
    width: 94%;
    display: flex;
    justify-content: flex-start;
    z-index: 2;
    input {
      width: 100%;
      border: none;
      height: 2.5em;
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 2px darkgrey;
      border-radius: 12px;
      /*padding-left: 3em;*/
      text-align: center;
    }
    label {
      width: 20%;
      margin-right: 1em;
      transform: translateY(-6px);
    }
  }
  #mqtt_sit {
    align-self: center;
    background: #fff;
    transform: translateY(4px);
    color: rgba(182, 208, 207, 0.9);
  }
}

/*头部数据结束*/
/*-----------------------------------------------------------*/
.open {
  width: 53%;
  height: 96px;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  border-radius: 13px;
  position: relative;
}

.led_situation {
  width: 100%;
  color: @font-color-2;
  z-index: 5;
  h1,
  h4 {
    font-size: 16px;
    margin-left: 0.6em;
    margin-top: 0.4em;
  }
}

.analog {
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-radius: 0 0 13px 13px;
  background: rgba(161, 163, 166, 0.6);
  z-index: 3;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.switch {
  width: 45%;
  height: 98px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  color: rgba(51, 51, 51, 0.5);
  text-align: center;
  line-height: 43px;
  font-size: 17px;
}

.o_n {
  width: 96%;
  height: 45%;
  border-radius: 7px 12px 7px 7px;
  background-color: rgba(251, 229, 235, 0.4);
  cursor: pointer;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.03);
}

.o_ff {
  width: 96%;
  height: 45%;
  border-radius: 7px 7px 15px 7px;
  background-color: @bgcolor-1;
  /*background-image: linear-gradient(180deg, rgba(228, 200, 196, 0.7) 0%, rgba(181, 255, 252, 0.7) 100%);*/
  cursor: pointer;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.03);
}
/*模拟调整框*/
.bar {
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  position: relative;
}

.bar-input {
  appearance: none;
  width: 96%;
  border-radius: 10px;
  margin-top: 1em;
  background: rgba(51, 51, 51, 0.2);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.bar-input:fill-upper {
  /*background: linear-gradient(to right, #1ab1e2 0%, #1ab1e2 80%, #eee 80%, #eee);*/
  background: rgba(0, 0, 0, 0.2);
}

.ind {
  width: 91.5%;
  margin: 0 auto;
  transform: translateY(27px);
  background: rgba(0, 0, 0, 0);
}

.indicator {
  box-shadow: 0px 15px 35px rgba(236, 0, 113, 0.3);
  background: #ec0071;
  width: 6vh;
  height: 3vh;
  color: white;
  -webkit-transform: translateY(9.6vh);
  transform: translateY(9.6vh);
  text-align: center;
  font-size: 2vh;
  font-weight: 900;
  /*line-height: 8vh;*/
  margin-left: 100%;
  /*transform: translateY(15px);*/
  transform: translate(-3vh, 15px);
  position: absolute;
}

.indicator:before {
  content: "";
  position: absolute;
  background: #ec0071;
  left: 0;
  right: 0;
  margin: auto;
  top: -6px;
  width: 4vh;
  height: 4vh;
  z-index: -1;
  clip-path: polygon(50% 0%, 120% 100%, -20% 100%);
  transform: translateY(-13px);
  /*    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);*/
}

/*公用结构结束*/
/*-----------------------------------------------------------*/

/*简单控制开始*/
/*-----------------------------------------------------------*/
.con_open {
  width: 100%;
  height: 70px;
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.9);
  border-radius: 13px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.con_situation {
  width: 50%;
  position: absolute;
  text-align: center;
  top: 0px;
  left: 50%;
  margin-left: -25%;
  z-index: 5;
  color: @font-color-1;
  border: 1.5px solid rgba(211, 215, 212, 0.8);
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  border-radius: 0 0 15px 15px;
  padding: 0.2em;
  background-color: rgba(255, 255, 255, 0.8);

  h1,
  h4 {
    font-size: 16px;
    color: rgba(51, 51, 51, 0.7);
  }
}

.con_o {
  width: 49%;
  height: 100%;
  background-color: rgba(255, 222, 233, 0.2);
  background-image: linear-gradient(
    0deg,
    rgba(255, 222, 233, 0.1) 0%,
    rgba(181, 208, 207, 0.3) 100%
  );

  border-radius: 12px 7px 5px 12px;
  clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%);
  z-index: 2;
  cursor: pointer;
}

.con_c {
  width: 49%;
  height: 100%;
  background-color: rgba(255, 222, 233, 0.2);
  background-image: linear-gradient(
    0deg,
    rgba(255, 222, 233, 0.1) 0%,
    rgba(181, 208, 207, 0.3) 100%
  );

  border-radius: 5px 12px 12px 5px;
  clip-path: polygon(0% 50%, 50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
  text-align: right;
  z-index: 2;
  cursor: pointer;
}

.zhanwei {
  width: 100%;
  height: 70px;
}
</style>