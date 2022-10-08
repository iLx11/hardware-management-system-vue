import Vue from 'vue'
import { Button, Message, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


