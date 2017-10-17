<style scoped>
    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 150px;
        padding-bottom: 200px;
        background: #dfe0e2 url('../../assets/pattern.jpg') repeat
    }
    .wrapper > h1,p{
      text-align: center;
      vertical-align: middle;
      margin-bottom: 10px;
    }
    .login {
        margin: 0 auto;
        width: 350px;
        height: 100%;
    }
    .login-box {
        padding: 20px;
        border: 1px #ccc solid;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.12);
        background: #FFF;
    }
    .font-green-color {
        color: #249b2a;
    }

    .captcha {
        border-radius: 5px;
    }
</style>

<template>
    <div class="wrapper">
        <h1 class="font-green-color">德美店务管理后台</h1>
        <p>让每一个家庭拥有健康、快乐、美丽！</p>
        <div class="login">
            <div class="login-box">
                <i-form ref="formInline" :model="formInline" :rules="ruleInline" style="padding-top:10px">
                    <Form-item prop="user">
                        <Input v-model="formInline.user" size="large" icon="person" placeholder="管理员账号..."></Input>
                    </Form-item>
                    <Form-item prop="password">
                        <Input v-model="formInline.password" type="password" size="large" icon="key" placeholder="输入密码..."></Input>
                    </Form-item>
                    <Row>
                        <Col span="11">
                            <Form-item prop="captcha">
                                <Input v-model="formInline.captcha" size="large" placeholder="输入验证码..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="8" offset="1">
                            <Form-item>
                                <img :src="src" alt="验证码" class = "captcha" @click="getCaptcha()">
                            </Form-item>
                        </Col>
                    </Row>
                    <Form-item>
                        <i-button type="success" @click.native="handleSubmit('formInline')" long size="large">
                        登&emsp;&emsp;录
                        </i-button>
                    </Form-item>
                </i-form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
            return {
                src: "",
                the_src: process.env.API_ROOT + '/admin/captcha',
                formInline: {
                    user: '',
                    password: '',
                    captcha:''
                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请填写密码',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 6,
                        message: '密码长度不能小于6位',
                        trigger: 'blur'
                    }],
                    captcha:[{
                        required: true,
                        message: '请填验证码',
                        trigger: 'blur'
                    }]
                }
            }
        },

        created() {
            this.getCaptcha()
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('loginAction', this.formInline).then(() => {
                          // 登录成功
                          this.$store.dispatch('getNodeAction')
                          this.$router.push('/')
                        })
                    } else {
                        this.$Message.error('表单验证错误!')
                    }
                })
            },
            getCaptcha() {
                this.src = process.env.API_ROOT + '/admin/captcha' + "?r=" + Math.random();
            }
        }
}

</script>
