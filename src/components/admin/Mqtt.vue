<template>
  <div class="mqttMess">
    <div class="mHeader">
      <h4>MQTT Message</h4>
    </div>
    <div class="mMessage">
      <div class="mqtt_mes">
        <div class="messBox">
          <div class="from"><span>from</span></div>
          <div class="mes"><span>Message</span></div>
        </div>
        <div
            :key="v.id"
            v-for="v in messBox"
            :class="{ messBox: true,messRight: v.reverse }"
          >
            <div class="from">
              <span>{{ v.topic }}</span>
            </div>
            <div class="mes">
              <span>{{ v.message }}</span>
            </div>
          </div>
      </div>
    </div>
    <section>
      <div class="MQTTcontent" @click="testConnect">
        <div class="mqttBody">
          <div class="mqtt_trans">
            <div class="mqtt_t">
              <div class="mqtt_pub">
                <input
                  v-model.trim="pubTopic"
                  type="text"
                  name=""
                  class="m_pub"
                  placeholder="pub_主题"
                  id="pub_topic"
                />
                <input
                  v-model.trim="pubContent"
                  type="text"
                  name=""
                  class="m_pub"
                  placeholder="pub_内容"
                  id="pub_content"
                />
              </div>
              <div class="mqtt_send">SEND</div>
            </div>
            <div class="fenge"></div>
            <div class="mqtt_sub">
              <input
                v-model.trim="subTopic"
                type="text"
                name=""
                placeholder="sub_主题"
                id="sub_topic"
              />
              <div class="mqtt_s_send">
                <div class="mqtt_s" id="sub_t">SUB</div>
                <div class="mqtt_s" id="unsub_t">UNSUB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      pubTopic: '',
      pubContent: '',
      subTopic: '',
      MQTTAdress: '',
      MQTTStatus: false,
      MQTTClient: '',
      messBox: []
    }
  },
  methods: {
    testConnect () {
      const that = this
      if (this.MQTTStatus == true) {
        document.querySelector('.mqtt_send').onclick = function () {
          that.topicPub()
        }
        document.querySelector('#sub_t').onclick = function () {
          that.topicSub()
        }
        document.querySelector('#unsub_t').onclick = function () {
          that.unsubTopic()
        }
      } else {
        this.$message.warning('MQTT服务器未连接')
      }
    },
    topicPub () {
      if (this.pubTopic !== null && this.pubContent !== null) {
        this.MQTTClient.publish(this.pubTopic, this.pubContent)
        // 添加会话消息
        this.messBox.push({
          topic: this.pubTopic,
          message: this.pubContent,
          reverse: true
        })
        this.$message.success('发布成功')
      } else {
        this.$message.warning('发布主题和内容不能为空')
      }
    },
    topicSub () {
      const that = this
      if (this.subTopic != null && this.subTopic != '') {
        this.MQTTClient.subscribe(this.subTopic, (err) => {
          if (!err) {
            this.$message.success('订阅成功')
            // 处理消息
            this.MQTTClient.on('message', function (topic, message) {
              // 打印会话消息
              that.messBox.push({
                topic: topic,
                message: message,
                reverse: false
              })
              document.querySelector('.mMessage').scrollTop += 600
              document.querySelector('.mqtt_mes').scrollTop += 600
            })
          } else {
            this.$message.error('订阅失败')
          }
        })
      } else {
        this.$message.warning('订阅的主题不能为空')
      }
    },
    unsubTopic () {
      if (this.subTopic != null && this.subTopic != '') {
        this.MQTTClient.unsubscribe(this.subTopic, (err) => {
          if (!err) {
            this.$message.success('取消订阅成功')
          }
        })
      } else {
        this.$message.warning('主题不能为空')
      }
    }
  }
}
</script>

<style lang="less">
.mqttMess {
  width: 25%;
  height: 100%;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow1);
  border-radius: 25px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  /*align-items: center;*/
}
/*mqtt_m开始*/
/*-----------------------------------------------------------*/
.mHeader {
  width: 100%;
  height: 15%;
  padding: 1em;
  font-size: 25px;
  font-family: "youshe";
  color: rgba(51, 51, 51, 0.8);
}

.mMessage {
  width: 100%;
  height: 45%;
  z-index: 6;
}

.mqtt_mes {
  width: 100%;
  height: 100%;
  background: rgba(243, 246, 253, 1);
  border-radius: 0 0 7px 7px;
  box-shadow: insert var(--bgshadow1);
  overflow: scroll;
  font-size: 18px;
}
/*MQTT消息*/
.messBox {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 0.7em;
  margin-bottom: 0.7em;
  /*flex-direction: row-reverse;*/
}
.messRight {
  flex-direction: row-reverse;
}
.messBox .from {
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow2);
  margin-left: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.messBox .from span {
  font-size: 9px;
  text-align: center;
  word-wrap: break-word;
}
.messBox .mes {
  width: 8em;
  height: auto;
  border-radius: 9px;
  margin-left: 0.8em;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow2);
  text-align: center;
  padding: 0.3em 0.3em;
  margin-top: 0.5em;
  word-wrap: break-word;
}
.messBox .mes span {
  font-size: 15px;
  color: rgba(51, 51, 51, 0.8);
}

.mqttBody {
  width: auto;
  height: 100%;
  box-shadow: var(--bgshadow2);
  border-radius: 0 0 18px 18px;
  padding: 0.5em 0.3em;
  margin: 0 auto;
  margin-bottom: 0.9em;
  /*margin-right: 0.9em;*/
  background: rgba(255, 255, 255, 1);
}

.MQTTcontent {
  width: 100%;
  height: 100%;
}

.mqtt_trans {
  width: 100%;
  height: 11em;
}

.mqtt_t {
  z-index: 5;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}

.mqtt_pub {
  width: 64%;
  height: 3em;
  /*background: rgba(233, 194, 191, 1.8);*/
  margin: 0 auto;
}

.mqtt_send {
  width: 32%;
  height: 5em;
  background: rgba(233, 194, 191, 0.2);
  border-radius: 10px;
  text-align: center;
  line-height: 5em;
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.9);
  color: rgba(51, 51, 51, 0.8);
  cursor: pointer;
}

.mqtt_send:active {
  transform: scale(0.97);
  box-shadow: 4px 4px 20px 3px rgba(111, 109, 133, 0.5);
}

.m_pub {
  width: 97%;
  border: none;
  height: 2.5em;
  background: rgba(0, 139, 139, 0.06);
  box-shadow: 0 0 0 1.5px rgba(211, 215, 212, 1);
  border-radius: 6px;
  text-align: center;
  margin-bottom: 1em;
}

.mqtt_sub {
  width: 100%;
  height: 2em;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}

.mqtt_sub input {
  width: 96%;
  border: none;
  height: 2.7em;
  background-color: rgba(231, 238, 238, 0.7);
  box-shadow: 0 0 0 1.5px rgba(211, 215, 212, 1);
  border-radius: 6px;
  text-align: center;
  margin-top: 1em;
}

.mqtt_s_send {
  width: 100%;
  height: 1.5em;
  display: flex;
  justify-content: space-around;
}

.mqtt_s {
  width: 45%;
  height: 100%;
  background: rgba(233, 194, 191, 0.2);
  box-shadow: 2px 6px 15px 1px rgba(211, 215, 212, 0.9);
  border-radius: 8px;
  margin-top: 0.6em;
  text-align: center;
  cursor: pointer;
  color: rgba(51, 51, 51, 0.8);
}

.mqtt_s:active {
  transform: scale(0.97);
  box-shadow: 4px 4px 20px 3px rgba(111, 109, 133, 0.5);
}

.fenge {
  width: 100%;
  height: 2px;
  background: rgba(233, 194, 191, 0.4);
  margin-top: 1em;
}
</style>
