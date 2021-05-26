export interface Option {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    url: string;
    mock?: boolean;
    params?: any;
    data?: any;
}