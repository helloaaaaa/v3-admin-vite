import { createI18n } from "vue-i18n"
import { getLocale, setLocale } from "@/common/utils/local-storage"

// 导入语言包
const modules = import.meta.glob("./langs/*.json", { eager: true })

const messages: Record<string, any> = {}

Object.keys(modules).forEach((key) => {
  const langKey = key.match(/langs\/([\w-]+)\.json$/)?.[1]
  if (langKey) {
    messages[langKey] = (modules[key] as any).default
  }
})

// 获取本地存储的语言设置，如果没有则使用浏览器语言
const locale = getLocale() || (navigator.language.toLowerCase() === "zh-cn" ? "zh-CN" : "en-US")

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: "zh-CN",
  messages,
  globalInjection: true
})

/**
 * 设置语言
 * @param lang 语言代码，如 'zh-CN'、'en-US'
 */
export function setI18nLanguage(lang: string) {
  i18n.global.locale.value = lang
  setLocale(lang)
  document.querySelector("html")?.setAttribute("lang", lang)
}

export default i18n
