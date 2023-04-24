import request from '@/utils/request.js'

// 获取硬件列表
export const getHardwareList = () => {
  return request.get('/hardwares')
}

// 添加硬件
export const postNewHardware = (name, id, port) => {
  return request.post('/hardwares', {
    name: name,
    hardwareId: id,
    hardwarePort: port
  })
}

// 删除硬件
export const deleteHardwareById = (id) => {
  return request.delete(
    '/hardwares/' + id
  )
}

// 更改硬件状态
export const putChangeHardwareStatus = (id, status) => {
  return request.put(
    '/hardwares/' + id, {
      status: status === true ? 0 : 1
    }
  )
}

// 修改硬件
export const putChangeHardware = (id, name, hardwareId, hardwarePort) => {
  return request.put('/hardwares', {
    id,
    name,
    hardwareId,
    hardwarePort
  })
}

// 模拟控制
export const AGSWControl = (hIP, num, hardwarePort, instruction, pwm) => {
  return request.get(hIP + '/agswcontrol' + num, {
    params: {
      // name: this.AnaList[k].name,
      // hardwareId: this.AnaList[k].hardwareId,
      hardwarePort,
      instruction,
      pwm
    }
  })
}

// 简单控制
export const SPSWControl = (hIP, num, json) => {
  return request.get(hIP + '/spswcontrol' + num, {
    params: {
      // name: this.SpList[k].name,
      // hardwareId: this.SpList[k].hardwareId,
      jsonData: JSON.stringify(json)
    }
  })
}

// 陀螺仪控制
export const gyrocopeControl = (hIP, alpha, beta) => {
  return request.get(hIP + '/gyrocopecontrol', {
    params: {
      alpha,
      beta
    }
  })
}

// 获取天气
export const getWeatherByAPI = () => {
  return request.get('https://devapi.qweather.com/v7/weather/now?key=7d245d09fd5c4723a8f1c16379c3c57c&location=101300112')
}

// 发送数据到MQTT服务器
export const sendToMQTT = (hIP) => {
  return request.get(hIP + '/htData')
}
