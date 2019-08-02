<template>
  <el-row class="HeadNav">
    <el-col :span="12" class="left">
      <img src="../assets/logo.jpg" alt="">
      <p>学生信息在线后台管理系统</p>  
    </el-col>
    <el-col :span="12" class="right">
      <el-dropdown @command="handleCommand" class="menu" trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="message">个人信息</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="welcome">
        <div>欢迎</div>
        <div class="name">{{user.name}}</div>
      </div>
      <img :src="this.user.avatar" alt="">
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'HeadNav',
  methods: {
    handleCommand(command) {
        this.$message('click on item ' + command);
        console.log(this.user)
      }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.HeadNav {
  width: 100%;
  height: 71px;
  background-color: #042f4b;
}
.HeadNav img {
  width: 60px;
  height: 60px;
  margin: 5px 10px;
  border-radius: 50%;
  float: left;
}
.HeadNav .left p {
  height: 71px;
  line-height: 71px;
  float: left;
  color:#fff;
  font-size: 16px;
  font-weight: bold;
}
.HeadNav .right .menu {
  float: right;
  margin: 0 10px;
  height: 71px;
  line-height: 71px;
}
.HeadNav .right .menu span{
  color: #fff;
}
.HeadNav .right .welcome {
  float: right;
  color: #fff;
  height: 71px;
  margin: 15px 0px;
}
.HeadNav .right .welcome .name {
  color: #409eff;
}
.HeadNav .right .welcome div{
  width: 60px;
  height: 20px;
  line-height: 20px;
}
.HeadNav .right img {
  float: right;
  width: 40px;
  height: 40px;
  margin: 15px 0px;
}
</style>
