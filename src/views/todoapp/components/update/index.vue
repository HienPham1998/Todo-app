<template>
    <div class="edit-form card">
        <div class="card-header">
            <h3>Edit task</h3>
        </div>
        <div class="card-body">
            <input
                type="text"
                v-model="itemSelected.name"
                @keyup.enter="updateToDo(itemSelected)"/>
        </div>
        <div class="card-footer">
            <button @click="hideForm" class="btn">Cancel</button>
            <button @click="updateToDo(itemSelected)" class="btn btn-update">Update</button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        props : ["itemSelected"],
        data() {
            return {
                todos: []
            }
        },
        methods : {
            hideForm() {
                this.$emit("hideForm", false);
            },
            updateToDo(item) {
                let param = {
                    name: item.name
                };
                const id = item.id;
                axios
                    .put(`https://anonyran-server.herokuapp.com/api/todos/${id}`, param)
                    .then(response => {
                        if (item.name.trim().length == 0) {
                            return
                        }
                        let found = this
                            .todos
                            .find(e => e.id == id);
                        if (found) {
                            found.name = item.name;
                        }
                        this.newToDo = '';
                    });
            }
        }
    };
</script>