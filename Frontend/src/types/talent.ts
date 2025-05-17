export interface User {
    _id: string;
    name: string;
    avatar?: string;
    background?: string;
    region?: string;
    linkedin?: string;
}

export interface FriendRequest {
    _id: string;
    source_id: string;
    metadata: {
        status: string;
    };
}

export interface TalentProfile {
    user: User;
    friend_request?: FriendRequest;
}

export interface IconlyProps {
    size: number;
    color: string;
    className?: string;
    primaryColor?: string;
    backgroundColor?: string;
}

export interface TalentState {
    talentDetails: TalentProfile | null;
    isLoadingSendFriendRequest: boolean;
    isLoadingReplyFriendRequest: boolean;
    isLoadingGetTalentDetails: boolean;
}
