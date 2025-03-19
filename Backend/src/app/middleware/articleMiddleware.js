export const decodeFormData = async (req, res, next) => {
    const {caption, hashtags, audience, status, project_id, attachment} = req.body

    const captionDecode = caption
    const hashtagsDecode = JSON.parse(hashtags)
    const audienceDecode = audience
    const statusDecode = status
    const project_idDecode = project_id
    const attachmentDecode = Array.isArray(attachment) ? attachment : [attachment]

    req.body = {
        content: {
            caption: await captionDecode,
            hashtags: await hashtagsDecode,
            attachment: await attachmentDecode,
        },
        audience: await audienceDecode,
        status: await statusDecode,
        project_id: await project_idDecode,
    }
    next()
}
