export interface Sport {
    correlationId: string;
    displayName: string;
}

export interface CreateSport {
    displayName?: string;
}

export interface UpdateSport {
    correlationId?: string;
    displayName?: string;
}