<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>



<template>
  <main-component></main-component>
</template>

<script>
import MainComponent from "./components/MainComponent";

import { provide, reactive } from 'vue'

export default {
  name: 'App',
  components: {
    MainComponent
  },
  data() {
    setup: {
      const cart = reactive({
        items: [],
        total: 0
      });

      const isAdmin = reactive({
        mode: false
      });

      provide('cart', cart)
      provide('isAdmin', isAdmin)

      return {
        cart,
        isAdmin
      }
    }
  },
  methods: {
  }
}
</script>


