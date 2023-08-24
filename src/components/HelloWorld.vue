<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="container">
    <b-jumbotron
      header="Bootstrap-Vue"
      lead="Bootstrap v4 Components for Vue.js 2"
    >
      <p>Now running on @vue/compat and Vue.js 3</p>
      <b-button variant="primary" @click="showModal"> Click me! </b-button>
    </b-jumbotron>
  </div>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script>
import { BIcon, BIconCamera } from 'bootstrap-vue';
export default {
  methods: {
    showModal() {
      this.$bvModal.msgBoxOk('Modal from @vue/compat');
    },
  },
};
</script>