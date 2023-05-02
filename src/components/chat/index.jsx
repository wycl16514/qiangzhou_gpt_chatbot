import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import CustomHeader from "@/components/CustomHeader"
import StandardMessageForm from "@/components/CustomMessageForms/StandardMessageForm"
import Ai from "@/components/CustomMessageForms/Ai"

function Chat() {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        "chenyi",
        "1234",
    )

    return (
        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <CustomHeader chat={chat}></CustomHeader>}
                renderMessageForm={(props) => {

                    if (chatProps.chat?.title.startsWith("AiChat_")) {
                        return <Ai props={props} activeChat={chatProps.chat} />
                    }

                    return (
                        <StandardMessageForm props={props} activeChat={chatProps.chat} />
                    )
                }}
            />
        </div>
    )
}

export default Chat
