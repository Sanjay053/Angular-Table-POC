export interface User{
    users: any;
    id: number,
    firstName : string,
    age: number,
    phone: string,
    email: string,
    birthDate: string
}

export interface UserResponse extends User {
    users: User[];
}