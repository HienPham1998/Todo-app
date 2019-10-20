<template>
    <div class="container">

        <div class="taskList">
            <h1>ToDo List</h1>
            <input
                type="text"
                v-model="newToDo"
                placeholder="What needs to be done "
                @keyup.enter="addToDo">
                <button class="btn btn-add" @click="addToDo">
                    Add
                </button>
                <!-- <button class="btn btn-edit">Edit</button> -->

                <div v-for="(todo,index) in todos" :key="todo.id" class="row">
                    <div class="todo-item row">
                        <input type="checkbox" v-model="todo.completed">
                        <p :class="{completed : todo.completed}">
                            {{todo.title}}
                            </p>
                    </div>
                    <b @click="showForm(index)">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="pen"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            class="svg-inline--fa fa-pen fa-w-16 fa-3x">
                            <path
                                fill="currentColor"
                                d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
                                class=""></path>
                        </svg>
                    </b>
                    <b class="remove-item" @click="removeToDo(index)">
                        &times;
                    </b>
                </div>
                <div class="edit-form card " v-show="isEditing">
                    <div class="card-header">
                        <h3>Edit task</h3>
                    </div>
                    <div class="card-body">
                        <input type="text" v-model="editToDo" @keyup.enter="updateToDo(index)">
                    </div>
                        <div class="card-footer">
                            <button @click="hideForm" class="btn ">Cancel</button>
                            <button @click="updateToDo(index)" class="btn btn-update">Update</button>
                        </div>
                    </div>
                    <button class="btn btn-removeall" @click="clearAll">Clear All</button>
                </div>
            </div>
        </template>

        <script>
            export default {
                name : "ToDoList",
                data() {
                    return {
                        idForToDo : 3,
                        newToDo: '',
                        editToDo: '',
                        index: 0,
                        todos: [
                            {
                                "id": 1,
                                "title": "Finish job",
                                "completed": false
                            }, {
                                "id": 2,
                                "title": "Start new job",
                                "completed": false
                            }
                        ],
                        isEditing: false,
                    }
                },
                methods : {
                    addToDo() {
                        
                        if (this.newToDo.trim().length == 0) {
                            return
                        } 
                        this.todos.push({
                                id: this.idForToDo++, 
                                title: this.newToDo, 
                                completed: false}),
                       this.newToDo = ''
                    },
                    updateToDo(index) {
                        if (this.editToDo.trim().length == 0) {
                            return
                        }
                        this
                            .todos
                            .splice(index, 1, {
                                id: index + 1,
                                title: this.editToDo,
                                completed: false
                            });
                        this.editToDo = '';
                    },
                    removeToDo(index) {
                        this
                            .todos
                            .splice(index, 1)
                    },
                    clearAll() {
                        this.todos = []
                    },
                    showForm(index) {
                        this.isEditing = true,
                        this.index = index
                    },
                    hideForm() {
                        this.isEditing = false
                    },
                    // completeToDo(index){
                    //     this.isCompleted = true
                    // }

                }
            }
        </script>

        <style lang="scss">
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .container {
                margin: 100px 300px;
                .taskList {
                    width: 70%;
                    background-color: #f1f1f1;
                    padding: 20px;
                    margin: 0 auto;
                    position: relative;
                    .row {
                        display: flex;
                        flex-direction: row;
                        padding: 10px 0;

                        .todo-item {
                            width: 100%;
                            margin: 0 auto;
                            text-align: left;
                            .completed{
                                text-decoration: line-through;
                                background-color: #f8cfc2;
                            }
                            input{
                                width: 5%;
                                margin: 0;
                                margin-top: 2px;

                            }
                        }
                        .remove-item {
                            color: red;
                            width: 12px;
                        }
                        svg {
                            width: 12px;
                            color: #6a1b9a;
                            margin-right: 4px;
                        }
                    }
                    input {
                        margin: 20px 0;
                        padding: 10px;
                        width: 90%;
                    }
                    .btn {
                        padding: 10px;
                        height: 40px;
                        border: none;
                        color: #fff;
                    }
                    .btn-add {
                        width: 10%;
                        background-color: #188ff8;
                    }
                    .btn-removeall {
                        margin-top: 10px;
                        width: 15%;
                        background-color: red;
                    }
                    .edit-form {
                        position: absolute;
                        top: 0;
                        width: 500px;
                        right: 10%;
                        background-color: #f8edde;
                        height: 200px;
                        padding: 20px;
                        .card-body {
                            input{
                                width: 100%;
                            }
                        }
                        .card-footer{
                            text-align: right;
                            button{
                                background-color: #e5a31b;
                            }
                            .btn-update{
                                background-color: #188ff8;
                                margin-left: 10px;
                            }
                        }
                    }

                }
            }

        </style>