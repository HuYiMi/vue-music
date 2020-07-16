<template>
  <div class="recommend" >
        <scroll class="recommend-content" :data="songList">
         <div>
        <!-- 轮播图 -->
          <div class="swiper-container slide">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in slider" :key="item.key">
                    <img :src="item.picUrl" width="100%">
                </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        <!-- 热门歌单推荐 -->
          <div class="recommend-list">
            <h2>热门歌单推荐</h2>
            <ul>
                <li @click="selectItem(item)" class="item" v-for="(item,index) in songList" :key="index">
                    <div class="icon"><img :src="item.pic"></div>
                    <div class="text">
                    <h3 v-text="item.title"></h3>
                    <p v-text="item.tag"></p>
                    </div>
                </li>
            </ul>
          </div>
         </div>
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
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import {getRecommend,getSList} from '@/api/'
import Scroll from '@/components/scroll'
import Loading from '@/components/loading'
export default {
    data(){  
        return{
            slider:[],
            isLoading:true,
            songList:[]
        }
    },
    components:{
        Swiper,
        Scroll,
        Loading
    },
    created(){
        this.getRecommendData();
        this.getSListData();
    },
    methods: {
    //    获取接口
    getRecommendData(){
        getRecommend().then(res=>{
            // console.log(res)
            this.slider=res.data.slider,
             this.isLoading=false
        });
      },
      //获取歌单详情
      getSListData(){
        getSList().then(res=>{
            // console.log(res)
             this.songList = res.result;
        })
      },
       // 推荐个点详情
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.listid}`
      });
      console.log(item)
      },
    },
    // 钩子函数在挂载之前去实例化swiper
    mounted(){
        var slide=new Swiper('.slide',{
            pagination:{
                el:".swiper-pagination",
            },
            observer:true,
            observeParents:true,
        });
    },
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.recommend{
    position: fixed;
    width: 100%;
    top:88px;
    bottom:0;
    .recommend-content{
      height: 100%;
      overflow:hidden;
    }
    .recommend-list{
        h2{
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size:@font-size-medium-x;
            color: @color-theme;
        }
    .item{
        display: flex;
        box-sizing: border-box;
        padding: 0 20px 20px 20px;
        .icon{
            flex: 0 0 60px;
            width: 60px;
            height: 60px;
            padding-right: 20px;
            img{
                width: 60px;
                height: 60px;
            }
        }
        .text{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 20px;
            overflow: hidden;
            font-size: @font-size-medium;
            h3{
                margin-bottom: 10px;
                color: @color-text;
            }
            p{
                color:@color-text-d;
            }
        }
    }
 }
 .content{
     height: 2300px;
 }
 .loading{
     position: absolute;
     width: 100%;
     height: 100%;
     background: #222;
     left: 0;
     top:0;
  }
}
.wrapper{
     height: 500px !important;
     position: relative;
     overflow: hidden;
 }
 .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
.slide-enter-active,.slide-leave-active{
    transition: all 0.5s;
}
</style>

