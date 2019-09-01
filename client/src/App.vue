<template>
  <div id="app">
    <header v-if="logged">
      <span>gorev</span>
    </header>

    <div v-show="loading">
      <loading-page></loading-page>
    </div>
    
    <main v-show="!loading">
      <div v-if="logged">
        <home></home>
      </div>
      <div v-else>
        <signin @userLogged="userLogged"></signin>
      </div>
    </main>
  </div>
</template>

<script>
import LoadingPage from '@/components/LoadingPage'
import Home from '@/components/Home'
import Signin from '@/components/Signin'
import userUtils from './utils/user.js'

export default {
  name: 'app',
  components: { LoadingPage, Home, Signin },
  data () {
    return {
      logged: false,
      loading: true
    }
  },

  methods: {
    async verifyUser (user) {
      try {
        this.loading = true
        const d = await userUtils.verifyUser(user)
        this.loading = false
        this.logged = true
        localStorage.setItem('token', d.verifyUser.token)
        localStorage.setItem('user', JSON.stringify({
          username: d.verifyUser.username,
          _id: d.verifyUser._id
        }))
      } catch (err) {
        localStorage.clear()
        console.log(err)
        this.logged = false
      }
    },

    userLogged () {
      this.logged = true
    },

    userNotLogged () {
      this.logged = false
    }
  },

  mounted () {
    const token = localStorage.getItem('token')
    const username = JSON.parse(localStorage.getItem('user'))
    if (!token || !username || !username.username) {
      this.logged = false
      this.loading = false
      localStorage.clear()
      return
    }

    const user = { username: username.username, token }
    this.verifyUser(user)
  }
}
</script>

<style>
body {
  background-color: #fafafa;
}

#app {
  font-family: 'Lato', sans-serif;
  color: #2c3e50;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 10px;
  font-family: 'Beth Ellen', cursive;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
