import createModel, {ObjectId} from './base'

const ProfileAdditionalInfo = createModel('Profile_Additional_Info', 'profile_additional_infos', {
    profile_id: {
        type: ObjectId,
        ref: 'Profile',
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

export default ProfileAdditionalInfo
