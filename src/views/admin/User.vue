<template>
  <section class="userPage">
    <div class="userHeader">
      <h1>User Page</h1>
    </div>
    <div class="userListContent">
      <ul class="user_list">
        <li>
          <div class="userList-header">
            <div>
              <h5>ID:</h5>
            </div>
            <div>
              <h5>用户:</h5>
            </div>
            <div>
              <h5>登录状态:</h5>
            </div>
            <div>
              <h5>是否管理员:</h5>
            </div>
          </div>
        </li>
        <li :key="v.id" v-for="(v, k) in userList">
          <div class="user-list-content">
            <div class="user_data">
              <div>
                {{ v.id }}
              </div>
              <div>
                <p>{{ v.name }}</p>
              </div>
              <div>
                <p v-if="v.status">已登录</p>
                <p v-if="!v.status">未登录</p>
              </div>
              <div>
                <p v-if="v.mana">是</p>
                <p v-if="!v.mana">否</p>
              </div>
              |
            </div>
            <div class="mana_c">
              <svg @click="changeMana(k)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjiayonghu"></use></svg
              >&nbsp;&nbsp;
              <svg @click="delUser(k)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-shanchuyonghu"></use>
              </svg>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { md5 } from '../../assets/js/md5.js'
import { deleteUserById, getUserList, postChangeUser } from '@/API/userAPI.js'

export default {
  data: function () {
    return {
      userList: []
    }
  },
  mounted () {
    this.userLoad()
  },
  methods: {
    // 加载完成后执行（导入列表）
    async userLoad () {
      const { data: res } = await getUserList()
      this.userList = res.data
    },
    // 删除用户
    delUser (k) {
      const that = this
      this.$confirm('确定要删除此用户吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async () => {
          const { data: res } = await deleteUserById(that.userList[k].id)
          if (res.code === 10021) {
            that.userLoad()
            that.$message.success('删除成功')
          } else {
            that.$message.info('删除失败')
          }
        })
        .catch(() => {
          that.$message.info('取消删除')
        })
    },
    changeMana (k) {
      const that = this
      this.$confirm('您确定要更改此用户的管理员权限吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          that.userList[k].mana == true
            ? that.changeUser(1, 0, that.userList[k].name)
            : that.changeUser(1, 1, that.userList[k].name)
          console.log(this.userList[k].mana)
        })
        .catch(() => {
          that.$message.info('取消更改')
        })
    },
    async changeUser (method = null, value = null, name = null) {
      console.log(value + '---------' + name)
      if (method === 4) {
        value = md5(value)
      }
      const { data: res } = await postChangeUser(method, value, name)
      if (res.data === true) {
        this.$message.success('修改成功')
        this.userLoad()
        // load
        if (method === 3) {
          this.current_user = value
        }
      }
    }
  }
}
</script>

<style lang="less">
/*用户及硬件列表*/
/*---------------------------------------------------*/
.userPage,
.hardwarePage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
}
.userHeader,
.hardwareHeader {
  width: 100%;
  height: 16%;
  font-size: 25px;
  font-family: "youshe";
  color: rgba(51, 51, 51, 0.7);
}
.hardwareHeader {
  display: flex;
  justify-content: space-between;
  /*align-items: center;*/
}
.hardwareAdd {
  width: 30%;
  cursor: pointer;
}
.userListContent,
.hardwareListContent {
  width: 100%;
  height: 80%;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow2);
  border-radius: 25px;
  padding: 0.7em;
  font-family: "youshe";
  color: rgba(51, 51, 51, 0.7);
  position: relative;
  overflow-y: scroll;
}
.user_list,
.hardware_list {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 3.6em;
}
.user_list li,
.hardware_list li {
  width: 100%;
  height: 3em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow2);
  margin-bottom: 0.7em;
  border-radius: 12px;
}
.user-list-content,
.hardware-list-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}
.user-list-content div,
.hardware-list-content div {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.user-list-content .user_data,
.hardware-list-content .hardware_data {
  width: 74%;
  height: 100%;
}
.user_data div,
.hardware_data div {
  width: 5em;
  height: 100%;
  /*border: 1px solid rgba(0, 0, 0, 0.1);*/
}
.user_data div:nth-child(1),
.hardware_data div:nth-child(1) {
  width: 2em;
  height: 100%;
  /*border: 1px solid rgba(0, 0, 0, 0.1);*/
}
.user-list-content .mana_c,
.hardware-list-content .mana_c {
  width: 19%;
  height: 100%;
  cursor: pointer;
  /*border: 1px solid rgba(0, 0, 0, 0.1);*/
}

.hardList-header,
.userList-header {
  width: 73%;
  height: 3em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.userList-header {
  width: 70%;
}
.hardware_list li:nth-child(1),
.user_list li:nth-child(1) {
  width: 98%;
  background: rgba(182, 208, 207, 0.5);
  position: absolute;
  top: 3px;
}
</style>
