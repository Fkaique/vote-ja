import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Pages/Home.vue'
import Simulator from '../Pages/Simulator.vue'
import Tutorial from '../Pages/Tutorial.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/simulator', name: 'simulator', component: Simulator },
    { path: '/tutorial', name: 'tutorial', component: Tutorial },
  ]
})

export default router