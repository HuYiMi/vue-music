<template>
    <scroll class="singer-view" ref="listView" :listenScroll=true :probeType=3  @scroll="scroll">
        <ul>
            <li class="singer-group" ref="lists" v-for="item in singers" :key="item.key" >
                <h2 class="singer-group-title">{{item.title}}</h2>
                <ul>
                    <li class="singer-group-item" v-for="item1 in item.list" :key="item1.key" @click="detail(item1.id)">
                        <img alt="" class="avater" :src="item1.img"> 
                        <span class="name" v-text="item1.name"></span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 右键快速定位列表 -->
        <div class="singer-shortcut">
            <ul>
                <li class="item" v-for="(item,index) in cutList" :class="{'current':currentIndex == index}" :key="item.key" :data-index="index" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove">{{item}}</li>
            </ul>
        </div>
         <div class="loading" v-show="isLoading">
            <loading></loading>
        </div>
         <transition name="slide">
         <router-view></router-view>
         </transition>
    </scroll>
</template>

<script>
import Scroll from '@/components/scroll'
import indexVue from '../../views/rank/index.vue'
import Loading from '@/components/loading'
export default {
  props:{
      singers:{
          type:Array,
          default:[]
      }
  },
  data() {
      return {
          scrollY:0,
          listHeight:[],
          currentIndex:0,
          touch:{},
           isLoading:true
      }
  },
  updated() {
      this.getLiH(),
      this.isLoading=false
  },
  computed: {
      cutList(){
          let arr=[]
          for(let a in this.singers){
              arr.push(this.singers[a].title.substring(0,1))
          }
          return arr
      }
  },
   methods: {
      onTouchStart(ev){
        // 获取当前点击的小标
        let vIndex=ev.target.attributes['data-index'].value;
        // 记录点击前的位置
        this.touch.y=ev.touches[0].pageY
        this.touch.index=vIndex
    //    调用scrollTo方法
         this.scrollTo(vIndex)
      },
      onTouchMove(ev){
        // 记录手指滑动的位置
        this.touch.y2=ev.touches[0].pageY
        // 计算手指通过了几个li，并且向下取整
        let a1=(this.touch.y2 - this.touch.y)/18 | 0
        let a2=parseInt(this.touch.index)+a1
        this.scrollTo(a2)
      },
      scroll(obj){
          this.scrollY=obj.y
      },
    //   获取list中每个li的高度
    getLiH(){
       let lists= this.$refs.lists
       let h=0
       this.listHeight.push(0)
       for(var i=0;i<lists.length;i++){
           h+=lists[i].clientHeight
           this.listHeight.push(h)
       }
    },
    scrollTo(index){
        this.scrollY = -this.listHeight[index]
        this.$refs.listView.scrollToElement(this.$refs.lists[index],0)
      },
      detail(id){
          this.$router.push({path:`/singer/${id}`})
      }
  },
//   监听scrolly，如果发生改变，我们要改变class
  watch: {
      scrollY(v){
        //   顶端
          if(v>0){
             this. currentIndex=0
          }
        //   中间
        for(var i=0;i<this.listHeight.length;i++){
            let h1=this.listHeight[i]
            let h2=this.listHeight[i+1]
            if(-v>h1 && -v<h2){
                this.currentIndex=i
                return
            }
        }
        // 底部
        this.currentIndex=this.listHeight.length-1
      }
  },
  components:{
      Scroll,
       Loading
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.singer-view{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @color-background;
    .singer-group{
        padding-bottom: 30px;
        .singer-group-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: @font-size-small;
            color: @color-text-l;
            background: @color-highlight-background;
        }
        .singer-group-item{
            display: flex;
            align-items:center;
            padding: 20px 0 0 30px;
            .avater{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            .name{
                margin-left: 20px;
                color:@color-text-l;
                font-size: @font-size-medium
            }
        }
    }
    .singer-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: @color-background-d;
        font-family: Helvetica;
        .item{
            padding: 3px;
            line-height: 1;
            color: @color-text-l;
            font-size: @font-size-small;
            &.current{
                color:@color-theme;
            }
        }
    }
    .singer-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: @font-size-small;
            color: @color-text-l;
            background: @color-highlight-background;
        }
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
.loading{
     position: absolute;
     width: 100%;
     height: 100%;
     background: #222;
     left: 0;
     top:0;
  }
   .slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
.slide-enter-active,.slide-leave-active{
    transition: all 0.5s;
}
</style>
