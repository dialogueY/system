<template>
    <div class="fd-page-box">
        <!-- 左边导航 -->
        <ul class="fd-nav-box">
            <li v-for="item in navList"
                :key="item.key"
                :class="['fd-nav-item fd-icon',item.key,{active:item.key === activeNav.key}]"
                @click="clickNav(item)">
                {{item.name}}
            </li>
        </ul>
        <router-view v-if="activeNav.path"></router-view>
        <div v-else class="fd-build">Buliding...</div>
    </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
@import url(./index.less);
</style>