<template>
    <div class="tabs">
        <router-link to="recommend" class="tab-item">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link to="singer" class="tab-item">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link to="rank" class="tab-item">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link to="search" class="tab-item">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 @import '~@/common/less/variable.less';
 .tabs{
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: @font-size-medium;
    .tab-item{
        flex: 1;
        text-align: center;
        .tab-link{
            color: @color-text-l;
            padding-bottom: 6px;
        }
        &.router-link-active{
            .tab-link{
                color:@color-theme;
                border-bottom:2px solid @color-theme;
            }
        }
    }
 }
</style>
