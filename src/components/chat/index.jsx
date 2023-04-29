import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import CustomHeader from "@/components/CustomHeader"
function Chat() {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        "chenyi",
        "1234",
    )
    console.log("project id: ", import.meta.env)
    return (
        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <CustomHeader chat={chat}></CustomHeader>}
            />
        </div>
    )
}

export default Chat
