<template>
  <div>
    <div class="title">
      <span>gorev</span>
    </div>
    <div class="cont">
      <div class="card">
        <div class="card-body" v-show="!sp">
          <h5 class="card-title">Have an account?</h5>
          <h6 class="card-subtitle mb-2 text-muted">Sign in</h6>

          <div v-show="invalid" class="alert alert-danger" role="alert">
            Invalid credentials.
          </div>

          <form @submit.prevent="signin">
            <div class="input-group mb-3">
              <input type="text" v-model="usernameSignin" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <input type="password" v-model="passwordSignin" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <button class="form-control btn btn-outline-primary" type="submit">Sign in</button>
              <button class="form-control btn btn-outline-primary" @click="signup">Sign up</button>
            </div>
          </form>
        </div>

        <div class="card-body" v-show="sp">
          <h5 class="card-title">Create account</h5>

          <div v-show="invalid2" class="alert alert-danger" role="alert">
            Invalid credentials.
          </div>

          <form @submit.prevent="signupForm">
            <div class="input-group mb-3">
              <input v-model="usernameSignup" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <input v-model="passwordSignup" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <input v-model="password2Signup" type="password" class="form-control" placeholder="Repeat password" aria-label="repeat" aria-describedby="basic-addon1">
            </div>
            <div class="input-group mb-3">
              <button class="form-control btn btn-outline-danger" @click="signup">Cancel</button>
              <button class="form-control btn btn-outline-primary" type="submit">Sign up</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import userUtil from '../utils/user.js'

export default {
  name: 'hello',
  data () {
    return {
      sp: false,
      usernameSignin: '',
      passwordSignin: '',
      usernameSignup: '',
      passwordSignup: '',
      password2Signup: '',
      invalid: false,
      invalid2: false
    }
  },
  methods: {
    async signin () {
      if (this.usernameSignin === '' || this.passwordSignin === '') {
        return this.invalid = true
      }

      try {
        const login = await userUtil.loginUser({ username: this.usernameSignin, password: this.passwordSignin })
        localStorage.setItem('token', login.loginUser.token)
        localStorage.setItem('user', JSON.stringify({
          username: login.loginUser.username,
          _id: login.loginUser._id
        }))
        this.$emit('userLogged')
      } catch (err) {
        return this.invalid = true
      }
    },

    signup () {
      this.invalid2 = false
      this.invalid = false
      this.sp = !this.sp
      this.usernameSignin = ''
      this.passwordSignin = ''
      this.usernameSignup = ''
      this.passwordSignup = ''
      this.password2Signup = ''
    },

    async signupForm () {
      if (this.usernameSignup === '' || this.passwordSignup === '' || this.passwordSignup !== this.password2Signup) {
        return this.invalid2 = true
      }

      try {
        const signup = await userUtil.createUser({ username: this.usernameSignup, password: this.passwordSignup })
        localStorage.setItem('token', signup.createUser.token)
        localStorage.setItem('user', JSON.stringify({
          username: signup.createUser.username,
          _id: signup.createUser._id
        }))
        this.$emit('userLogged')
      } catch (err) {
        return this.invalid2 = true
      }
    },
  }
}
</script>

<style>
.cont {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 60%;
}

.title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Beth Ellen', cursive;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}

form {
  margin-top: 20px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
