// I18n
import {createI18n} from 'vue-i18n'

// 引入 element-plus 的多语言
import enLocale from 'element-plus/es/locale/lang/en'
import zhCnLocale from 'element-plus/es/locale/lang/zh-cn'
import zhTwLocale from 'element-plus/es/locale/lang/zh-tw'

// 引入自己定义的 I18n 文件
import en from './en.json'
import cn from './zh-cn.json'
import tw from './zh-tw.json'



// 默认中文
const messages = {
    en: {
        ...enLocale,
        ...en
    },
    'zh-cn': {
        ...zhCnLocale,
        ...cn
    },
    'zh-tw': {
        ...zhTwLocale,
        ...tw
    },
}
export const getLocale = () => {
    // 获取缓存
    const storeLanguage = localStorage.getItem('language')
    // 存在返回当前语言
    if (storeLanguage) return storeLanguage
    // 不存在 获取系统语言
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    // 默认返回简体中文
    return 'zh-cn'
}
const i18n = new createI18n({
    locale: getLocale(),
    messages,
    globalInjection: true,
    legacy: false,  // 是否启用传统模式设置为 false，启用 composition API 模式
})
export default i18n
