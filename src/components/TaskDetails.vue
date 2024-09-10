<template>
    <div class="task-details">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i
                class="material-icons"
                @click="taskStore.deleteTask(task.id)"
            >delete</i>
            <i
                class="material-icons"
                :class="{ 'is-fav': task.isFav }"
                @click="taskStore.toggleFav(task.id)"
            >favorite</i>
        </div>
    </div>
</template>

<script>
    import { useTaskStore } from '../stores/TaskStore'
    export default {
        props: ['task'],
        setup() {
            const taskStore = useTaskStore()
            return {
                taskStore
            }
        }
    }
</script>

<style>
    .task-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
    }

    .icons {
        display: flex;
        justify-content: space-between;
        width: 50px;
    }

    .is-fav {
        color: red;
    }
</style>