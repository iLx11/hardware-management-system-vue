<template>
  <section class="controlPage">
    <div id="model-content" v-if="videoShow">
      <iframe src="" frameborder="0" scorlling="no" id="iframeVideo" ref="iframeRef"> 你的浏览器不支持iframe </iframe>
    </div>
    <div class="headData">
      <div class="weatherImg" ref="weatherImgRef"></div>
      <div class="contentData" @click="getWeatherNow">
        <div class="weather">
          <h1>
            <span>{{ weather }}</span>
            <p></p>
          </h1>
          <span>Weather</span>
        </div>
        <div class="temp">
          <h1>
            <span>{{ temp }}</span>
            <p>℃</p>
          </h1>
          <span>Temperature</span>
        </div>
        <div class="hum">
          <h1>
            <span>{{ hum }}</span>
            <p>%RH</p>
          </h1>
          <span>humidity</span>
        </div>
      </div>
      <div class="sysData">
        <div class="hNum">
          <h1>{{ hardwareLength }}</h1>
          <span>硬件数量</span>
        </div>
        <div class="uNum">
          <h1>{{ userLength }}</h1>
          <span>用户数量</span>
        </div>
        <div class="MQTTStatus">
          <h1>未连接</h1>
          <span>MQTT连接状态</span>
        </div>
      </div>
    </div>
    <div class="HWcontrol">
      <!-- 模拟控制 -->
      <!------------------------------------------------------------>
      <div class="ANcontrol" :key="v.id" v-for="(v, k) in AnaList">
        <div class="C_t">
          <div class="ct">
            <div class="open">
              <div class="situation">
                <h1>{{ v.name }}</h1>
                <h4 class="state" ref="stateA">Close</h4>
                <h4>success</h4>
              </div>
              <!-- <div @click="analogShow(k)" class="analog led_analog">模拟调整</div> -->
            </div>
            <div class="switch">
              <div class="o_n" @click="AnaSwitch(k, 'open')">
                <h4>打开</h4>
              </div>
              <div class="o_ff" @click="AnaSwitch(k, 'close')">
                <h4>关闭</h4>
              </div>
            </div>
          </div>
          <section class="bar" ref="barBox">
            <input @mousedown="analogShow(k)" class="bar-input analogInp" type="range" min="0" max="100" value="100" />
            <div class="ind">100%</div>
          </section>
        </div>
      </div>
      <!-- 简单控制 -->
      <!------------------------------------------------------------>
      <div class="SPcontrol" :key="v.id" v-for="(v, k) in SpList">
        <div class="ct_sp">
          <div class="con_open">
            <div class="con_situation">
              <h1>{{ v.name }}</h1>
              <h4 class="state" ref="stateS">Close</h4>
              <h4>success</h4>
            </div>
            <div @click="SPSWControl(k, 'open')" class="con_o">&nbsp;&nbsp;open</div>
            <div @click="SPSWControl(k, 'close')" class="con_c">close&nbsp;&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUserList } from '@/API/userAPI.js'
import { getHardwareList, AGSWControl, SPSWControl, getWeatherByAPI } from '@/API/hardwareAPI.js'
export default {
  data: function () {
    return {
      AnaList: [],
      SpList: [],
      userLength: 0,
      hardwareLength: 0,
      videoShow: false,
      weather: 'Sun',
      temp: '26',
      hum: '30'
    }
  },
  mounted () {
    this.userLoad()
    this.hardwareLoad()
    // // let hardwareIP = "http://192.168.0.111"
    // const hardwareIP = 'http://192.168.0.200'
    // localStorage.setItem('hardwareIP', hardwareIP) // 储存函数
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
            this.$refs.weatherImgRef.style.background = 'url("https://img.gejiba.com/images/06456c33512859a79f10366344bfb51a.png") no-repeat 100% 100%/ contain'
            break
          case '晴':
            this.weather = 'Sun'
            this.$refs.weatherImgRef.style.background = 'url("https://img.gejiba.com/images/99ae4fde22fc8dbfe41937c67f28ae9d.png") no-repeat 100% 100%/ contain'
            break
          case '雨':
            this.weather = 'Rain'
            this.$refs.weatherImgRef.style.background = 'url("https://img.gejiba.com/images/23dd5ea25996a95a3733d97e362a4828.png") no-repeat 100% 100%/ contain'
            break
          case '雪':
            this.weather = 'Snow'
            this.$refs.weatherImgRef.style.background = 'url("https://img.gejiba.com/images/8a4683be857dc8481b4f242022266a57.png") no-repeat 100% 100%/ contain'
            break
        }
      }
    },
    async userLoad () {
      // 获取用户列表
      const { data: res } = await getUserList()
      this.userLength = res.data.length
    },
    async hardwareLoad () {
      // 获取硬件列表
      const { data: res } = await getHardwareList()
      this.hardwareLength = res.data.length
      let HardwareList = res.data
      // 过滤禁用的硬件
      HardwareList = HardwareList.filter(o => o.status)
      // 区分不同的硬件分类
      const pattern1 = /^AGSW/
      const pattern2 = /^SPSW/
      this.AnaList = HardwareList.filter((o) => pattern1.test(o.hardwareId))
      this.SpList = HardwareList.filter((o) => pattern2.test(o.hardwareId))
    },
    // 模拟引脚显示
    analogShow (k, ev) {
      const that = this
      const barIn = this.$refs.barBox[k].childNodes[0]
      const indicator = this.$refs.barBox[k].childNodes[1]
      // 模拟控制输入框改变
      barIn.onchange = function () {
        indicator.innerHTML = barIn.value + '%'
        that.AnaGet(k, 'pwm', barIn.value)
      }
      barIn.ontouchmove = function () {
        indicator.innerHTML = barIn.value + '%'
        that.AnaGet(k, 'pwm', barIn.value)
      }
    },
    // 模拟控制组件中的简单硬件控制
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
      // json = JSON.stringify(json)
      console.log(json, hIP, num)
      const { data: res } = await SPSWControl(hIP, num, json)
      console.log(res)
      this.$message.success(this.SpList[k].name + '操作成功')
    }
  }
}
</script>

<style lang="less">
/*控制页面*/
/*-------------------------------------------------------------*/
#model-content {
  width: 24%;
  height: 400px;
  max-width: 100%;
  position: fixed;
  top: 20%;
  right: 0%;
  // transform: translate(-50%, -20%);
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

.controlPage {
  width: 100%;
  height: 100%;
  padding: 1em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

/*头部数据*/
.headData {
  width: 100%;
  height: 20%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-left: 1.5em;
  position: relative;
}
.weatherImg {
  width: 11em;
  height: 11em;
  position: absolute;
  top: -4em;
  left: -4em;
  background: rgba(0, 0, 0, 0.1);
  background: url('https://img.gejiba.com/images/99ae4fde22fc8dbfe41937c67f28ae9d.png') no-repeat 100% 100%/ contain;
  // background-size: contain;
  z-index: 1;
  transition: transform 0.6s ease;
}
.weatherImg:hover {
  transform: scale(1.3) skewX(5deg);
}
/*数量及状态信息*/
.sysData {
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: 'youshe';
  color: rgba(51, 51, 51, 0.7);
}

.sysData h1 {
  font-size: 27px;
}

/*获取数据*/
.contentData {
  width: 40%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  z-index: 3;
}
.contentData div {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  font-family: 'youshe';
}
.contentData div h1 {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  font-family: 'youshe';
  font-size: 32px;
  color: rgba(51, 51, 51, 0.8);
}
.contentData div h1 p {
  font-size: 20px;
}
/*控制组件*/
.HWcontrol {
  width: 100%;
  height: 78%;
  box-shadow: var(--bgshadow2);
  border-radius: 25px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  padding: 1em 1.2em;
  overflow-y: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  .ANcontrol {
    width: 30%;
  }
  .SPcontrol {
    width: 30%;
  }
}
.HWcontrol::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.C_t {
  box-shadow: var(--bgshadow2);
  border-radius: 15px;
  padding: 0.5em;
  margin: 0 auto;
  margin-bottom: 0.9em;
  /*margin-right: 0.9em;*/
  background: rgba(255, 255, 255, 0.8);
  // margin-right: 2.2em;
}

.ct {
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-flow: row wrap;
  position: relative;
}

.open {
  width: 50%;
  height: 96px;
  box-shadow: 2px 6px 20px 5px rgba(211, 215, 212, 0.6);
  border-radius: 13px;
  position: relative;
}

.situation {
  width: 100%;
  height: 100%;
  color: rgba(51, 51, 51, 0.8);
  position: absolute;
  padding: 0.5em;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
}

.situation h1 {
  font-size: 18px;
}

.switch {
  width: 45%;
  height: 98px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  color: rgba(0, 139, 139, 0.5);
  text-align: center;
  line-height: 43px;
}

.o_n {
  width: 96%;
  height: 45%;
  border-radius: 7px 12px 7px 7px;
  background-color: rgba(251, 229, 235, 0.5);
  cursor: pointer;
}

.o_ff {
  width: 96%;
  height: 45%;
  border-radius: 7px 7px 15px 7px;
  background-color: rgba(231, 238, 238, 0.5);
  /*background-image: linear-gradient(180deg, rgba(228, 200, 196, 0.7) 0%, rgba(181, 255, 252, 0.7) 100%);*/
  cursor: pointer;
}

/*模拟调整框*/
.bar {
  height: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.bar-input {
  appearance: none;
  width: 96%;
  border-radius: 10px;
  background: rgba(51, 51, 51, 0.2);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

.ind {
  width: 30.5%;
  margin: 0 auto;
  transform: translateY(27px);
  text-align: center;
  font-size: 15px;
  color: rgba(51, 51, 51, 0.6);
  background: var(--bgcolor);
  box-shadow: var(--bgshadow1);
  padding: 0.1em;
  border-radius: 9px;
}

/*简单控制开始*/
/*-----------------------------------------------------------*/
.ct_sp {
  width: 100%;
  box-shadow: var(--bgshadow2);
  border-radius: 15px;
  padding: 0.5em;
  margin-bottom: 0.9em;
  background: rgba(255, 255, 255, 0.8);
  margin-right: 2.2em;
}

.con_open {
  width: 100%;
  height: 9em;
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.9);
  border-radius: 13px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.con_situation {
  width: 100%;
  height: 70%;
  position: absolute;
  text-align: center;
  z-index: 5;
  color: rgba(51, 51, 51, 0.8);
  top: 0;
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.09);
  border-radius: 15px 15px 10px 10px;
  padding: 0.4em;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
}

.con_situation h1 {
  font-size: 25px;
}

.con_o {
  width: 49%;
  height: 40%;
  background-color: rgba(255, 222, 233, 0.2);
  background-image: linear-gradient(0deg, rgba(255, 222, 233, 0.1) 0%, rgba(181, 208, 207, 0.3) 100%);

  border-radius: 12px 7px 5px 12px;
  /*clip-path: polygon(0% 0%, 50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%);*/
  z-index: 2;
  cursor: pointer;
  padding-top: 1em;
}

.con_c {
  width: 49%;
  height: 40%;
  background-color: rgba(255, 222, 233, 0.2);
  background-image: linear-gradient(0deg, rgba(255, 222, 233, 0.1) 0%, rgba(181, 208, 207, 0.3) 100%);

  border-radius: 5px 12px 12px 5px;
  /*clip-path: polygon(0% 50%, 50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%);*/
  text-align: right;
  z-index: 2;
  cursor: pointer;
  padding-top: 1em;
}
</style>
