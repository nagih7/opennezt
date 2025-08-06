export const STATUS_USER: { [key: string]: number } = {}
STATUS_USER['INACTIVATE'] = 0
STATUS_USER['ACTIVATE'] = 1

export const LANG = [
   { label: 'VI', value: 'Vietnamese' },
   { label: 'EN', value: 'English' },
   { label: 'ZH', value: 'Chinese' },
]

export const NAVBAR_LABEL = {
   ACTIVITY: 'ACTIVITY',
   ADMIN: 'ADMIN',
   DASHBOARD: 'DASHBOARD',
   HOME: 'HOME',
   ABOUT_ME: 'ABOUT_ME',
   PROJECT: 'PROJECT',
   RECRUIT_TALENTS: 'RECRUIT_TALENTS',
   SEEK_PROJECTS: 'SEEK_PROJECTS',
   NOTIFICATIONS: 'NOTIFICATIONS',
   MESSAGES: 'MESSAGES',
}

export const NAVBAR = {
   ACTIVITY: {
      EN: 'Activity',
      VI: 'Hoạt động',
      ZH: '活动',
   },
   ADMIN: {
      EN: 'Admin',
      VI: 'Quản trị',
      ZH: '管理员',
   },
   DASHBOARD: {
      EN: 'Dashboard',
      VI: 'Bảng điều khiển',
      ZH: '仪表板',
   },
   HOME: {
      EN: 'Home',
      VI: 'Trang chủ',
      ZH: '首页',
   },
   ABOUT_ME: {
      EN: 'About Me',
      VI: 'Về tôi',
      ZH: '关于我',
   },
   PROJECT: {
      EN: 'Project',
      VI: 'Dự án',
      ZH: '项目',
   },
   RECRUIT_TALENTS: {
      EN: 'Recruit Talents',
      VI: 'Tuyển dụng tài năng',
      ZH: '招聘人才',
   },
   SEEK_PROJECTS: {
      EN: 'Seek Projects',
      VI: 'Tìm dự án',
      ZH: '寻找项目',
   },
   NOTIFICATIONS: {
      EN: 'Notifications',
      VI: 'Thông báo',
      ZH: '通知',
   },
   MESSAGES: {
      EN: 'Messages',
      VI: 'Tin nhắn',
      ZH: '消息',
   },
}

export const WELCOME_TO_OPENNEZT = {
   EN: `<b>Hello!</b> Welcome to <b>OpenNezt</b>, where innovation meets opportunity and collaboration sparks success`,
   VI: `<b>Xin chào!</b> Chào mừng đến với <b>OpenNezt</b>, nơi sáng tạo gặp gỡ cơ hội và sự hợp tác tạo nên thành công`,
   ZH: `<b>你好!</b> 欢迎来到 <b>OpenNezt</b>，在这里，创新遇见机会，合作引发成功`,
}

export const STEPS = {
   STEP_1: {
      TRUE: {
         EN: 'Update your profile',
         VI: 'Cập nhật hồ sơ của bạn',
         ZH: '更新您的个人资料',
      },
      FALSE: {
         EN: 'Update your profile',
         VI: 'Cập nhật hồ sơ của bạn',
         ZH: '更新您的个人资料',
      },
   },
   STEP_2: {
      TRUE: {
         EN: 'Redirect to project',
         VI: 'Chuyển hướng đến dự án',
         ZH: '重定向到项目',
      },
      FALSE: {
         EN: 'Create your first project',
         VI: 'Tạo dự án đầu tiên của bạn',
         ZH: '创建您的第一个项目',
      },
   },
   STEP_3: {
      TRUE: {
         EN: 'Invite your Team',
         VI: 'Mời đội của bạn',
         ZH: '邀请您的团队',
      },
      FALSE: {
         EN: 'Invite your Team',
         VI: 'Mời đội của bạn',
         ZH: '邀请您的团队',
      },
   },
   STEP_4: {
      EN: '99+ talents in your queue meet your requirement',
      VI: '99+ tài năng trong hàng đợi của bạn đáp ứng yêu cầu của bạn',
      ZH: '您的队列中有99+个人才符合您的要求',
   },
}

export const RECRUIT_NOW = {
   EN: 'Recruit now',
   VI: 'Tuyển dụng ngay',
   ZH: '立即招聘',
}

// Professional Background

export const PROFESSIONAL_PROFILE = {
   PROFESSIONAL_BACKGROUND: {
      EN: 'Professional Background',
      VI: 'Nền tảng chuyên môn',
      ZH: '专业背景',
   },
   ACCOUNTING_AND_FINANCE: {
      EN: 'Accounting and Finance',
      VI: 'Kế toán và Tài chính',
      ZH: '会计与金融',
   },
   PROFESSIONAL_SUMMARY: {
      EN: 'Professional Summary',
      VI: 'Tóm tắt chuyên môn',
      ZH: '专业摘要',
   },
   EXPERIENCE_LEVEL: {
      EN: 'Experience Level',
      VI: 'Mức kinh nghiệm',
      ZH: '经验水平',
   },
   EDUCATION_LEVEL: {
      EN: 'Education Level',
      VI: 'Mức học vấn',
      ZH: '教育水平',
   },
   CERTIFICATIONS: {
      EN: 'Certifications',
      VI: 'Chứng chỉ',
      ZH: '证书',
   },
   EXPERTISE: {
      EN: 'Expertise',
      VI: 'Chuyên môn',
      ZH: '专业',
   },
   // Human Resources
   HUMAN_RESOURCES: {
      EN: 'Human Resources',
      VI: 'Nhân sự',
      ZH: '人力资源',
   },
   INTERNATIONAL: {
      EN: 'International',
      VI: 'Quốc tế',
      ZH: '国际',
   },
   LAW_AND_LEGAL: {
      EN: 'Law and Legal',
      VI: 'Pháp lý',
      ZH: '法律',
   },
   MANAGEMENT: {
      EN: 'Managerment',
      VI: 'Quản lý',
      ZH: '管理',
   },
   MARKETING: {
      EN: 'Marketing',
      VI: 'Marketing',
      ZH: '市场营销',
   },
   OPERATION: {
      EN: 'Operation',
      VI: 'Vận hành',
      ZH: '操作',
   },
   SALE: {
      EN: 'Sale',
      VI: 'Bán hàng',
      ZH: '销售',
   },
   STARTING_UP: {
      EN: 'Starting Up',
      VI: 'Khởi nghiệp',
      ZH: '创业',
   },
   SUSTAINABILITY: {
      EN: 'Sustainability',
      VI: 'Bền vững',
      ZH: '可持续性',
   },
   TECHNOLOGY_AND_INTERNET: {
      EN: 'Technology and Internet',
      VI: 'Công nghệ và Internet',
      ZH: '技术和互联网',
   },
   WORK_WITH_ME: {
      EN: 'Work with me',
      VI: 'Làm việc với tôi',
      ZH: '与我合作',
   },
   MY_CAREER_GOALS: {
      EN: 'My Career Goals',
      VI: 'Mục tiêu sự nghiệp của tôi',
      ZH: '我的职业目标',
   },
   AVAILABILITY: {
      EN: 'Availability',
      VI: 'Sẵn sàng',
      ZH: '可用性',
   },
   WHAT_I_CAN_OFFER: {
      EN: 'What I Can Offer',
      VI: 'Tôi có thể cung cấp gì',
      ZH: '我能提供什么',
   },
   MY_WORK_EXPECTATIONS: {
      EN: 'My Work Expectations',
      VI: 'Kỳ vọng công việc của tôi',
      ZH: '我的工作期望',
   },
   EXPECTATIONS: {
      EN: 'Expectations',
      VI: 'Kỳ vọng',
      ZH: '期望',
   },
   EXPERTISE_BACKGROUND: {
      EN: 'Expertise Background',
      VI: 'Nền tảng chuyên môn',
      ZH: '专业背景',
   },
   GOALS_AND_EXPECTATIONS: {
      EN: 'Goals and Expectations',
      VI: 'Mục tiêu và kỳ vọng',
      ZH: '目标和期望',
   },
   WHICH_AREA_OF_EXPERTISE: {
      EN: 'Which area of expertise are you looking for?',
      VI: 'Bạn đang tìm kiếm lĩnh vực chuyên môn nào?',
      ZH: '您正在寻找哪个专业领域?',
   },
}

export const MATCHING_PROJECTS_WITH_AI = {
   EN: 'Matching projects with AI',
   VI: 'Kết hợp dự án với AI',
   ZH: '与AI匹配项目',
}

export const LINKEDIN_PROFILE = {
   EN: 'LinkedIn Profile',
   VI: 'Hồ sơ LinkedIn',
   ZH: '领英档案',
}

export const VIEW_MATCHING_PROJECTS = {
   EN: 'View Matching Projects',
   VI: 'Xem dự án phù hợp',
   ZH: '查看匹配项目',
}

export const UPDATE_PROFILE = {
   EN: 'Update Profile',
   VI: 'Cập nhật hồ sơ',
   ZH: '更新个人资料',
}

export const PROJECT_MANAGEMENT = {
   EN: 'Project Management',
   VI: 'Quản lý dự án',
   ZH: '项目管理',
}

export const VIEW_MATCHING_TALENTS = {
   EN: 'View matching talents',
   VI: 'Xem tài năng phù hợp',
   ZH: '查看匹配人才',
}

export const MATCHING_TALENT_WITH_AI = {
   EN: 'Matching talent with AI',
   VI: 'Kết hợp tài năng với AI',
   ZH: '与AI匹配人才',
}

export const CREATE_NEW_PROJECT = {
   EN: 'Create new project',
   VI: 'Tạo dự án mới',
   ZH: '创建新项目',
}

export const UPDATE = {
   EN: 'Update',
   VI: 'Cập nhật',
   ZH: '更新',
}

export const DELETE = {
   EN: 'Delete',
   VI: 'Xóa',
   ZH: '删除',
}

export const COMPATIBILITY = {
   EN: 'Compatibility',
   VI: 'Tương thích',
   ZH: '兼容性',
}

export const VIEW_DETAILS = {
   EN: 'View Details',
   VI: 'Xem chi tiết',
   ZH: '查看详情',
}

export const INDUSTRY_FIELD = {
   EN: 'Industry Field',
   VI: 'Lĩnh vực ngành',
   ZH: '行业领域',
}

export const STAGE_OF_DEVELOPMENT = {
   EN: 'Stage of Development',
   VI: 'Giai đoạn phát triển',
   ZH: '发展阶段',
}

export const SEARCH = {
   EN: 'Search',
   VI: 'Tìm kiếm',
   ZH: '搜索',
}

export const RESET = {
   EN: 'Reset',
   VI: 'Làm mới',
   ZH: '重置',
}

export const FRIENDS = {
   EN: 'Friends',
   VI: 'Bạn bè',
   ZH: '朋友',
}

export const ACTIONS = {
   ACTIONS: {
      EN: 'Actions',
      VI: 'Hành động',
      ZH: '动作',
   },
   CONFIRM: {
      EN: 'Confirm',
      VI: 'Xác nhận',
      ZH: '确认',
   },
   DELETE: {
      EN: 'Delete',
      VI: 'Xóa',
      ZH: '删除',
   },
   ACCEPT: {
      EN: 'Accept',
      VI: 'Chấp nhận',
      ZH: '接受',
   },
   REJECT: {
      EN: 'Reject',
      VI: 'Từ chối',
      ZH: '拒绝',
   },
   LOADING: {
      EN: 'Loading...',
      VI: 'Đang tải...',
      ZH: '载入中...',
   },
   SEND_PROJECT_INVITATION: {
      EN: 'Send project invitation',
      VI: 'Gửi lời mời dự án',
      ZH: '发送项目邀请',
   },
   SEND_VOICE_MESSAGE: {
      EN: 'Send voice message',
      VI: 'Gửi tin nhắn thoại',
      ZH: '发送语音消息',
   },
   ENTER_MESSAGE: {
      EN: 'Enter message...',
      VI: 'Nhập tin nhắn...',
      ZH: '输入消息...',
   },
   INVITE: {
      EN: 'Invite',
      VI: 'Mời',
      ZH: '邀请',
   },
}

export const STATUS = {
   STATUS: {
      EN: 'Status',
      VI: 'Trạng thái',
      ZH: '状态',
   },
   ACCEPTED: {
      EN: 'Accepted',
      VI: 'Đã chấp nhận',
      ZH: '已接受',
   },
   REJECTED: {
      EN: 'Rejected',
      VI: 'Đã từ chối',
      ZH: '已拒绝',
   },
   BLOCKED: {
      EN: 'Blocked',
      VI: 'Đã chặn',
      ZH: '已阻止',
   },
   WAITING: {
      EN: 'Waiting',
      VI: 'Đang chờ',
      ZH: '等待中',
   },
   INVITED: {
      EN: 'Invited',
      VI: 'Đã mời',
      ZH: '已邀请',
   },
}

export const TYPE = {
   TYPE: {
      EN: 'Type',
      VI: 'Loại',
      ZH: '类型',
   },
}

export const REQUEST_BY = {
   EN: 'Request by',
   VI: 'Yêu cầu bởi',
   ZH: '请求者',
}

export const REQUEST_AT = {
   EN: 'Request at',
   VI: 'Yêu cầu lúc',
   ZH: '请求时间',
}

export const NOTIFICATIONS = {
   NOTIFICATIONS: {
      EN: 'Notifications',
      VI: 'Thông báo',
      ZH: '通知',
   },
   INVITED_YOU_TO_JOIN_THE: {
      EN: 'invited you to join the',
      VI: 'mời bạn tham gia',
      ZH: '邀请您加入',
   },
   PROJECT: {
      EN: 'project',
      VI: 'dự án',
      ZH: '项目',
   },
   SENT_YOU_A_FRIEND_REQUEST: {
      EN: 'sent you a friend request',
      VI: 'gửi bạn một lời kết bạn',
      ZH: '向您发送了好友请求',
   },
   CONFIRMED_FRIEND_REQUEST: {
      EN: 'has accepted your friend request',
      VI: 'đã chấp nhận lời mời kết bạn của bạn',
      ZH: '已接受您的好友请求',
   },
   CONFIRMED_PROJECT_INVITATION: {
      EN: 'has accepted your project invitation',
      VI: 'đã chấp nhận lời mời tham gia dự án của bạn',
      ZH: '已接受您的项目邀请',
   },
   PROJECT_APPLICATION: {
      EN: 'has requested to apply for the project',
      VI: 'đã yêu cầu tham gia dự án',
      ZH: '已申请加入项目',
   },
   VIEW_ALL_NOTIFICATIONS: {
      EN: 'View all notifications',
      VI: 'Xem tất cả thông báo',
      ZH: '查看所有通知',
   },
   PLEASE_SELECT_A_ROLE: {
      EN: 'Please select a role.',
      VI: 'Vui lòng chọn một vai trò.',
      ZH: '请选择一个角色。',
   },
   ARE_YOU_SURE_YOU_WANT_TO_INVITE: {
      EN: 'Are you sure you want to invite?',
      VI: 'Bạn có chắc chắn muốn mời?',
      ZH: '您确定要邀请吗？',
   },
}

export const CHATS = {
   CHATS: {
      EN: 'Chats',
      VI: 'Trò chuyện',
      ZH: '聊天',
   },
   SEARCH: {
      EN: 'Search',
      VI: 'Tìm kiếm',
      ZH: '搜索',
   },
   NEW_CHAT: {
      EN: 'New chat',
      VI: 'Trò chuyện mới',
      ZH: '新聊天',
   },
}

export const MESSAGES = {
   MESSAGES: {
      EN: 'Messages',
      VI: 'Tin nhắn',
      ZH: '消息',
   },
   SEND: {
      EN: 'Send',
      VI: 'Gửi',
      ZH: '发送',
   },
   NEW_MESSAGE: {
      EN: 'New message',
      VI: 'Tin nhắn mới',
      ZH: '新消息',
   },
   MESSAGE: {
      EN: 'Message',
      VI: 'Tin nhắn',
      ZH: '消息',
   },
}

export const TOOLTIP = {
   EN: 'Tooltip',
   VI: 'Chú giải',
   ZH: '工具提示',

   YOU_NEED_TO_CREATE_A_PROJECT_FIRST: {
      EN: 'You need to create a project first',
      VI: 'Bạn cần tạo một dự án trước',
      ZH: '您需要先创建一个项目',
   },
}
