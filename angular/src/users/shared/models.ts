export interface User {
    correlationId: string;
    displayName: string;
    email: string;
}

export interface CreateUser {
    displayName: string;
    email: string;
    loginId: string;
}

export interface UpdateUser {
    correlationId: string;
    displayName: string;
    email: string;
    loginId: string;
}