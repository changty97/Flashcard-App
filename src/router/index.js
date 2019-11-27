import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Flashcard from '@/components/flashcard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/flashcard/',
      name: 'Flashcard',
      component: Flashcard
    },
    {
      path: '/flashcard/',
      name: 'Flashcard',
      component: Flashcard
    }
  ]
})
