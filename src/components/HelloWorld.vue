<template>
  <div>
    
    <div>自定义input</div>
    <hr>
    <Form :model="model" :rules="rules" ref="myForm">
      <FormItem label="用户名" prop="username">
        <Input v-model="model.username" />
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="model.password" type="password" placeholder="输入密码" />
      </FormItem>
      <FormItem>
        <el-button type="primary" @click="submitForm('myForm')">提交</el-button>
      </FormItem>
    </Form>
    <h3>Element表单</h3>
    <hr>
    <el-form :model="model" :rules="rules" ref="loginForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Input from './Input'
import FormItem from './FormItem'
import Form from './Form'
export default {
  components: {
    Input,
    FormItem,
    Form
  },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('valid')
        } else {
          console.log('not valid')
          return false
        }
      })
    }
  }
}
</script>
