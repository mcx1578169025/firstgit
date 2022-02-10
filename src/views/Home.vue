<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-button @click="getData" type='success'>获取菜单1</el-button>
    <el-button @click="getAction" type='success'>获取菜单2</el-button>
    <ul>
      <li v-for="(menu,index) in myList" :key="index">
        {{menu.title}}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed:{
    ...mapGetters([
      'myList'
      ])
  },
  methods: {
    getData(){
      this.http('/menulist')
      .then(res => {
        // console.log(res);
        this.$store.commit('getMenu',res.list)
      })
      
    },
      getAction(){
        this.$store.dispatch('getMenuInfo')
      }
  },
}
</script>
