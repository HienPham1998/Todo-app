<template>
  <div class="container">
    <div class="taskList">
      <h1>ToDo List</h1>
      <input
        type="text"
        v-model="newToDo"
        placeholder="What needs to be done "
        @change="postToDo()"/>
      <button class="btn btn-add" @click="postToDo()">Add</button>
      <div v-for="(todo,index) in todos" :key="index">
        <item :todo="todo" @updateApp="updateApp($event)" @updateToDo="updateToDo($event)" @deleteToDo ="deleteToDo($event)" @completedToDo="completedToDo($event)"/>
      </div>
      <button class="btn btn-removeall" @click="clearAll">Clear All</button>
      <transition name="popup">
        <update-app v-if="isUpdateApp === true" @hideForm="isUpdateApp = $event" :itemSelected="itemSelected"/>
      </transition>
    </div>
  </div>
</template>
<script src='./index.script'></script>
<style lang="scss" scope>
    @import "./index.style";
</style>