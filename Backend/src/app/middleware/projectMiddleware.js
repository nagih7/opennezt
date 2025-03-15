export const decodeFormData = async (req, res, next) => {
    const {
        name,
        description,
        industries,
        stage,
        revenues,
        funding_sources,
        additional_infos,
        logo,
        background,
    } = req.body

    const nameDecoded = name
    const descriptionDecoded = description
    const industriesDecoded = JSON.parse(industries)
    const stageDecoded = JSON.parse(stage)
    const revenuesDecoded = JSON.parse(revenues)
    const fundingSourcesDecoded = JSON.parse(funding_sources)
    const additionalInfosDecoded = JSON.parse(additional_infos)
    const logoDecoded = logo
    const backgroundDecoded = background

    // revenuesDecoded.forEach((revenue, index, array) => {
    //     Object.keys(revenue).forEach((key) => {
    //         if (revenue[key] === '') {
    //             delete array[index][key]
    //         }
    //     })
    // })

    console.log('revenuesDecoded', revenuesDecoded)

    req.body = {
        name: await name,
        description: await description,
        industries: await JSON.parse(industries),
        stage: await JSON.parse(stage),
        revenues: await JSON.parse(revenues),
        funding_sources: await JSON.parse(funding_sources),
        additional_infos: await JSON.parse(additional_infos),
        logo: await logo,
        background: await background,
    }
    next()
}
