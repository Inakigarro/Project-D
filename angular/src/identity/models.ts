export interface RegisterUser {
    email: string;
    password: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface LoginResponse {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}