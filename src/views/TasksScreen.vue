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
    <div class="task-boxes" v-for="(item, index) in notesArr">
      <img
        class="bar-img"
        @click="HandleDelete(index)"
        src="../assets/tasksBar/icons8-delete.svg"
        alt=""
      />
      <template v-if="editIndex === index">
        <input class="editable-input" v-model="notesArr[index]" ref="inputRef" autofocus />
      </template>
      <template v-else>
        <p>{{ item }}</p>
      </template>
      <img
        class="bar-img"
        @click="HandleEdit(index)"
        v-if="editIndex === index"
        src="../assets/tasksBar/icons8-done.svg"
        alt=""
      />
      <img
        class="bar-img"
        v-else
        @click="startEditing(index)"
        src="../assets/tasksBar/icons8-edit.svg"
        alt=""
      />
    </div>
    <div class="writting-container">
      <button class="addButt" @click="HandleAdd()">Save</button>
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
import { collection, addDoc, doc, setDoc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore'
import quickdealFIRESTORE from '@/firebase/config'
import editor from '@tinymce/tinymce-vue'
import { ref, nextTick, onMounted } from 'vue'
import { Store } from '@/stores/store'
let store = Store()
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
let editIndex = ref<number | null>(null)
let inputRef = ref()
let removeTags = (text: string) => {
  const reg = /\<\/?[^>]+\>/g
  return text.replace(reg, '')
}
let HandleNote = ref<string>('')
let notesArr = ref([] as any)
let forkNotesArr = ref<string>('')
let HandleAdd = async () => {
  if (HandleNote.value) {
    let data = removeTags(HandleNote.value)
    HandleNote.value = ''
    notesArr.value.push(data)
    await setDoc(doc(quickdealFIRESTORE, 'Notes', data.replace(/\s/g, '-')), { note: data })
  }
}
let HandleDelete = async (index: number) => {
  let ID = removeTags(notesArr.value[index])
  notesArr.value.splice(index, 1)
  await deleteDoc(doc(quickdealFIRESTORE, 'Notes', ID.replace(/\s/g, '-')))
}
let kostylniyDelete = async () => {
  let ID = removeTags(forkNotesArr.value)
  await deleteDoc(doc(quickdealFIRESTORE, 'Notes', ID.replace(/\s/g, '-')))
}

let startEditing = (index: number) => {
  forkNotesArr.value = notesArr.value[index]
  editIndex.value = index
  nextTick(() => {
    const inputElement = inputRef.value[index]
    inputElement && inputElement.focus()
  })
}
let HandleEdit = async (index: number) => {
  let ID = removeTags(notesArr.value[index])
  editIndex.value = null
  await setDoc(doc(quickdealFIRESTORE, 'Notes', ID.replace(/\s/g, '-')), {
    note: notesArr.value[index]
  })
  kostylniyDelete()
}

onMounted(() => {
  notesArr.value = store.$state.firebaseArr
})
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
  top: 25%;
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
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border: none;
  background-color: rgb(236, 163, 17);
  border-radius: 15px;
  z-index: 999;
  cursor: pointer;
}
.task-boxes {
  display: flex;
  padding: 10px;
  width: 100%;
  height: fit-content;
  background-color: rgb(245, 174, 53);
  border-radius: 15px;
  font-size: 1.5em;
  color: white;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
img {
  max-width: 40px;
  max-height: 100%;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s ease;
}
img:hover {
  transform: scale(1.3);
}
.editable-input {
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1.5em;
  outline: none;
  width: 100%;
  resize: vertical;
  min-height: fit-content;
}
</style>
