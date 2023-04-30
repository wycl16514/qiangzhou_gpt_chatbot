import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { useState } from 'react'

function StandardMessageForm() {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [preview, setPreview] = useState("")
    return (
        <div className='message-form-container'>
            {preview && (
                <div className="mesage-form-preview">
                    <img alt="message-form-preview"
                        className='message-form-preview-image' src={preview}
                        onLoad={() => URL.revokeObjectURL(preview)} />
                </div>
            )}
            <XMarkIcon
                className='message-form-icon-x'
                onClick={() => {
                    setPreview("")
                    setAttachment("")
                }}
            />
        </div>
    )
}

export default StandardMessageForm
