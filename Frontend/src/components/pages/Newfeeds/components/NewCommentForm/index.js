import React, { useEffect } from 'react'
import { IconlyImage2, IconlySend } from 'components/UI/Iconly'
import avt from 'assets/images/background/avt.jpg'
import { useSelector } from 'react-redux'
import { FileUpload } from '@chakra-ui/react'
import { useState } from 'react'
import { resetComment, resetReply } from 'states/modules/article'
import { useDispatch } from 'react-redux'
import resizeBackground from 'utils/files/resizeBackground'
const NewCommentForm = ({ article_id, onSubmit, selectedComment, isCommentOrReply }) => {
    const dispatch = useDispatch()
    const authUser = useSelector((state) => state.auth.authUser)
    const [formData, setFormData] = useState({
        article_id: article_id,
        content: {
            caption: '',
            image: '',
        },
    })

    const [fileKey, setFileKey] = useState(0)

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        const resizeFile = await resizeBackground(file)

        setFormData({
            ...formData,
            content: {
                ...formData.content,
                image: resizeFile,
            },
        })
    }

    const handleSubmit = async () => {
        await onSubmit(formData)
        if (isCommentOrReply === 'reply') {
            dispatch(resetReply())
        } else {
            dispatch(resetComment())
        }
        setFormData({
            article_id: article_id,
            content: {
                caption: '',
                image: '',
            },
        })
        setFileKey((prev) => prev + 1)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault() // Prevent default enter behavior
            if (formData.content.caption.trim()) {
                // Only submit if there's content
                handleSubmit()
            }
        }
    }

    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            content: {
                ...formData.content,
                image: '',
            },
        })
    }

    const handlePreviewImage = () => {
        const image = formData.content.image
        if (formData.content.image) {
            return (
                <div className="relative mt-2" style={{ width: '15vw' }}>
                    <div className="relative">
                        <button
                            className="absolute top-1 right-1 text-[30px] text-[#6f7f92] rounded-full w-6 h-6 flex items-center justify-center z-[999999]"
                            onClick={() => handleRemoveImage()}
                        >
                            ×
                        </button>
                        <img
                            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                            className="object-cover rounded-md auto"
                        />
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="flex items-center w-full rounded-md " onKeyDown={handleKeyDown}>
                <div className="flex items-center p-3">
                    <div className="w-8 h-8">
                        {authUser?.avatar ? (
                            <img src={authUser.avatar} className="w-8 h-8 rounded-full" />
                        ) : (
                            <img src={avt} className="w-8 h-8 rounded-full" />
                        )}
                    </div>
                </div>
                <div className="flex items-center bg-[#F8F9FA] p-3 rounded-md w-full justify-between">
                    <div className="w-full flex-2">
                        <div className="w-full pb-2 flex-2">
                            {isCommentOrReply === 'reply' ? (
                                <input
                                    type="text"
                                    placeholder={`Replying to ${selectedComment.user[0].name} ...`}
                                    className="w-full h-9 bg-[#F8F9FA] pr-[50px] outline-none "
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            content: {
                                                ...formData.content,
                                                caption: e.target.value,
                                            },
                                        })
                                    }
                                    value={formData.content.caption}
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="w-full h-9 bg-[#F8F9FA] pr-[50px] outline-none "
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            content: {
                                                ...formData.content,
                                                caption: e.target.value,
                                            },
                                        })
                                    }
                                    value={formData.content.caption}
                                />
                            )}

                            <div className="p-1">{formData.content.image && handlePreviewImage()}</div>
                        </div>
                        <div className="w-1 h-1 bg-[#f8f9fa] rounded-md flex items-center justify-center">
                            <FileUpload.Root
                                accept="image/*"
                                value={formData.content.image}
                                onChange={handleFileChange}
                                key={fileKey}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <div className="flex items-center justify-center p-0 cursor-pointer">
                                        <IconlyImage2 size={25} color={'#6f7f92'} />
                                    </div>
                                </FileUpload.Trigger>
                            </FileUpload.Root>
                        </div>
                    </div>
                    {formData.content.image || formData.content.caption ? (
                        <div className="flex" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
                            <IconlySend size={30} color={'#6f7f92'} />
                        </div>
                    ) : (
                        <div className="flex" style={{ cursor: 'pointer' }}>
                            <IconlySend size={30} color={'#6f7f92'} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewCommentForm
