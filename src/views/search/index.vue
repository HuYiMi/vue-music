<template>
   <div class="search">
    <div class="search-input">
         <img class="togo" src="./togo.png" alt="搜索" title="搜索">
         <input  class="input-box" :placeholder="placeholder" />
    </div>
     <div class="searchlist">
       <Scroll class="scroll" ref="scroll" >
         <div class="scroll-box">
          <div class="hotkey">
          <h1 class="title">热门搜索</h1>
          <span  class="hotCon" v-for="item in getHotKeyList" :key="item.key">{{ item.k }}</span>
          </div>
        <!-- <div class="search-history">
          <h1 class="title" v-show="searchHistory.length">搜索历史<img src="./del.png" alt="" @click="historyClear"></h1>
          <historyList @select="hotkeyClick1" :searchList="searchHistory"></historyList>
        </div> -->
        </div>
       </Scroll>
     </div>
   </div>
</template>

<script>
import  {getHotKey} from '@/api/'
import Scroll from '@/components/scroll'
export default {
        data() {
       return {
        //    searchList:[],
           getHotKeyList:[]
       }
   },
    props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
   components:{
        Scroll
    },
     created(){
        // this.searchData();
        this.getHotKeyData()
    },
    methods: {
        // searchData(){
        //     search().then(res=>{
        //          this.searchList=res.data.song.list,
        //         //  this.isLoading=false
        //         console.log(res.data)
        //     })
        // },
        getHotKeyData(){
            getHotKey().then(res=>{
                this.getHotKeyList=res.data.hotkey.slice(0, 10);
                console.log(res.data)
            })
        }
    },
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
   .search-input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 90%;
    padding: 20px;
    height: 40px;
    background: @color-highlight-background;
    border-radius: 4px;
    margin: 20px auto;
    .input-box {
    flex: 1;
    line-height: 40px;
    background: @color-highlight-background;
    color: @color-text;
    font-size: @font-size-medium ;
    outline: none;
    border: none;
    text-indent: 10px;
    }
    img{
        width: 20px;
        height: 20px;
    }
}
.searchlist{
    position: fixed;
    top: 180px;
    bottom: 0;
    width: 100%;
    .scroll {
     width: 100%;
     overflow: hidden;
     height:100% ;
     position: fixed;
     top:180px;
    //  bottom:0;
     margin-left: 20px;
    .scroll-box {
     padding-bottom: 10px;
     .hotkey {
       overflow: hidden;
       box-sizing: border-box;
       font-size: @font-size-large;
       line-height: @font-size-large-x;
         .title{
           color: @color-text-l;
           font-size: @font-size-large;
           margin-bottom: 20px;
         }
        .hotCon{
           display: inline-block;
           padding: 5px 10px;
           border-radius: 4px;
           font-size: @font-size-medium-x;
           color: @color-text-d ;
           margin-bottom: 10px;
           margin-right:20px;
           background: rgb(51, 51, 51);
       }
     }
  }
 }
}
</style>

