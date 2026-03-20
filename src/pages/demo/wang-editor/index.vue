<script lang="ts" setup>
import WangEditor from "@@/components/WangEditor/index.vue"

defineOptions({
  name: "WangEditorDemo"
})

const content1 = ref("<h2>WangEditor 富文本编辑器演示</h2><p>这是一个基于 WangEditor 的富文本编辑器示例。</p><ul><li>支持基本的文本格式化</li><li>支持图片上传</li><li>支持表格编辑</li><li>中文友好，开箱即用</li></ul>")

const content2 = ref("<p>这是第二个编辑器实例，可以设置不同的高度。</p>")

const readonlyContent = ref("<p>这是只读模式的内容，用户无法编辑。</p>")

const isReadonly = ref(true)

function getContent() {
  ElMessage.success("当前内容已打印到控制台")
  console.log("编辑器内容:", content1.value)
}

function clearContent() {
  content1.value = ""
}

function setContent() {
  content1.value = "<h3>设置的新内容</h3><p>这是通过按钮设置的内容。</p>"
}
</script>

<template>
  <div class="app-container">
    <el-card header="WangEditor 富文本编辑器" class="mb-20px">
      <el-alert
        title="使用说明"
        type="info"
        description="WangEditor 是国产开源富文本编辑器，中文友好、配置简单、开箱即用。"
        :closable="false"
        class="mb-20px"
      />
      <div class="mb-20px">
        <el-button type="primary" @click="getContent">
          获取内容
        </el-button>
        <el-button type="warning" @click="clearContent">
          清空内容
        </el-button>
        <el-button type="success" @click="setContent">
          设置内容
        </el-button>
      </div>
      <WangEditor v-model="content1" :height="400" placeholder="请输入内容..." />
    </el-card>

    <el-card header="不同高度配置" class="mb-20px">
      <WangEditor v-model="content2" :height="250" placeholder="高度设置为 250px" />
    </el-card>

    <el-card header="只读模式">
      <div class="mb-10px">
        <el-switch v-model="isReadonly" active-text="只读" inactive-text="可编辑" />
      </div>
      <WangEditor v-model="readonlyContent" :height="200" :disabled="isReadonly" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.app-container {
  padding: 20px;
}

.mb-10px {
  margin-bottom: 10px;
}

.mb-20px {
  margin-bottom: 20px;
}
</style>
