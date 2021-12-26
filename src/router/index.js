import {createRouter, createWebHistory} from 'vue-router'

import Catalog from '../components/Catalog'
import Cart from '../components/Cart'
import AdminPanel from '../components/AdminPanelComponent'
import AboutComponent from '../components/AboutComponent'

const routes = [
    {
        path: '/',
        name: 'Catalog',
        component: Catalog
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/adminpanel',
        name: 'AdminPanel',
        component: AdminPanel
    },
    {
        path: '/about',
        name: 'About',
        component: AboutComponent
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
