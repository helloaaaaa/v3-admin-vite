<script lang="ts" setup>
import { Setting } from "@element-plus/icons-vue"
import { useI18n } from "vue-i18n"
import { setI18nLanguage } from "@/i18n"

const { locale, t } = useI18n()

const currentLang = computed(() => {
  return locale.value === "zh-CN" ? "中文" : "EN"
})

function changeLang(lang: string) {
  setI18nLanguage(lang)
  ElMessage.success(t("common.success"))
}
</script>

<template>
  <el-dropdown trigger="click">
    <div class="lang-switch">
      <el-icon><Setting /></el-icon>
      <span class="lang-text">{{ currentLang }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :active="locale === 'zh-CN'"
          @click="changeLang('zh-CN')"
        >
          简体中文
        </el-dropdown-item>
        <el-dropdown-item
          :active="locale === 'en-US'"
          @click="changeLang('en-US')"
        >
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.lang-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  .lang-text {
    margin-left: 5px;
    font-size: 14px;
  }
}
</style>
