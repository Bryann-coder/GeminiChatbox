import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { setup as setupFirebase } from '@/services/firebase.service'


setupFirebase()

createApp(App).mount('#app')
