import React, { memo, ChangeEvent } from 'react'
import { languageList, LanguageType } from '@src/language'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { StateType } from '@src/reduxToolkit/stateType'
import { changeLanguageAction } from '@src/reduxToolkit/states/language'

type StoreSelector = {
    language: string
}

function Demo02() {

    const dispatch = useDispatch()

    const storeSelector = (state: StateType) => ({
        language: state.language
    }) as StoreSelector

    const { language } = useSelector(storeSelector, shallowEqual) as StoreSelector

    const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value !== language) {
            dispatch(changeLanguageAction(e.target.value as LanguageType))
        }
    }

    return (
        <div>
            <select onChange={handleChangeLanguage} value={language}>
                {
                    languageList.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default memo(Demo02)