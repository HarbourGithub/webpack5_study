import React from 'react'
import { IntlProvider } from 'react-intl'
import { languageMessage, LanguageJsonType } from '@src/language'
import { useSelector, shallowEqual } from 'react-redux'
import { StateType } from '@src/reduxToolkit/stateType'
import Demo01 from '@pages/intlDemo/demo01'
import Demo02 from '@pages/intlDemo/demo02'

type StoreSelector = {
    language: string
}

function IntlApp() {

    const storeSelector = (state: StateType) => ({
        language: state.language
    }) as StoreSelector

    const { language } = useSelector(storeSelector, shallowEqual) as StoreSelector

    return (
        <IntlProvider locale={language} messages={languageMessage[language] as LanguageJsonType}>
            <Demo01 />
            <hr />
            <Demo02 />
        </IntlProvider>
    )
}

export default IntlApp