<template>
  <header>
    <div class="header-container animate__animated animate__slideInDown">
      <h1>
        {{ title }}
      </h1>
    </div>
  </header>
  <main>
    <RouterView class="animate__animated animate__backInDown" />
  </main>
</template>

<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import 'animate.css'
import { onMounted, onBeforeMount } from 'vue'
import quickdealFIRESTORE from '@/firebase/config'
import { Store } from '@/stores/store'
const title = 'Tasks sheet'.toLocaleUpperCase()
let store = Store()
let loadNotes = async () => {
  let querySnapshot = await getDocs(collection(quickdealFIRESTORE, 'Notes'))
  querySnapshot.forEach((doc) => {
    store.$state.firebaseArr.push(doc.data().note)
  })
}
onBeforeMount(() => {
  if (!store.$state.firebaseArr) {
    store.$state.firebaseArr = []
  }
})
onMounted(() => {
  loadNotes()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Hind&display=swap');

body {
  margin: 0;
  padding: 0;
  border: none;
  font-family: 'Hind', sans-serif;
  font-weight: 500;
}
p,
h1,
h2,
h3,
span,
a {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
header {
  height: 60px;
  width: 100%;
  position: fixed;
  background-color: transparent;
  display: flex;
  padding: 10px;
  font-family: 'Hind', sans-serif;
  font-weight: 800;
  font-size: 2em;
  align-content: center;
  justify-content: center;
  top: 0;
  z-index: 9999;
}

.header-container {
  width: fit-content;
  height: 100%;
  background-color: rgb(245, 174, 53);
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  letter-spacing: 5px;
}
</style>
