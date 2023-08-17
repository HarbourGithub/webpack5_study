import zh_CN from './languageJson/zh_CN.json'
import en_US from './languageJson/en_US.json'
import fr_FR from './languageJson/fr_FR.json'

type LanguageType = 'zh' | 'en' | 'fr'

type LanguageJsonType = {
    [key: string]: string
}

type LanguageMessageType = {
    [key in LanguageType]: LanguageJsonType
}

type LanguageListType = {
    label: string,
    value: LanguageType
}[]

const languageList: LanguageListType = [
    {
        label: '简体中文',
        value: 'zh'
    },
    {
        label: 'English',
        value: 'en'
    },
    {
        label: 'Français',
        value: 'fr'
    }
]

const languageMessage: LanguageMessageType = {
    zh: zh_CN as LanguageJsonType,
    en: en_US as LanguageJsonType,
    fr: fr_FR as LanguageJsonType
}

export {
    LanguageType,
    LanguageJsonType,
    languageList,
    languageMessage
}