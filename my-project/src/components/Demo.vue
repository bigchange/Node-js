<template>
  <div class="hello">
    
    <h1>{{ msg }}</h1>
    
    <select v-model="selected" name="fruit">
    <option value="">选择一个网站</option>
    <option value="www.runoob.com">Runoob</option>
    <option value="www.google.com">Google</option>
    </select>
    <div id="output">
      选择的网站是: {{selected}}
    </div>
    <div id="app1">
    <p v-if="seen">现在你看到我了</p>
    </div>
  
    <span v-once> this message will never change {{msg}} </span>
    <br />
    <a href="http://www.baidu.com" target="_blank">百度</a>
    <!-- 缩写 -->
    <a href="http://www.sina.com" target="_self">新浪</a>

    <h1>{{ msg.split('').reverse().join('')}} </h1>

    <div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>

    <a v-on:click="doSomething"> </a>
    <!-- 缩写 -->
    <a @click="doSomething"></a>

    <div id="watch-example">
    <p>
    ask a yes/no question:
    <input v-model="question">
    </p>
    <p>{{ answer }}</p>
    </div>

    <div v-bind:class="classObject"></div>

    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" v-model="newTodoText" key="username-input" v-on:keyup.enter="checkName">
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" key="email-input">
    </template>
    <Button @click="changeLoginType">changeLoginType</Button>

    <li v-for="n in even(numbers)">{{ n }}</li>


    
    <h1 v-show="ok">Hello!</h1>

  </div>
</template>

<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>

<script>
import _ from 'lodash'
export default {
  name: 'hello',
  data () {
    return {
      message: 'i love you lolaliva',
      msg: 'Welcome to Demo components Vue.js App',
      selected: '',
      seen: true,
      url: 'www.baidu.com',
      answer: 'your answer?',
      question: '',
      classObject: {
        active: true,
        text: true
      },
      loginType: 'username',
      ok: true,
      newTodoText: '',
      numbers: [ 1, 2, 3, 4, 5 ]
    }
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    question: function (newQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  computed: {
    message: {
      set: function (newMessage) {
        this.message = 'i love you'
      }
    },
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    checkName: function () {
      this.newTodoText = 'check name is response'
    },
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    },
    getAnswer: _.debounce(
      function () {
        this.answer = 'i love you'
      },
      500
    ),
    changeLoginType: function () {
      if (this.loginType === 'username') {
        this.loginType = 'email'
      } else {
        this.loginType = 'username'
      }
    },
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  }
}
</script>

<style>
</style>

