<script lang="ts" setup>
import type { RouteRecordRaw } from "vue-router"
import { isExternal } from "@@/utils/validate"
import path from "path-browserify"
import { useI18n } from "vue-i18n"
import Link from "./Link.vue"

interface Props {
  item: RouteRecordRaw
  basePath?: string
}

const { item, basePath = "" } = defineProps<Props>()

const { t } = useI18n()

/** 标题国际化映射 */
const titleMap: Record<string, string> = {
  "首页": "sidebar.dashboard",
  "示例集合": "sidebar.demo",
  "Element Plus": "sidebar.elementPlus",
  "Vxe Table": "sidebar.vxeTable",
  "二级路由": "sidebar.secondLevel",
  "三级路由": "sidebar.thirdLevel",
  "组合式函数": "sidebar.composableDemo",
  "权限演示": "sidebar.permission",
  "页面级": "sidebar.pagePermission",
  "按钮级": "sidebar.buttonPermission",
  "文档链接": "sidebar.demo",
  "中文文档": "sidebar.demo",
  "新手教程": "sidebar.demo",
  "UnoCSS": "sidebar.unocssDemo",
  "多级菜单": "sidebar.multiLevel"
}

/** 获取国际化标题 */
function getI18nTitle(title: string) {
  const key = titleMap[title]
  return key ? t(key) : title
}

/** 是否始终显示根菜单 */
const alwaysShowRootMenu = computed(() => item.meta?.alwaysShow)

/** 显示的子菜单 */
const showingChildren = computed(() => item.children?.filter(child => !child.meta?.hidden) ?? [])

/** 显示的子菜单数量 */
const showingChildNumber = computed(() => showingChildren.value.length)

/** 唯一的子菜单项 */
const theOnlyOneChild = computed(() => {
  const number = showingChildNumber.value
  switch (true) {
    case number > 1:
      return null
    case number === 1:
      return showingChildren.value[0]
    default:
      return { ...item, path: "" }
  }
})

/** 解析路径 */
function resolvePath(routePath: string) {
  switch (true) {
    case isExternal(routePath):
      return routePath
    case isExternal(basePath):
      return basePath
    default:
      return path.resolve(basePath, routePath)
  }
}
</script>

<template>
  <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
    <Link v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
      <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
        <SvgIcon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" class="svg-icon" />
        <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
        <template v-if="theOnlyOneChild.meta.title" #title>
          <span class="title">{{ getI18nTitle(theOnlyOneChild.meta.title) }}</span>
        </template>
      </el-menu-item>
    </Link>
  </template>
  <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
    <template #title>
      <SvgIcon v-if="item.meta?.svgIcon" :name="item.meta.svgIcon" class="svg-icon" />
      <component v-else-if="item.meta?.elIcon" :is="item.meta.elIcon" class="el-icon" />
      <span v-if="item.meta?.title" class="title">{{ getI18nTitle(item.meta.title) }}</span>
    </template>
    <template v-if="item.children">
      <Item
        v-for="child in showingChildren"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </template>
  </el-sub-menu>
</template>

<style lang="scss" scoped>
@import "@@/assets/styles/mixins.scss";

.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em !important;
  margin-right: 12px !important;
  font-size: 18px;
}

.title {
  @extend %ellipsis;
}
</style>
