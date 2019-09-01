<template>
  <div class="cont">
    <div v-show="loading">
      Cargando...
    </div>

    <div v-show="tasks.length >= 1 || !loading" class="card" v-for="task in tasks" :key="task.id">
      <div class="card-header"></div>
      <div class="card-body">
        <h5>{{ task.summary }}</h5>
        <p class="description"></p>
        <div class="hours"><span class="from">{{ from(task.start.dateTime) }}</span> - <span class="to">{{ from(task.end.dateTime) }}</span></div>
        <div class="day"><span>{{ to(task.start.dateTime) }}</span></div>
        <div class="creator"><span>{{ task.creator.email }}</span></div>
        <div class="progress">
          <div class="progress-bar" role="progressbar" v-bind:style="{ width: calc(task.start.dateTime) + '%' }" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
      <br>
    </div>

    <div v-show="!tasks && !loading || tasks.length === 0 && !loading">
      No tasks :(
    </div>
  </div>
</template>

<script>
  import taskUtil from '../utils/task.js'  
  import userUtil from '../utils/user.js'  

  export default {
    name: 'Home',
    data () {
      return {
        tasks: [],
        loading: false
      }
    },

    methods: {
      calc(_date) {
        const date = new Date(_date)
        const day = date.getDay()
        let _tasks = 0
        this.tasks.map(el => {
          const newDate = new Date(el.start.dateTime).getDay()
          if (newDate === day) {
            _tasks++
          }
        })
        return Math.round(100/_tasks)
      },

      async getTask() {
        const token = localStorage.getItem('token')
        const _user = JSON.parse(localStorage.getItem('user'))

        try {
          if (token) {
            this.loading = true
            const task = await taskUtil.getTasks({ username: _user.username, token })
            this.loading = false
            this.tasks = task.getTasks.task
            localStorage.setItem('token', task.getTasks.token)
          } else {
            localStorage.clear()
            this.$emit('userLogged')
          }
        } catch (err) {
          localStorage.clear()
          this.$emit('userLogged')
        }
      },

      from (day) {
        const newDay = new Date(day)
        const hora = newDay.getHours() === 0 ? '00' : newDay.getHours()
        const mins = newDay.getMinutes() === 0 ? '00' : newDay.getMinutes()
        return `${hora}:${mins}`
      },

      to (day) {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
        const newDay = new Date(day)
        return dias[newDay.getDay()]
      }
    },

    mounted () {
      const token = localStorage.getItem('token')
      const username = JSON.parse(localStorage.getItem('user'))
      const user = { username: username.username, token }

      this.getTask()
    }
  }
</script>

<style>
  .cont {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; 
    flex-wrap: wrap;
  }

  .card {
    width: 75%;
    margin-bottom: 15px;
  }

  .card-header {
    background-color: #c1c1c1;
  }

  .day {
    margin-bottom: 8px;
  }

  .creator {
    margin-bottom: 8px;
  }
</style>