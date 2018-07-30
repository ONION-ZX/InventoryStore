<template>
  <div>
    <Nav/>
    <div class="header">
      <div class="container por">
        <form @submit="submit" class="main-form" autocomplete="off">
          <h1>注册</h1>
          <div class="row tac tab-title">
            <div @click="signup_by = 'phone'" :class="'col-lg-6 ' + (signup_by == 'phone' ? 'active': '')">手机注册</div>
            <div @click="signup_by = 'mail'" :class="'col-lg-6 ' + (signup_by == 'mail' ? 'active': '')">邮箱注册</div>
          </div>
          <!--<div class="error-list">-->
          <!--<div class="error">用户名或密码有误</div>-->
          <!--</div>-->
          <div v-if="signup_by == 'phone'" class="input-control">
            <label for="phone">手机号</label>
            <input v-model="current.phone"
                   v-validator="'required|cellphone|not_exist:user,phone'"
                   error-el="#phone-error"
                   id="phone"
                   type="text"
                   placeholder="whh">
            <div class="error-list">
              <div id="phone-error"></div>
            </div>
          </div>
          <div v-if="signup_by == 'mail'" class="input-control">
            <label for="mail">邮箱</label>
            <input v-model="current.mail"
                   v-validator="'required|mail|not_exist:user,mail'"
                   error-el="#mail-error"
                   id="mail"
                   :key="'mail'"
                   type="text"
                   placeholder="whh">
            <div class="error-list">
              <div id="mail-error"></div>
            </div>
          </div>
          <div class="input-control">
            <label for="vcode">验证码</label>
            <div class="btn-group">
              <input style="width: 70%;"
                     id="vcode"
                     v-validator="'required'"
                     error-el="#vcode-error"
                     v-model="current.vcode"
                     type="text"
                     placeholder="whh">
              <button @click="send_code" style="width: 30%;" type="button" :disabled="captcha.countdown != 0">
                <span v-if="captcha.countdown">{{captcha.countdown}}</span>
                <span v-else>发送验证码</span>
              </button>
            </div>
            <div class="error-list">
              <div class="error" v-if="invalid_code">验证码有误</div>
              <div id="vcode-error"></div>
            </div>
          </div>
          <div class="input-control">
            <label for="password">密码</label>
            <input v-model="current.password"
                   v-validator="'required|min_length:6|max_length:64'"
                   error-el="#password-error"
                   id="password"
                   type="password">
            <div class="error-list">
              <div id="password-error"></div>
            </div>
          </div>
          <div class="input-control">
            <label for="password2">重复密码</label>
            <input v-model="current.password2"
                   v-validator="'required|shadow:#password'"
                   id="password2"
                   type="password">
          </div>
          <div class="input-control">
            <button class="btn-primary" type="submit">注册</button>
          </div>
          <div class="input-control small muted">
            已有账号？<a href="#/login">登录</a>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import '../css/single-form.css';
  import Nav     from '../component/Nav';
  import Footer  from '../component/Footer';
  import api     from '../lib/api';
  import session from '../lib/session';

  export default {
    // directives : { validator },
    components : { Nav, Footer },
    data () {
      return {
        captcha      : {
          timer     : null,
          countdown : 0,
        },
        signup_by    : 'phone',
        current      : {},
        code         : '',
        invalid_code : false,
      };
    },

    methods : {
      submit (e) {
        e.preventDefault();
        this.invalid_code = this.current.vcode !== this.code;

        if (this.invalid_code)
          return;

        if (this.signup_by == 'mail')
          delete this.current.phone;
        else
          delete this.current.mail;

        // 如果没有用户名，就默认用已填的邮箱或手机号作为用户名
        !this.current.username && (this.current.username = this.current[ this.signup_by ]);

        api('user/create', this.current)
          .then(r => {
            session.login(r.data);
            alert('注册成功!');
            this.$router.push('/');
          });
      },

      send_code () {
        if (this.captcha.countdown)
          return;

        let action
          , by_mail;

        this.captcha.countdown = 60;

        action = 'sms';

        if (by_mail = this.signup_by == 'mail')
          action = 'mail';

        if ((by_mail && !this.current.mail) ||
          (!by_mail && !this.current.phone))
          return;

        this.captcha.timer = setInterval(() => {
          if (this.captcha.countdown == 0) {
            clearInterval(this.captcha.timer);
            return;
          }

          this.$set(this.captcha, 'countdown', this.captcha.countdown - 1);
        }, 1000);

        api(`captcha/${action}`, { phone : this.current.phone, mail : this.current.mail })
          .then(r => {
            this.code = atob(r.data.result);
          });
      },
    },
  };
</script>

<style scoped>
  .main-form {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  .footer {
    margin-top: 20px;
  }

  .tab-title {
    color: #777;
    margin-bottom: 10px;
  }

  .tab-title > * {
    cursor: pointer;
    padding: 5px;
  }

  .tab-title > *.active {
    color: #fd521d;
    border-bottom: 2px solid #fd521d;
  }
</style>
