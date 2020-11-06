import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserCreationRequest} from '../model/user-creation-request';
import {User} from '../model/user';

const optionRequest = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {

  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/api/v1/user';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, optionRequest);
  }

  public add(userCreationRequest: UserCreationRequest) {
    return this.http.post(this.userUrl, userCreationRequest, optionRequest);
  }
}
