<template>
  <div class="register">
    <header class="title">学生信息在线后台管理系统</header>
    <div class="wrapper">
      <el-form :model="registerForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerForm.email" auto-complete="off" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <p>还没有账号?<router-link to="/">现在注册</router-link></p>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'Register',
  data() {
    return {
        registerForm: {
          email: '',
          password: ''
        },
        rules: {
          email: [
            { required: true, message: '邮箱不正确', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 9, max: 30, message: '长度在 9 到 30 之间', trigger: 'blur' }
          ]
        }
      };
    },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('api/users/login', this.registerForm)
              .then(res => {
                const data = res.data;
                if (data.success) {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  const {token} = data
                  const decode = jwtDecode(token);
                  localStorage.setItem('Token', token);
                  this.$store.dispatch('setAuthenticated', !this.isEmpty(decode));
                  this.$store.dispatch('setUser', decode)
                  this.$router.push('/home')
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
            })
            .catch((err) => {
              console.log(err)
            })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      isEmpty (value) {
        return (value === undefined || value === null ||
         (typeof value === 'object' && Object.keys(value).length === 0) ||
         (typeof value === 'string' && value.trim().length ===0))
      }
    }

}
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  background: url('../assets/timg.jpg') no-repeat;
  background-size: cover;
}
.register .title {
  color: #ffffff;
  width: 312px;
  height: 35px;
  font-family: 'Microsoft YaHei';
  font-weight: bold;
  font-size: 26px;
  margin: 0 auto;
  padding-top: 90px;
}
.register .wrapper {
  width: 320px;
  height: 240px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
.register .wrapper p {
  float: right;
  margin-top: 25px;
}
</style>
