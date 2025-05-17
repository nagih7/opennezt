export interface Activity {
    id: string;
    type: string;
    content: string;
    timestamp: string;
    user?: {
        id: string;
        name: string;
        avatar?: string;
    };
}

export interface SidebarAction {
    onAction: () => void;
    label: string;
}
