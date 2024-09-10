import { defineStore } from "pinia"

export const useTaskStore = defineStore('TaskStore', {
    state: () => ({
        tasks: [],
        name: 'TaskStore',
        loading: false,
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            return this.favs.reduce((acc, task) => {
                return task.isFav ? acc + 1 : acc
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        },
    },
    actions: {
        async getTasks() {
            this.loading = true
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json()
            this.tasks = data
            this.loading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.error) {
                console.error(response.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const response = await fetch('http://localhost:3000/tasks' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id)
            const response = await fetch('http://localhost:3000/tasks' + id, {
                method: 'POST',
            })

            if (response.error) {
                console.error(response.error)
            }
        }
    },
})