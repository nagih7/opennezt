export const decodeFormData = async (req, res, next) => {
    const { name, description, industries, stage, revenues, funding_sources, additional_infos, logo, background } =
        req.body

    const nameDecoded = name
    const descriptionDecoded = description
    const industriesDecoded = JSON.parse(industries)
    const stageDecoded = stage
    const revenuesDecoded = JSON.parse(revenues)
    const fundingSourcesDecoded = JSON.parse(funding_sources)
    const additionalInfosDecoded = JSON.parse(additional_infos)
    const logoDecoded = logo && logo !== 'null' ? logo : ''
    const backgroundDecoded = background && background !== 'null' ? background : ''

    req.body = {
        name: await nameDecoded,
        description: await descriptionDecoded,
        industries: await industriesDecoded,
        stage: await stageDecoded,
        revenues: (await revenuesDecoded[0]) !== null ? revenuesDecoded : null,
        funding_sources: (await fundingSourcesDecoded[0]) !== null ? fundingSourcesDecoded : null,
        additional_infos: (await additionalInfosDecoded[0]) !== null ? additionalInfosDecoded : null,
        logo: await logoDecoded,
        background: await backgroundDecoded,
    }
    console.log(req.body)
    next()
}

export const decodeLogo = async (req, res, next) => {
    const { logo } = req.body
    const logoDecoded = logo
    req.body = {
        logo: await logoDecoded,
    }
    next()
}
export const decodeBackground = async (req, res, next) => {
    const { background } = req.body
    const backgroundDecoded = background
    req.body = {
        background: await backgroundDecoded,
    }
    next()
}

export const decodeNewMemberActivity = async (req, res, next) => {
    const { user_id, project_id } = req.body
    const userIdDecoded = user_id
    const projectIdDecoded = project_id

    req.body = {
        user_id: await userIdDecoded,
        project_id: await projectIdDecoded,
    }
    next()
}
