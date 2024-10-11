import './style.scss';
import {createApp} from 'vue';
import {createWebHistory, createWebHashHistory ,createMemoryHistory, createRouter } from 'vue-router';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';
import ChuckNorris from './pages/ChuckNorris.vue';
import NotFound from './pages/NotFound.vue';
import RickAndMorty from './pages/RickAndMorty.vue';
import Maps from './pages/Maps.vue';
import CanvasExample from './pages/CanvasExample.vue';
import Chat from './pages/Chat.vue';

const routes = [
    { path: '/', name: 'ToDo', component: ToDo },
    { path: '/modals', name: 'Modals', component: Modals },
    { path: '/chuck', name: 'Chuck Norris', component: ChuckNorris },
    { path: '/rickandmorty', name: 'Rick And Morty', component: RickAndMorty},
    { path: '/maps', name: 'Maps', component: Maps},
    { path: '/canvas', name: 'Canvas', component: CanvasExample},
    { path: '/chat', name: 'Chat', component: Chat},
    /** must be last always */
    { path: '/:pathMatch(.*)*', name: 'Not Found', component: NotFound, meta: { showInTab: false }},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

import App from './App.vue';

let app = createApp(App).use(router).mount('#app');