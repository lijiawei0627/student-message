<template>
  <div class="register">
    <header class="title">学生信息在线后台管理系统</header>
    <div class="wrapper">
      <el-form :model="registerForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerForm.email" auto-complete="off" placeholder="请输入email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="registerForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="学生" value="员工"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    var repassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        registerForm: {
          name: '',
          email: '',
          password: '',
          checkPass: '',
          identity: ''
        },
        rules: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 0, max: 10, message: '长度在 3 到 10 之间', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不正确', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 9, max: 30, message: '长度在 9 到 30 之间', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, trigger: 'blur', validator: repassword},
            { min: 9, max: 30, message: '长度在 9 到 30 之间', trigger: 'blur' }
          ],
          identity: [
            { required: true, message: '请选择你的身份', trigger: 'blur' }
          ]
        }
      };
    },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('api/users/register', this.registerForm)
              .then(res => {
                const data = res.data;
                if (data.success) {
                  this.$message({
                    message: data.msg,
                    type: 'success'
                  })
                  this.$router.push('/login')
                } else {
                  this.$message({
                    type: 'warning',
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
  height: 400px;
  margin: 0 auto;
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #ccc;
}
</style>
