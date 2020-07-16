<template>
    <transition  name="list-fade">
        <div class="playlist-box" v-show="showFlag" >
            <div class="playlist" @click.stop>
                <!-- 头部 -->
                <div class="list-header">
                    <div class="icon" >
                        <i :class="modeStyle"></i>
                        <span v-text="text"></span>
                        <div class="del">
                           <img src="./del.png">
                        </div>
                    </div>
                </div>
                <!-- 歌曲列表 -->
                <Scroll class="list-con" :data="sequenceList" ref="listContent">
                    <transition-group  name="list-li" tag="ul">
                        <li ref="listItem" v-for="(item, index) in sequenceList" :key="item" @click="selectItem(item, index)">
                          <div class="icon">
                              <i :class="btnList" v-if="getCurrentIcon(item)"></i>
                          </div>
                          <p class="list2-con">{{ item.name }}</p>
                          <div class="list-end">
                            <span class="collect-box" >
                            </span>
                          </div>
                        </li>
                      </transition-group>
                </Scroll>
                <!-- 添加列表 -->
                <div class="list-operate">
                </div>
                <!-- 关闭 -->
                <div class="list-close"  @click="hide">
                     <span>关闭</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Scroll from '@/components/scroll'
import {mapGetters,mapMutations} from 'vuex'
export default {
    data() {
    return {
      showFlag: false,
      refreshDelay: 120,
      text:"随机播放"
    };
  },
    components: {
    Scroll,
  },
  methods: {
    // 隐藏
    hide() {
      this.showFlag = false;
    },
    // 显现
     show() {
      this.showFlag = true;
      setTimeout(() => {
        // dom渲染后再去计算
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
     getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return true;
      }
      return false;
    },
  },
  computed: {
    //    根据播放状态来改变按钮的图标
      btnList(){
          return this.playing ? 'icon-pause' : 'icon-play'
       },
       //   播放的顺序
       modeStyle(){
         return this.mode ? 'icon-random' : 'icon-sequence'
       },
       ...mapGetters(['playList','currentIndex','currentSong','fullScreen','playing','mode','sequenceList'])
  },
//   methods:{
//       ...mapMutations(['changeFullScreen','changePlaying','changeCurrentIndex','changeMode'])
//   }
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
.playlist-box{
     position: fixed;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     z-index: 200;
     background-color:@color-text-d;
     .playlist {
       width: 100%;
       position: absolute;
       left: 0;
       bottom: 0;
       padding: 20px 30px 0 20px;
       background:@color-highlight-background;
       box-sizing: border-box;
       font-size: @font-size-medium;
         .list-header{
               width: 100%;
               padding-bottom: 10px;
               height: 30px;
               position: relative;
               .icon{
                    text-align: left;
                    color: @color-theme;
                    &.disable{
                        color: @color-theme-d;
                    }
                    i{
                        font-size: 30px;
                    }
                    .del{
                       float: right;
                       padding-top: 6px;
                       img{
                        width: 20px;
                        height: 20px;
                       }
                    }
                   span{
                     color: @color-text-l;
                      font-size: @font-size-medium-x;
                      position: absolute;
                      left: 40px;
                      top: 10px;
                    }
               }
         }
         .list-con{
             width: 100%;
             height: 210px;
            //  max-height: 400px;
             overflow: hidden;
            //  background: @color-background-d;
             li{
               width: 100%;
               height: 40px;
               line-height: 40px;
               color:  hsla(0, 0%, 100%, 0.5);
               overflow: hidden;
               position: relative;
                 .icon {
                   width: 14px;
                   height: 40px;
                   display: inline-block;
                   margin-right: 5px;
                    vertical-align: top;
                    line-height: 40px;
                    i{
                        font-size: 14px;
                        color: @color-theme;
                        vertical-align: middle;
                    }
                 }
                 .list2-con{
                      display: inline-block;
                      width: 70%;
                 }
                 .list-end{
                      position: absolute;
                     top: 0;
                     right: 0;
                     width: 60px;
                     height: 40px;
                     // line-height: rem(40);
                     vertical-align: middle;
                     .collect-box{
                         display: inline-block;
                         width: 25px;
                         height:40px;
                     }
                 }
             }
         }
         .list-operate{
              width: 140px;
              height: 30px;
              margin: 20px auto;
              margin-bottom: 70px;
         }
         .list-close{
             width: 100%;
             text-align: center;
             line-height: 50px;
             background:@color-background;
             font-size: 16px;
             color: @color-text-l;
             position: absolute;
             bottom: 0;
             left: 0;
         }
       }
}
.list-fade-enter {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
.list-fade-leave-to {
  transform: translate3d(0, 100%, 0);
}
.list-fade-leave {
  opacity: 1;
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.3s;
}
// 删除列表动画
.list-li-enter-active,
.list-li-leave-active {
  transition: all 0.2s linear;
}
.list-li-enter,
.list-li-leave-to {
  height: 0;
}
</style>

