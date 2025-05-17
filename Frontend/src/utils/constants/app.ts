export const STATUS_USER = {
    ACTIVATE: 1,
    INACTIVATE: 0
} as const;

export type StatusUserType = typeof STATUS_USER[keyof typeof STATUS_USER]; 