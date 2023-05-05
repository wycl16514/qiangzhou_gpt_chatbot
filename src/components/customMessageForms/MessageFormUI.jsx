import React from 'react'
import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react'
import Dropzone from 'react-dropzone';

function MessageFormUI({
    setAttachment,
    message,
    handleChange,
    handleSubmit,
}) {
    const [preview, setPreview] = useState("");
    return (
        <div >
            <div className='message-form-container'>
                {preview && (
                    <div className="mesage-form-preview">
                        <img alt="message-form-preview"
                            className='message-form-preview-image' src={preview}
                            onLoad={() => URL.revokeObjectURL(preview)} />

                        <XMarkIcon
                            className='message-form-icon-x'
                            onClick={() => {
                                setPreview("")
                                setAttachment("")
                            }}
                        />
                    </div>
                )}

                <div className='message-form'>
                    <div class="message-form-input-container">
                        <input className='message-form-input'
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="在输入开头加@，消息将发送给强洲GPT"
                        >
                        </input>

                    </div>
                    <div className='message-form-icons'>
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                setAttachment(acceptedFiles[0])
                                setPreview(URL.createObjectURL(acceptedFiles[0]))
                            }}>
                            {({ getRootProps, getInputProps, open }) => (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()}></input>
                                    <PaperClipIcon className='message-form-icon-clip'
                                        onClick={open}
                                    >

                                    </PaperClipIcon>
                                </div>
                            )}
                        </Dropzone>
                        <hr className='vertical-line'></hr>
                        <PaperAirplaneIcon className='message-form-icon-airplane'
                            onClick={() => {
                                setPreview("");
                                handleSubmit()
                            }}></PaperAirplaneIcon>

                    </div>
                </div>
            </div >
        </div>

    )
}

export default MessageFormUI
