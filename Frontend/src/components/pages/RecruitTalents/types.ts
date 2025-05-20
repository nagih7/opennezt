export interface User {
    _id: string;
    name: string;
    avatar: string;
}

export interface Talent {
    user: User;
}

export interface PaginationData {
    currentPage: number;
    perPage: number;
    totalRecord: number;
}

export interface FormRecruitTalents {
    keySearch: string;
    industry: string;
    experienceLevel: string;
    category: string;
    subcategory: string;
    skill: string;
    page: number;
    perPage: number;
}

export interface FrameworkItem {
    value: string;
    label: string;
}

export interface Framework {
    items: FrameworkItem[];
}

export interface TalentBoxProps {
    talent: Talent;
    handleViewTalentDetails: (user: User) => void;
}

export interface SelectEvent {
    value: string[];
} 