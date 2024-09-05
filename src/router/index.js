import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhotorapherProfile from '../views/PhotographerProfile.vue'
import UserProfile from '../views/UserProfile.vue'
import TermsAndConditions from '@/components/footerComponents/TermsAndConditions.vue'
import JoinAsPhotographer from '@/components/footerComponents/JoinAsPhotographer.vue'
import ContactUs from '@/components/footerComponents/ContactUs.vue'
import AboutUs from '@/components/footerComponents/AboutUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/photorapherProfile/:id',
      name: 'photorapherProfile',
      component: PhotorapherProfile
    },
    {
      path: '/userProfile',
      name: 'profileDashboard',
      component: UserProfile
    },
    { path: '/terms-and-conditions', component: TermsAndConditions },
    { path: '/join-as-photographer', component: JoinAsPhotographer },
    { path: '/contact-us', component: ContactUs },
    { path: '/about-us', component: AboutUs }
  ]
})

export default router
