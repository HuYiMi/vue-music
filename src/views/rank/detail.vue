<template>
    <transition name="slide">
        <song-list :title="title" :img="bgUrl" :list="songsList"></song-list>
    </transition>
</template>

<script>
import {getRankInfo} from '@/api'
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
        this.getRankInfo()
    },
    methods: {
        getRankInfo(){
            let rankId=this.$route.params.id
           getRankInfo(rankId).then(res=>{
                console.log(res)
               this.songsList=this.editSongs(res.songlist)
               this.bgUrl=res.topinfo.pic_v12
               this.title=res.topinfo.ListName
            //    console.log(res.data.list)
            })
        },
        editSongs(list){
            let nList=[]
            for(var i=0;i<list.length;i++){
                let item={
                    // 不全
                    // id
                    id:list[i].data.songid,
                    // mid
                    mid:list[i].data.songmid,
                    // 歌曲名
                    name:list[i].data.songname,
                    // 歌手姓名
                    singer:list[i].data.singer,
                    // 专辑名
                    album:list[i].data.albumname,
                     // 专辑图片
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].data.albummid}.jpg?max_age=2592000`,
                    // 歌曲连接
                    songmid:list[i].data.songmid,
                    // url:`http://dl.stream.qqmusic.qq,com/C400${list[i].musicData.songmid}/${list[i].musicData.songid}.m4a?guid=983915916&fromtag=66`,
                    // 歌曲时长
                    interval:list[i].data.interval,
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

