<template>
  <div class='login-container'>
    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="myform" :model='user'>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号">
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
          v-model="user.code"
          placeholder="请输入验证码">
          </el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条框</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="hLogin" :loading='loginLoading'>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin }from '../../api/user.js'
import {setUser } from '../../utils/storage.js'
export default {
    name: 'LoginIndex',
    components:{},
    props: { },
    data () {
        return { 
          rules:{
            mobile:[
              {required:true,message:'必须要输入手机号',trigger:'change'},
              {pattern:/^1[35789]\d{9}$/,message:'手机号格式不对',trigger:'change'}
           ],
           code:[
             {required:true,message:'必须要输入验证码',trigger:'change'},
             {pattern:/^\d{6}$/,message:'验证码格式不对',trigger:'change'}
           ],
           agree:[
             {//value:表示当前值
             //验证通过：直接写callback()
             //验证不通过：callback(new Error('错误信息))
             validator:(rule,value,callback)=>{
               if (value) {
                  callback()
               }else {
                 callback(new Error('请同意用户协议'))
               }
             },
             trigger :'change'
             }
           ]
          },
          user:{
            mobile:'13911111111',//手机号
            code:'246810',//验证码,
            agree:false
          },
          loginLoading:false
        }
    },
    methods:{
      // login(){
      //   this.loginLoading = true
      //  userLogin(this.user.mobile,this.user.code
      //  ).then(res=>{
      //     this.$message({
      //       message:'登录成功',
      //       type:'success'
      //     })
      //     this.loginLoading = false
      //     setUser(res.data.data)
      //     this.$router.push('/')
      //   }).catch(err=>{
      //     this.$message.error('登录失败,手机号或验证码错误')
      //     this.loginLoading = false
      //   })
      // },
      async login(){
        this.loginloading = false
        try {
          const result = await userLogin(this.user.mobile,this.user.code)
          this.$message({
            message:'登录成功',
            type:'success'
          })
          this.loginLoading = false
          setUser(res.data.data)
          this.$router.push('/')
        }catch {
          this.$message.error('登录失败，手机号或验证码错误')
          this.loginLoading = false
        }
      },
      hLogin(){
        this.$refs.myform.validate(vaild=>{
          if(vaild){
            this.login()
          }
        })
      }
    },
    computed: { },
    created () { },
    mounted () { }
}
</script>

<style scoped lang='less'>
//铺满整屏
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:  no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background:  no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>