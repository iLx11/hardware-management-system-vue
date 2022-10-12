<template>
  <section class="kalada_m_m">
    <section>
      <div class="content">
        <div class="C_t">
          <div class="ct">
            <div class="mqtt_mes">
              <div class="messBox">
                <div class="from"><span>from</span></div>
                <div class="mes"><span>Message</span></div>
              </div>
              <div
                :key="v.id"
                v-for="v in messBox"
                :class="{ messBox: true, messRight: v.reverse }"
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
        </div>
      </div>
      <div class="content" @click="testConnect">
        <div class="C_t">
          <div class="ct">
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
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      pubTopic: "",
      pubContent: "",
      subTopic: "",
      messBox: [],
    }
  },
  methods: {
    testConnect() {
      let that = this
      if (this.$parent.MQTTStatus == true) {
        document.querySelector(".mqtt_send").onclick = function () {
          that.topicPub()
        }
        document.querySelector("#sub_t").onclick = function () {
          that.topicSub()
        }
        document.querySelector("#unsub_t").onclick = function () {
          that.unsubTopic()
        }
      } else {
        this.$message.warning("MQTT服务器未连接")
      }
    },
    topicPub() {
      if (this.pubTopic !== null && this.pubContent !== null) {
        mqttClient.publish(this.pubTopic, this.pubContent)
        //添加会话消息
        this.messBox.push({
          topic: topic,
          message: content,
          reverse: true,
        })
        this.$message.success("发布成功")
      } else {
        this.$$message.warning("发布主题和内容不能为空")
      }
    },
    topicSub() {
      if (this.subTopic != null && this.subTopic != null) {
        mqttClient.subscribe(this.subTopic, function (err) {
          if (!err) {
            this.$message.success("订阅成功")
            //处理消息
            mqttClient.on("message", function (topic, message) {
              // 打印会话消息
              this.messBox.push({
                topic: topic,
                message: content,
                reverse: false,
              })
              document.querySelector(".mMessage").scrollTop += 600
              document.querySelector(".mqtt_mes").scrollTop += 600
            })
          } else {
            this.$message.error("订阅失败")
          }
        })
      } else {
        this.$message.warning("订阅的主题不能为空")
      }
    },
    unsubTopic() {
      if (this.subTopic != null && this.subTopic != "") {
        mqttClient.unsubscribe(this.subTopic, (err) => {
          if (!err) {
            this.$message.success("取消订阅成功")
          }
        })
      } else {
        this.$message.warning("主题不能为空")
      }
    },
  },
}
</script>

<style lang="less" scoped>
@bgcolor: rgba(255, 255, 255, 0.17);
@bgcolor-1: rgba(231, 238, 238, 0.6);
@bgshadow1: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
@bgshadow2: 3px 4px 12px 3px rgba(111, 109, 133, 0.13);
@font-color-1: rgba(76, 173, 174, 0.9);
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
.mqtt_trans {
  width: 100%;
  height: 13.5em;
  position: relative;
  /*box-shadow: 0 0 0 2px darkgrey;*/
}

.mqtt_t {
  z-index: 5;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
}

.mqtt_pub {
  width: 64%;
  height: 5em;
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
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.2);
}

.mqtt_send:active {
  transform: scale(0.97);
  box-shadow: 4px 4px 20px 3px rgba(111, 109, 133, 0.5);
}

.m_pub {
  width: 97%;
  border: none;
  height: 2.7em;
  background: @bgcolor-1;
  box-shadow: 0 0 0 1.5px rgba(211, 215, 212, 1);
  border-radius: 6px;
  text-align: center;
  /*line-height: 2.7em;*/
  margin-bottom: 1em;
}

.mqtt_sub {
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}

.mqtt_sub input {
  width: 96%;
  border: none;
  height: 2.7em;
  background-color: @bgcolor-1;
  box-shadow: 0 0 0 1.5px rgba(211, 215, 212, 1);
  border-radius: 6px;
  text-align: center;
  margin-top: 1em;
}

.mqtt_s_send {
  width: 100%;
  height: 4em;
  display: flex;
  justify-content: space-around;
}

.mqtt_s {
  width: 45%;
  height: 3em;
  background: rgba(233, 194, 191, 0.2);
  box-shadow: 3px 4px 12px 3px rgba(111, 109, 133, 0.16);
  border-radius: 10px;
  margin-top: 1em;
  text-align: center;
  line-height: 3em;
  cursor: pointer;
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

.mqtt_mes {
  width: 100%;
  height: 10em;
  background: rgba(243, 246, 253, 1);
  border-radius: 0 0 7px 7px;
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
  background: @bgcolor;
  box-shadow: @bgshadow2;
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
  background: @bgcolor;
  box-shadow: @bgshadow2;
  text-align: center;
  padding: 0.3em 0.3em;
  margin-top: 0.5em;
  word-wrap: break-word;
}
.messBox .mes span {
  font-size: 15px;
  color: rgba(51, 51, 51, 0.8);
}
</style>