import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserCreationRequest} from '../model/user-creation-request';
import {User} from '../model/user';
import {environment} from '../../environments/environment';

const optionRequest = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {

  private readonly userUrl: string;
  private readonly USER_END_POINT = '/api/v1/user';

  constructor(private http: HttpClient) {
    this.userUrl = `${environment.baseUrl}${this.USER_END_POINT}`;
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, optionRequest);
  }

  public add(userCreationRequest: UserCreationRequest) {
    return this.http.post(this.userUrl, userCreationRequest, optionRequest);
  }
}
