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
