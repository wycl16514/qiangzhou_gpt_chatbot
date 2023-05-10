import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import CustomHeader from "@/components/CustomHeader"
import Ai from "@/components/CustomMessageForms/Ai"
import Exam from '@/components/exam/exam'

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
                        <Exam />
                    )
                }}
            />
        </div>
    )
}

export default Chat
