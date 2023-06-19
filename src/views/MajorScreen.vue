<template>
  <section class="tasks-sheet-container">
    <RouterLink :to="{ name: 'tasks' }">
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_vfmyxu76.json"
        background="transparent"
        speed="1"
        style="width: 100px; height: 100px"
        loop
        autoplay
      ></lottie-player>
    </RouterLink>
    <h2>To do:{{ todoCount }}</h2>
    <div class="tsBoxes" v-for="item in notesArr">
      <p>{{ item }}</p>
      <img src="../assets//tasksBar/task.png" alt="" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Store } from '@/stores/store'
import { onMounted, computed } from 'vue'
import { ref } from 'vue'
let store = Store()
let notesArr = ref()
let todoCount = computed(() => store.$state.firebaseArr.length)
onMounted(() => {
  notesArr.value = store.$state.firebaseArr
})
</script>

<style scoped>
.tasks-sheet-container {
  display: grid;
  margin: auto;
  width: 60%;
  height: fit-content;
  background-color: aliceblue;
  border-radius: 25px;
  margin-top: 10%;
  padding: 30px;
  align-items: center;
  justify-items: center;
  gap: 40px;
  position: relative;
}
.tsBoxes {
  display: flex;
  padding: 10px;
  width: 100%;
  height: fit-content;
  background-color: rgb(245, 174, 53);
  border-radius: 15px;
  font-size: 1.5em;
  color: white;
  align-items: center;
  cursor: context-menu;
  justify-content: space-between;
}
lottie-player {
  left: 110%;
  transform: rotate(-90deg);
  position: absolute;
  top: 45%;
  cursor: pointer;
}
img {
  max-width: 40px;
  max-height: 40px;
  cursor: context-menu;
}
</style>
