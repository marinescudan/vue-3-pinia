<template>
<form @submit.prevent="handleSubmit">
    <input
        type="text"
        placeholder="Task title"
        v-model="newTask"
    />
    <button type="submit">Add Task</button>
</form>
</template>

<script>
import { ref } from 'vue'
import {useTaskStore} from '../stores/TaskStore'
export default {
    setup() {
        const taskStore = useTaskStore()
        const newTask = ref('')
        const handleSubmit = () => {
            if (newTask.value.trim() === '') return
            taskStore.addTask({
                title: newTask.value,
                isFav: false,
                id: Math.floor(Math.random() * 10000)
            })
            newTask.value = ''
        }
        return { newTask, handleSubmit }
    }
}
</script>