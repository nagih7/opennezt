// import Joi from 'joi'
// import {MAX_STRING_SIZE, VALIDATE_PHONE_REGEX, MAX_AREAS_STRING_SIZE} from '@/configs'
// import {AsyncValidate, FileUpload} from '@/utils/classes'
// import {tryValidateOrDefault} from '@/utils/helpers'
// // import {validate} from '@/utils/middlewares'
// import {
//     Profile,
//     User,
//     Industry,
//     ExperienceLevel,
//     Education,
//     Certification,
//     Category,
//     Skill,
//     ProfileAdditionalInfo,
// } from '@/models'
// import {FounderProfile} from 'components/common/FounderProfile'

// // const Profile = createModel('Profile', 'profiles', {
// //     user_id: {
// //         type: ObjectId,
// //         ref: User,
// //         required: true,
// //         index: true,
// //     },
// //     industry_ids: {
// //         type: [ObjectId],
// //         required: true,
// //         default: [],
// //         index: true,
// //     },
// //     experience_level_id: {
// //         type: ObjectId,
// //         ref: 'Experience_Level',
// //         required: true,
// //         index: true,
// //     },
// //     education_ids: {
// //         type: [ObjectId],
// //         ref: 'Education',
// //         required: true,
// //         default: [],
// //         index: true,
// //     },
// //     certification_ids: {
// //         type: [ObjectId],
// //         ref: 'Certification',
// //         required: true,
// //         default: [],
// //         index: true,
// //     },
// //     category_ids: {
// //         type: [ObjectId],
// //         ref: 'Category',
// //         required: true,
// //         default: [],
// //         index: true,
// //     },
// //     skill_ids: {
// //         type: [ObjectId],
// //         ref: 'Skill',
// //         required: true,
// //         default: [],
// //         index: true,
// //     },
// // })

// // const ProfileAdditionalInfo = createModel('Profile_Additional_Info', 'profile_additional_infos', {
// //     profile_id: {
// //         type: ObjectId,
// //         ref: 'Profile',
// //         required: true,
// //     },
// //     name: {
// //         type: String,
// //         required: true,
// //     },
// //     description: {
// //         type: String,
// //         required: true,
// //         default: '',
// //     },
// //     content: {
// //         type: String,
// //         required: false,
// //     },
// // })

// export const createProfile = Joi.object({
//     industry_ids: Joi.array().items(Joi.string().trim().required()).label('Industry IDs'),
//     experience_level_id: Joi.string().trim().required().label('Experience Level ID'),
//     education_ids: Joi.array().items(Joi.string().trim().required()).allow(null).label('Education IDs'),
//     certification_ids: Joi.array()
//         .items(Joi.string().trim().required())
//         .allow(null)
//         .label('Certification IDs'),
//     category_ids: Joi.array().items(Joi.string().trim().required()).allow(null).label('Category IDs'),
//     skill_ids: Joi.array().items(Joi.string().trim().required()).allow(null).label('Skill IDs'),
//     additional_infos: Joi.array().items(
//         Joi.object({
//             name: Joi.string().trim().required().max(MAX_STRING_SIZE).label('Name of Additional Info'),
//             description: Joi.string()
//                 .trim()
//                 .allow('')
//                 .max(MAX_STRING_SIZE)
//                 .label('Description of Additional Info'),
//             content: Joi.string().trim().allow(null).max(MAX_STRING_SIZE).label('Content of Additional Info'),
//         })
//     ),
// })
