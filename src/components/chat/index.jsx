import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import CustomHeader from "@/components/CustomHeader"
import StandardMessageForm from "@/components/CustomMessageForms/StandardMessageForm"
import Ai from "@/components/CustomMessageForms/Ai"


function Chat({ user, secret }) {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        user,
        secret,
    )

    return (
        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <CustomHeader chat={chat}></CustomHeader>}
                renderMessageForm={(props) => {
                    return <Ai props={props} activeChat={chatProps.chat} />
                }}

                renderOptionsSettings={(creds, chat) => {
                    return (
                        <div>render options</div>
                    )
                }}
            />
        </div>
    )
}

export default Chat
