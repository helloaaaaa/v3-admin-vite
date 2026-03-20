<script lang="ts" setup>
import type { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import "@wangeditor/editor/dist/css/style.css"

defineOptions({
  name: "WangEditor"
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  height: {
    type: [Number, String],
    default: 400
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: "请输入内容..."
  }
})

const emit = defineEmits<{
  "update:modelValue": [value: string]
  "change": [value: string]
}>()

const editorRef = shallowRef<IDomEditor | null>(null)

const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.placeholder,
  readOnly: props.disabled,
  MENU_CONF: {
    uploadImage: {
      customUpload: (file: File, insertFn: (url: string, alt: string, href: string) => void) => {
        const reader = new FileReader()
        reader.onload = () => {
          insertFn(reader.result as string, file.name, "")
        }
        reader.readAsDataURL(file)
      }
    }
  }
}

const toolbarConfig: Partial<IToolbarConfig> = {}

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
}

function handleChange(editor: IDomEditor) {
  const value = editor.getHtml()
  emit("update:modelValue", value)
  emit("change", value)
}

watch(
  () => props.disabled,
  (val) => {
    if (editorRef.value) {
      if (val) {
        editorRef.value.disable()
      } else {
        editorRef.value.enable()
      }
    }
  }
)

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor) {
    editor.destroy()
  }
})
</script>

<template>
  <div class="wang-editor-container" :style="{ height: typeof height === 'number' ? `${height}px` : height }">
    <Toolbar
      :editor="editorRef"
      :default-config="toolbarConfig"
      class="toolbar"
      mode="default"
    />
    <Editor
      :model-value="modelValue"
      :default-config="editorConfig"
      class="editor"
      mode="default"
      @on-created="handleCreated"
      @on-change="handleChange"
    />
  </div>
</template>

<style scoped lang="scss">
.wang-editor-container {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;

  .toolbar {
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
  }

  .editor {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
