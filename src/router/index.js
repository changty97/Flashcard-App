import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Flashcard from '@/components/flashcard'
import Water1 from '@/components/water-treatment-plant-operation-v1/'
import A_Terms from '@/components/A_Terms/'

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
      path: '/flashcard/courses/water-treatment-plant-operation-v1/',
      name: 'Water1',
      component: Water1
    },
    {
      path: '/flashcard/alphabetical/A/',
      name: 'A_Terms',
      component: A_Terms
    }
  ]
})
