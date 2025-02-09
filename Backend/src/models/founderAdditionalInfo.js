import createModel, {ObjectId} from './base'

const FounderAdditionalInfo = createModel('FounderAdditionalInfo', 'founder_additional_infos', {
    founder_profile_id: {
        type: ObjectId,
        ref: 'Founder_Profile',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: '',
    },
    content: {
        type: String,
        required: false,
    },
})

export default FounderAdditionalInfo
