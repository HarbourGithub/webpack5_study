import React, { memo } from 'react'
import { useIntl } from 'react-intl'

function Demo02() {

    const { formatMessage } = useIntl()

    return (
        <div>
            <h1>{formatMessage({ id: 'pageTitle' })}</h1>
            <h2>
                {formatMessage({ id: 'pageContent1' }, {
                    name: '杭州公安',
                    text: formatMessage({ id: 'pageTitle' })
                })}
            </h2>
        </div>
    )
}

export default memo(Demo02)