import createModel, {ObjectId} from './base'

const ProfileAdditionalInfo = createModel('Profile_Additional_Info', 'profile_additional_infos', {
    profile_id: {
        type: ObjectId,
        ref: 'Profile',
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: '',
    },
    content: {
        type: String,
        required: true,
    },
})

export default ProfileAdditionalInfo
