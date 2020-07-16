<template>
    <div class="rank">
         <scroll class="rank-content" :data="rankList" ref="rankList">
              <ul>
                  <li class="rank-item" v-for="item in  rankList" :key="item.key" @click="detail(item.id)">
                    <div class="icon"><img :src="item.picUrl"></div>
                    <ul class="songlist" >
                        <li class="song" v-for="(song,index) in item.songList" :key="index">
                            <span>{{index + 1}}</span>
                             <span>{{song.songname}}-{{song.singername}}</span>
                        </li>
                    </ul>
                </li>
              </ul>
         </scroll>
        <div class="loading" v-show="isLoading">
            <loading></loading>
        </div>
         <transition name="slide">
           <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import  {getRankList} from '@/api/'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
export default {
   data() {
       return {
           rankList:[],
           isLoading:true
       }
   },
   components:{
        Scroll,
        Loading
    },
     created(){
        this.getRankListData();
    },
    methods: {
        getRankListData(){
            getRankList().then(res=>{
                this.rankList=res.data.topList,
                 this.isLoading=false
                console.log(res.data)
            })
        },
        detail(id){
             this.$router.push({path:`/rank/${id}`})
        }
    },
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.rank{
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    margin-top: 20px;
    .rank-content{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: @color-background;
        .rank-item{
           display: flex;
           box-sizing: border-box;
           padding: 0 20px 40px 20px;
           .icon{
              flex: 0 0 100px;
              width: 100px;
              height: 100px;
               img{
                    width: 100px;
                    height: 100px;
               }
           }
           .songlist{
               width: 62%;
               height: 100px;
               flex: 1;
               display: flex;
               background: @color-highlight-background;
               flex-direction: column;
               justify-content: center;
               color: @color-text-l;
               font-size: @font-size-small;
               .song {
                   line-height: @font-size-large-x ;
                   overflow: hidden;
                   padding-left: 20px;
                   span {
                 width: 100%;
                 overflow: hidden;
               }
            }
           }
        }
    }
    .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
   }
   .slide-enter-active,.slide-leave-active{ 
    transition: all 0.5s;
  }
}
</style>

