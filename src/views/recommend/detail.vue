<template>
    <transition name="slide">
        <song-list :title="title" :img="bgImg" :list="songsList"></song-list>
    </transition>
</template>

<script>
import {getCdInfo, getkey} from '@/api'
import SongList from '@/components/songsList'
export default {
    data() {
        return {
            songsList:[],
            title:"",
            bgImg:""
        }
    },
    created() {
        this. getCdInfoList()
    },
    methods: {
        getCdInfoList(){
            getCdInfo().then(res=>{
                console.log(res)
                this.title=res.data.cdlist[0].dissname
                this.bgImg=res.data.cdlist[0].logo
                this.songsList=this.editSongs(res.data.cdlist[0].songlist)
            })
        },
        editSongs(list){
            let nList=[]
            for(var i=0;i<list.length;i++){
                let item={
                    // 不全
                    // id
                    id:list[i].songid,
                    // 歌曲名
                    name:list[i].songname,
                    // 歌手姓名
                    singer:list[i].singer,
                    // 专辑名
                    album:list[i].albumname,
                    // 专辑图片
                    img:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${list[i].albummid}.jpg?max_age=2592000`,
                    // 歌曲时长
                    interval:list[i].interval,
                    // 歌曲mid
                    songmid:list[i].songmid
                    // url:function(){
                    //      getkey(list[i].songmid).then(res=>{
                    //     item.url=`http://172.90.7.1:8081/IXC603fbb8c3a651733ac9592cac82cb7cc/amobile.music.tc.qq.com/C40${res.data.items[0].songmid}.m4a?guid=9170706278&vkey=${res.data.items[0].vkey}&uin=0&fromtag=38`
                    //     console.log(item)
                    //    })
                    // }
                }
                nList.push(item)
            }
            return nList
            console.log(nList)
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
</style>

