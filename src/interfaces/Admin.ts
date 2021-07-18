export interface GetAdminUserListReq {
    page: number;
    limit: number;
    keyword: string;
}

export interface CreateAdminReq {
    phone: string;
    avatar: string;
    nickname: string;
    username: string;
    password: string;
    roles: string;
}

export interface UpdateAdminReq {
    id: number;
    adminUserId: string;
    phone?: string;
    avatar?:string;
    nickname?: string;
    password?: string;
    roles?: string;
}

export interface DeleteAdminReq {
    id: number;
    AdminUserId: string;
}