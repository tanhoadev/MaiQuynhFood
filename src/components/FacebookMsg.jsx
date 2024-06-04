import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook';
import FacebookChat from './FacebookChat';

function FacebookMsg() {

    return (
        <>
            <h1>hihihsi</h1>1173070237209119
            <FacebookProvider appId="1173070237209119" chatSupport>
                <CustomChat pageId="351071262235120" minimized={true} />
            </FacebookProvider>
        </>
    )
}

export default FacebookMsg