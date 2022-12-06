<template>
    <div class="fd-page-main">
        <!-- 查询条件 开始 -->
        <div class="fd-top">
            <!-- 标题 -->
            <h4 class="fd-title">{{name}}</h4>
            <!-- 右边搜索部分 -->
            <div class="fd-top-right">
                <!-- 搜索框 -->
                <div class="fd-search-box fd-icon">
                    <input class="fd-input"
                            type="text"
                            v-model="searchText"
                            placeholder="Search client name,board name,tags,requestor">
                </div>
                <!-- 按钮 -->
                <button class="fd-icon fd-btn fd-btn-add"
                    @click="openWin()">Create SDK</button>
            </div>
        </div>
        <!-- 查询条件 结束 -->
        <!-- 列表区域 -->
        <div class="fd-list-box" ref="listBox">
            <!-- 标题 -->
            <div class="fd-list-item fd-list-header">
                <span v-for="item in headerData"
                    :key="item.name"
                    :class="['fd-list-text',item.class]">
                    {{item.name}}
                </span>
            </div>
            <!-- 出滚区域 -->
            <div class="fd-list-scroll" @scroll="scrollEvent($event)">
                <div class="fd-virtual-height" v-html="virtualHtml"></div>
                <ul class="fd-list-main" :style="{ transform: getTransform }">
                    <li v-for="(item,listIndex) in showListData"
                        :key="item.key"
                        class="fd-list-item">
                        <span v-for="headerName in headerData"
                            :key="headerName.name"
                            :class="['fd-list-text',headerName.class]">
                            <!-- 如果是tags -->
                            <template v-if="headerName.name ==='Tags' && item.Tags">
                                <template v-if="item.Tags.length">
                                    <span v-for="(tags,index) in item.Tags.slice(0,2)"
                                        :key="(tags+index)"
                                        class="fd-tag" v-html="tags"></span>
                                    <span v-if="item.Tags.length>2"
                                        class="fd-tag">+{{(item.Tags.length-2)}}</span>
                                </template>
                            </template>
                            <!-- 如果是SDK script -->
                            <template v-else-if="headerName.name ==='SDK script'">
                                <a class="fd-blue">SDK</a>
                            </template>
                            <!-- 如果是操作列 -->
                            <template v-else-if="headerName.name ==='Actions'">
                                <span class="fd-icon fd-edit-icon"
                                    @click="openWin(item,listIndex)"></span>
                                <span class="fd-icon fd-delete-icon"></span>
                            </template>
                            <!-- 是文本内容 -->
                            <span  v-else v-html="item[headerName.name.split(' ').join('')]"></span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="fd-list-item fd-pl10">Total:{{listTotal}}</div>
        </div>
        <!-- 添加弹窗 -->
        <sdk-edit-win :title="winTitle"
                    :editData="editData"
                    v-show="showWin"
                    @close="closeWin"
                    @submit="submitSdk"></sdk-edit-win>
    </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
@import url(./index.less);
</style>