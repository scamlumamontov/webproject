export interface Interfaces {
}

export interface TokenInt{
    refresh: string,
    access: string
}
export interface LoginInt {
    username:string,
    password:string
}

export interface TaskInt {
    "id": number,
    "title": string,
    "description": string,
    "created_at": Date,
    "completed": boolean,
    "user": number,
    "category": number,
    "priority": number,
}