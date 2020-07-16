<template>
    <transition name="slide">
        <song-list :title="title" :img="bgUrl" :list="songsList"></song-list>
    </transition>
</template>

<script>
import {getSingerInfo} from '@/api'
import SongList from '@/components/songsList'
export default {
    data() {
        return {
            songsList:[],
            title:"",
            bgUrl:""
        }
    },
    created() {
        this.getSingerInfo()
    },
    methods: {
        getSingerInfo(){
            let singerId=this.$route.params.id
           getSingerInfo(singerId).then(res=>{
                console.log(res.data)
               this.songsList=this.editSongs(res.data.list)
               this.bgUrl=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
               this.title=res.data.singer_name
            //    console.log(res.data.list)
            })
        },
        editSongs(list){
            let nList=[]
            for(var i=0;i<list.length;i++){
                let item={
                    // 不全
                    // id
                    id:list[i].musicData.songid,
                    // mid
                    mid:list[i].musicData.songmid,
                    // 歌曲名
                    name:list[i].musicData.songname,
                    // 歌手姓名
                    singer:list[i].musicData.singer,
                    // 专辑名
                    album:list[i].musicData.albumname,
                     // 专辑图片
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].musicData.albummid}.jpg?max_age=2592000`,
                    // 歌曲连接
                    songmid:list[i].musicData.songmid,
                    // url:`http://dl.stream.qqmusic.qq,com/C400${list[i].musicData.songmid}/${list[i].musicData.songid}.m4a?guid=983915916&fromtag=66`,
                    // 歌曲时长
                    interval:list[i].musicData.interval,
                }
                nList.push(item)
            }
            return nList
        }
    },
     components:{
       SongList,
    },
}
</script>

<style lang="less" scoped>
@import '~@/common/less/variable.less';
// .detail{
//     position: fixed;
//     top: 0;
//     width: 100%;
//     z-index: 99;
//     bottom: 0;
//      background: @color-background; 
// }
// .detail-enter,.detail-leave-to{
//     transform: translate3d(100%,0,0)
// }
// .detail-enter-active,.detail-leave-active{
//     transition: all 0.5s;
// }
.slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
}
.slide-enter,.slide-leave-to{
    transform: translate3d(100%,0,0)
}
</style>

