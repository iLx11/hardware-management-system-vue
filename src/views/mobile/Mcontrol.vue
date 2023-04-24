<template>
  <!-- kalada_c开始 -->
  <!------------------------------------------------------------>
  <section class="kalada_c">
    <!-- 摄像头监控画面 -->
    <div id="use-gyroscope" @click="useGyroscope" v-if="videoShow">使用陀螺仪</div>

    <div id="model-content" v-if="videoShow">
      <iframe src="" frameborder="0" scorlling="no" id="iframeVideo" ref="iframeRef"> 你的浏览器不支持iframe </iframe>
    </div>
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
              <div id="content_data">
                <div id="contentData" @click="getWeatherNow">
                  <div id="weather">
                    <h3>Weather:</h3>
                    <div>
                      <span></span>
                      <p>{{ weather }}</p>
                    </div>
                  </div>
                  <div class="temp">
                    <h3>Temperature:</h3>
                    <div>
                      <span>{{ temp }}</span>
                      <p>℃</p>
                    </div>
                  </div>
                  <div class="hum">
                    <h3>humidity:</h3>
                    <div>
                      <span>{{ hum }}</span>
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
                  <input type="text" name="" placeholder="mqtt server address" id="mqt" v-model="mqttInp" @blur="MQTTConnect" />
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
                <h3 ref="stateA">Close</h3>
                <h1>
                  {{ v.name }}
                </h1>
                <h4>success</h4>
              </div>
              <div @click="analogShow(k)" class="analog led_analog">模拟调整</div>
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
          <section class="bar" ref="barBox">
            <input class="bar-input analogInp" type="range" min="0" max="100" value="100" />
            <div class="ind">
              <div class="indicator">100%</div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <!------------------------------------------------------------>
    <!-- 简单控制开始 -->
    <section id="spc-section">
      <div class="content-spc" :key="v.id" v-for="(v, k) in SpList">
        <div class="C_t_spc">
          <div class="ct_spc">
            <div class="con_open">
              <div class="con_situation">
                <h1>{{ v.name }}</h1>
                <h4>success</h4>
                <div ref="stateS">Close</div>
              </div>
              <div @click="SPSWControl(k, 'open')" class="con_o door_o">open</div>
              <div @click="SPSWControl(k, 'close')" class="con_c door_c">close</div>
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
import mqtt from 'mqtt'
import { getHardwareList, AGSWControl, SPSWControl, gyrocopeControl, getWeatherByAPI } from '@/API/hardwareAPI'
export default {
  data: function () {
    this.AnaGet = this.throttle(this.AnaGet, 330)
    this.gyrocopeCam = this.throttle(this.gyrocopeCam, 530)
    return {
      videoShow: false,
      AnaList: [],
      SpList: [],
      mqttInp: '',
      isgyro: false,
      options: {
        // mqtt客户端id
        // clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        clientId: '75ee4e39450943889749e9924e3a982c'
        // connectTimeout: 3,
      },
      weather: 'Sun',
      temp: '26',
      hum: '30'
    }
  },
  created () {
    this.hardwareLoad()
    // // let hardwareIP = "http://192.168.0.110"
    // const hardwareIP = 'http://192.168.0.200'
    // localStorage.setItem('hardwareIP', hardwareIP) // 储存函数
    // // this.useGyroscope()
    this.getWeatherNow()
  },
  methods: {
    async getWeatherNow () {
      const { data: res } = await getWeatherByAPI()
      if (res.code === '200') {
        this.hum = res.now.humidity
        this.temp = res.now.temp
        switch (res.now.text) {
          case '阴':
            this.weather = 'Cloudy'
            break
          case '晴':
            this.weather = 'Sun'
            break
          case '雨':
            this.weather = 'Rain'
            break
          case '雪':
            this.weather = 'Snow'
            break
        }
      }
    },
    // 连接MQTT服务器
    MQTTConnect () {
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
        client.on('error', (err) => {
          this.$message.error('连接失败')
          console.log(err)
          client.end()
        })
      }
    },
    throttle (func, wait) {
      let timeout = null
      return function () {
        const context = this
        const args = arguments
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null
            func.apply(context, args)
          }, wait)
        }
      }
    },
    useGyroscope () {
      if (window.DeviceOrientationEvent) {
        if (!this.isgyro) {
          this.isgyro = true
          this.$message.warning('陀螺仪控制已开启')
          window.addEventListener('deviceorientation', this.gyrocopeCam, false)
        } else {
          this.isgyro = false
          this.$message.warning('陀螺仪控制已关闭')
          window.removeEventListener('deviceorientation', this.gyrocopeCam, false)
        }
      } else {
        this.$message.warning('你的浏览器不支持陀螺仪')
      }
    },
    async gyrocopeCam (event) {
      let alpha = event.alpha
      let beta = event.beta
      // let gamma = event.gamma
      this.alpha = alpha
      if ((alpha < 270 && alpha > 90) || (beta > 90 && beta < -90)) return
      if (alpha >= 270) alpha = Math.round(450 - alpha)
      if (alpha <= 90) alpha = Math.round(90 - alpha)
      beta = Math.round(90 + beta)
      const hardwareIP = window.localStorage.getItem('hardwareIP')
      const { data: res } = await gyrocopeControl(hardwareIP, alpha, beta)
      console.log(res)
    },
    async hardwareLoad () {
      const { data: res } = await getHardwareList()
      this.hardwareLength = res.data.length
      let HardwareList = res.data
      // 过滤禁用的硬件
      HardwareList = HardwareList.filter(o => o.status)
      const pattern1 = /^AGSW/
      const pattern2 = /^SPSW/
      this.AnaList = HardwareList.filter((o) => pattern1.test(o.hardwareId))
      this.SpList = HardwareList.filter((o) => pattern2.test(o.hardwareId))
    },
    // 模拟引脚显示
    analogShow (k) {
      const that = this
      const barIn = this.$refs.barBox[k].childNodes[0]
      const indicator = this.$refs.barBox[k].childNodes[1].childNodes[0]
      const barBoxDisplay = this.$refs.barBox[k].style.display
      this.$refs.stateA[k].innerHTML = 'Open'
      if (barBoxDisplay === 'none') {
        this.$refs.barBox[k].style.display = 'block'
        barIn.onchange = function () {
          indicator.innerHTML = barIn.value + '%'
          indicator.style.marginLeft = barIn.value + '%'
          that.AnaGet(k, 'pwm', barIn.value)
        }

        // 实时改变
        barIn.ontouchmove = function () {
          indicator.innerHTML = barIn.value + '%'
          indicator.style.marginLeft = barIn.value + '%'
          that.AnaGet(k, 'pwm', barIn.value)
        }
      } else {
        this.$refs.barBox[k].style.display = 'none'
        this.$refs.stateA[k].innerHTML = 'Close'
        barIn.removeEventListener('change', barIn)
        barIn.removeEventListener('touchmove', barIn)
      }
    },
    // 模拟控制硬件简单控制
    AnaSwitch (k, ins) {
      this.AnaGet(k, ins)
      let timeOut = null
      if (ins === 'open') {
        this.$refs.stateA[k].innerHTML = 'Open'
        this.videoShow = true
        timeOut = setTimeout(() => {
          const videoIP = window.localStorage.getItem('videoIP')
          this.$refs.iframeRef.src = videoIP
        }, 300)
      } else {
        clearTimeout(timeOut)
        this.$refs.stateA[k].innerHTML = 'Close'
        this.videoShow = false
      }
      // console.log(this.AnaList[k].hardwareId.substring(4))
    },
    async AnaGet (k, ins, pwm = 0) {
      // 读取硬件8266IP
      const hIP = localStorage.getItem('hardwareIP') // 读取函数
      const num = this.AnaList[k].hardwareId.substring(4)
      const { data: res } = await AGSWControl(hIP, num, this.AnaList[k].hardwarePort, ins, pwm)
      console.log(res)
    },
    // 简单控制
    async SPSWControl (k, ins) {
      // 读取@硬件8266IP
      const hIP = localStorage.getItem('hardwareIP') // 读取函数
      const num = this.SpList[k].hardwareId.substring(4)
      ins === 'open' ? (this.$refs.stateS[k].innerHTML = 'Open') : (this.$refs.stateS[k].innerHTML = 'Close')
      const json = {
        hardwarePort: this.SpList[k].hardwarePort,
        instruction: ins,
        num: ''
      }
      if (num === '02' || num === '03') {
        json.num = 'relay'
      } else {
        json.num = 'motor'
      }
      const { data: res } = await SPSWControl(hIP, num, json)
      console.log(res)
      this.$message.success(this.SpList[k].name + '操作成功')
    }
  }
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

#model-content {
  width: 100%;
  height: 400px;
  max-width: 100%;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 66;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  #iframeVideo {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // transform: rotate(-90deg) translateY(0%);
  }
}
#use-gyroscope {
  width: 90px;
  height: 30px;
  position: fixed;
  right: 5%;
  top: 3%;
  background: rgba(240, 244, 245, 1);
  z-index: 666;
  border-radius: 6px;
  color: rgba(51, 51, 51, 0.6);
  font-size: 14px;
  text-align: center;
}
.state {
  display: inline-block;
}

.content {
  width: 95%;
  margin: auto;
}

#spc-section {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
}

.content-spc {
  width: 48%;
}

.C_t,
.C_t_spc {
  width: 100%;
  height: auto;
  margin: auto;
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.8);
  border-radius: 20px;
  padding: 0.5em;
  margin-bottom: 0.9em;
  background: rgba(255, 255, 255, 0.8);
}

.ct,
.ct_spc {
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
  #content_data {
    width: 100%;
    height: 35%;
    position: absolute;
    bottom: 37%;
    background-color: rgba(231, 238, 238, 0.6);
    #contentData {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
      align-items: center;
      // font-family: "ceyy" !important;
      h3 {
        color: rgba(51, 51, 51, 0.8) !important;
      }
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
      color: rgba(51, 51, 51, 0.8) !important;
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
  height: 70%;
  z-index: 5;
  font-size: 18px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-content: flex-end;
  align-items: flex-end;
  text-align: center;
  padding: 0.3em;
  h1 {
    font-size: 30px;
    color: rgba(51, 51, 51, 0.7);
    align-self: center;
  }
  h3,
  h4 {
    font-size: 10px;
    color: rgba(130, 174, 175, 0.8);
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
  content: '';
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
  height: 100px;
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.9);
  border-radius: 13px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.con_situation {
  width: 70%;
  position: absolute;
  text-align: center;
  top: -9px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
  color: @font-color-1;
  border: 1.5px solid rgba(211, 215, 212, 0.8);
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
  border-radius: 0 0 15px 15px;
  padding: 0.2em;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  .state,
  h4 {
    font-size: 13px;
  }
  h1 {
    color: rgba(51, 51, 51, 0.7);
  }
}

.con_o {
  width: 49%;
  height: 100%;
  background-color: rgba(255, 222, 233, 0.2);
  background-image: linear-gradient(0deg, rgba(250, 241, 244, 0.1) 0%, rgba(200, 219, 219, 0.2) 100%);
  border-radius: 12px 7px 5px 12px;
  clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%);
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 0.4em;
  color: rgba(51, 51, 51, 0.6);
}

.con_c {
  width: 49%;
  height: 100%;
  background-color: rgba(255, 222, 233, 0.2);
  background-image: linear-gradient(0deg, rgba(255, 222, 233, 0.1) 0%, rgba(181, 208, 207, 0.3) 100%);
  border-radius: 5px 12px 12px 5px;
  clip-path: polygon(0% 50%, 50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);
  text-align: right;
  z-index: 2;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 0.4em;
  color: rgba(51, 51, 51, 0.6);
}

.zhanwei {
  width: 100%;
  height: 70px;
}
</style>
