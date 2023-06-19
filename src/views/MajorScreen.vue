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
     <div class="tsBoxes" v-for="item in test">
      <p>{{ item.b1 }}</p>
      <p>{{ item.b2 }}</p>
    </div>
  </section> 
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
let test = ref([
  {
    b1: 'asdadasd',
    b2: 'dadads'
  },
  {
    b1: 'asdadasd',
    b2: 'dadads'
  },
  {
    b1: 'asdadasd',
    b2: 'dadads'
  },
  {
    b1: 'asdadasd',
    b2: 'dadads'
  },
  {
    b1: 'asdadasd',
    b2: 'dadads'
  }
])
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
  width: 100%;
  height: fit-content;
  background-color: rgb(245, 174, 53);
  border-radius: 15px;
  font-size: 1.5em;
  color: white;
}
lottie-player {
  left: 110%;
  transform: rotate(-90deg);
  position: absolute;
  top: 45%;
  cursor: pointer;
}
</style>
