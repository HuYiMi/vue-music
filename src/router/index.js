import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend/'
import RecommendDatial from '@/views/recommend/detail'
import Singer from '@/views/singer/'
import SingerDatial from '@/views/singer/detail'
import Rank from '@/views/rank/'
import RankDatial from '@/views/rank/detail'
import Search from '@/views/search/'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    // 路由重定向
    {
      path: "/",
     redirect:"/recommend"
    },
    {
      path:'/recommend',
      component:Recommend,
      children:[{
        path: '/recommend/:id',
        component: RecommendDatial,
      }]
    },
    {
      path:'/singer',
      component:Singer,
      children:[{
        path: '/singer/:id',
        component: SingerDatial,
      }]
    },
    {
      path:'/rank',
      component:Rank,
      children:[{
        path: '/rank/:id',
        component:RankDatial,
      }]
    },
    {
      path:'/search',
      component:Search
    }
  ]
})
