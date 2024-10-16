import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { UserResponse } from "../Model/user";

@Injectable({
    providedIn: 'root'
})

export class UserService{
    constructor(private http: HttpClient){}
    apiUrl = 'https://dummyson.com/users'

    userData(): Observable<UserResponse>{
        return this.http.get<UserResponse>(this.apiUrl);
    }
}