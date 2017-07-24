<template>
    <div class="table">
        <p id="one">#文本输入</p>
        <input v-model="input" placeholder="输入.."> Message is:{{input}}
        <p>#多行文本</p>
        <textarea v-model="mmessage" placeholder="add multiple lines"></textarea> message:is {{ mmessage }}
        <p># 复选框 </p>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
        <p># 单选按钮 </p>
        <div id="example-4">
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        </div>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>
    </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      input: '',
      mmessage: '',
      checkedNames: [],
      picked: ''
    }
  }
}
</script>
