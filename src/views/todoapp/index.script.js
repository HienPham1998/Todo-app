import axios from 'axios';
import Item from "./item";
import UpdateApp from "./components/update"
export default {
    name: "ToDoList",
    components: {
        Item,
        UpdateApp
    },
    data() {
        return {
            idForToDo: 3,
            newToDo: '',
            itemSelected: [],
            todos: [],
            isUpdateApp: false
        }
    },

    methods: {
        postToDo() {
            axios
                .post(`https://anonyran-server.herokuapp.com/api/todos`, {
                    name: this.newToDo
                })
                .then(response => {
                    if (this.newToDo.trim().length == 0) {
                        return
                    }
                    this
                        .todos
                        .push({
                            name: this.newToDo,
                            complete: false
                        }),
                        this.newToDo = ''
                })
                .catch(e => {
                    this
                        .errors
                        .push(e)
                })

        },
        deleteToDo(id) {
            axios
                .delete(`https://anonyran-server.herokuapp.com/api/todos/${id}`)
                .then(response => {
                    let index = this.todos.findIndex(e=>e.id == id);
                    this
                        .todos
                        .splice(index, 1)
                });
        },
        completedToDo(id) {
            axios
                .put(`https://anonyran-server.herokuapp.com/api/todos/status/${id}`)
                .then(response => {
                    let found = this.todos.find(e => e.id == id);
                    if (found) {
                        found.complete = !found.complete;
                    }
                });
        },
        clearAll() {
            this.todos = []
        },
        updateApp(todo) {
            this.itemSelected = todo;
            this.isUpdateApp = true;
        },
        hideForm() {
            this.isUpdateApp = false;
        },

    },
    created() {
        axios
            .get(`https://anonyran-server.herokuapp.com/api/todos`)
            .then(response => {
                this.todos = response.data.todos
            })
            .catch(e => {
                this
                    .errors
                    .push(e)
            })
    }

}