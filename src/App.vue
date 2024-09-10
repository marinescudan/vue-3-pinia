<template>
<main>
  <!-- heading -->
   <header>
    <img src="./assets/pinia-logo.svg" alt="Vue logo" />
    <h1>{{ name }}</h1>
   </header>

    <!-- task form -->
     <div class="new-task-form">
      <TaskForm/>
     </div>

    <!-- filter buttons -->
     <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorites</button>
     </nav>

     <!-- loading -->
      <div class="loading" v-if="loading">loading tasks ...</div>

   <!-- task list -->
   <div class="task-list" v-if="filter === 'all'">
    <p>You have {{ totalCount }} tasks left to do</p>
    <div v-for="task in tasks" :key="task.id">
      <TaskDetails :task="task"/>
    </div>
  </div>

   <!-- task list -->
  <div class="task-list" v-if="filter === 'favs'">
    <p>You have {{ taskStore.favCount }} favs left to do</p>
    <div v-for="task in taskStore.favs" :key="task.id">
      <TaskDetails :task="task"/>
    </div>
  </div>

  <!-- reset -->
  <button @click="taskStore.$reset">Reset</button>
</main>
</template>

<script>
import { ref } from 'vue'
import {useTaskStore} from './stores/TaskStore'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { storeToRefs } from 'pinia';

export default {
  components: {
    TaskDetails,
    TaskForm
  },
  setup () {
    const taskStore = useTaskStore()

    const {tasks, loading, favs, totalCount, favCount, name} = storeToRefs(taskStore)

    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore, filter, tasks, loading, favs, totalCount, favCount } 
  }
}

</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  img {
    width: 50px;
    height: 50px;
  }

  h1 {
    margin-left: 10px;
  }

  .filter {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .filter button {
    margin: 0 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #f1f1f1;
    cursor: pointer;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .loading {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>