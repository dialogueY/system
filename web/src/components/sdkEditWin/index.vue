<template>
    <div class="fd-win-box">
      <!-- 遮罩 -->
      <div class="fd-mask"></div>
      <div class="fd-win-main">
        <!-- 弹窗头部 -->
        <div class="fd-win-header">
            {{title}}
            <span class="fd-close-win" @click="close">x</span>
        </div>
        <!-- 弹窗内容 -->
        <div class="fd-win-content">
            <p class="fd-label required">Client name:</p>
            <input type="text" class="fd-input" 
                    ref="Clientname" v-model="formData.Clientname"
                    @blur="blurInput">
            <p class="fd-label required">Board:</p>
            <input type="text" class="fd-input"
                    ref="Boardname" v-model="formData.Boardname"
                    @blur="blurInput">
            <p class="fd-label">Tags
                <span class="fd-icon fd-icon-tag"
                        title="Multiple split by semicolon"></span>:
            </p>
            <input type="text" class="fd-input"
                    ref="Tags" v-model="formData.Tags">
            <p class="fd-label required">Requestor:</p>
            <input type="text" class="fd-input"
                    ref="Requestor" v-model="formData.Requestor"
                    @blur="blurInput">
        </div>
        <!-- 弹窗底部 -->
        <div class="fd-win-footer">
            <button class="fd-btn fd-btn-cancle" @click="close">Cancle</button>
            <button class="fd-btn fd-btn-submit" @click="submit">Submit</button>
        </div>
      </div>
    </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped>
@import url('./index.less');
</style>
  