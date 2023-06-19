<template>
  <section class="tasks-option">
    <RouterLink :to="{ name: 'home' }">
      <lottie-player
        class="lottie-back"
        src="https://assets3.lottiefiles.com/packages/lf20_vfmyxu76.json"
        background="transparent"
        speed="1"
        style="width: 100px; height: 100px"
        loop
        autoplay
      ></lottie-player>
    </RouterLink>
    <div class="task-boxes" v-for="item in notesArr">
      <p>{{ item }}</p>
    </div>
    <div class="writting-container">
      <button class="addButt" @click="HandleAdd()">save</button>
      <editor
        v-model="HandleNote"
        api-key="v5n069t1i4u2b85xtio3jrmx4gktki4qys7iaksiafi1fzzq"
        :init="tinymceConfg"
        :initial-value="HandleNote"
        tag-name="div"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import quickdealFIRESTORE from '@/firebase/config'
import editor from '@tinymce/tinymce-vue'
import { ref } from 'vue'
let tinymceConfg = {
  width: 600,
  height: 200,
  toolbar_location: 'bottom',
  toolbar: 'bold | italic | underline | emoticons',
  disabled: false,
  plugins: 'emoticons',
  menubar: false,
  statusbar: false,
  resize: false
}
let removeTags = (text: string) => {
  const reg = /<[^>]*>/g
  return text.replace(reg, '')
}
let HandleNote = ref('hi')
let notesArr = ref<any[]>([])
let HandleAdd = async () => {
  let data = removeTags(HandleNote.value)
  HandleNote.value = ''
  notesArr.value.push(data)
  await setDoc(doc(quickdealFIRESTORE, 'cities', data.replace(/\s/g, '-')), { note: data })
}
let HandleDelete = () => {}
</script>

<style scoped>
.tasks-option {
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
  position: relative;
  gap: 30px;
}
.lottie-back {
  left: -15%;
  transform: rotate(90deg);
  position: absolute;
  top: 45%;
  cursor: pointer;
  margin-top: 50px;
}
.writting-container {
  position: relative;
  width: fit-content;
  height: fit-content;
}
.addButt {
  position: absolute;
  top: 80%;
  left: 80%;
  z-index: 999;
}
.task-boxes {
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
</style>
