import React, { memo, useState, useTransition } from 'react'
import List from './list'

function ContactTab() {
    return (
        <>
            <p>
                You can find me online here:
            </p>
            <ul>
                <li>admin@mysite.com</li>
                <li>+123456789</li>
            </ul>
        </>
    )
}

function AboutTab() {
    return (
        <p>Welcome to my profile!</p>
    )
}

function TabButton({ children, isActive, onClick }) {
    if (isActive) {
        return <b>{children}</b>
    }
    return (
        <button onClick={() => {
            onClick()
        }}>
            {children}
        </button>
    )
}


function Demo08() {

    const [isPending, startTransition] = useTransition()
    const [tab, setTab] = useState('about')

    function selectTab(nextTab: string) {
        startTransition(() => {
            setTab(nextTab)
        })
    }

    return (
        <div>
            <p>This is Demo08 Page</p>
            <TabButton
                isActive={tab === 'about'}
                onClick={() => selectTab('about')}
            >
                About
            </TabButton>
            <TabButton
                isActive={tab === 'posts'}
                onClick={() => selectTab('posts')}
            >
                Posts (slow)
            </TabButton>
            <TabButton
                isActive={tab === 'contact'}
                onClick={() => selectTab('contact')}
            >
                Contact
            </TabButton>
            <hr />
            {tab === 'about' && <AboutTab />}
            {tab === 'posts' && <List inputValue='123'/>}
            {tab === 'contact' && <ContactTab />}
        </div>
    )
}

export default memo(Demo08)