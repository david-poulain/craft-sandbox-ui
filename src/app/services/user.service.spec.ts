import {getTestBed, TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserCreationRequest} from '../model/user-creation-request';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);

  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('calls API /api/v1/user GET method', () => {
    service.findAll().subscribe().unsubscribe();

    const http = httpMock.expectOne('http://localhost:8080/api/v1/user');
    expect(http.request.method).toBe('GET');

    expect(service).toBeTruthy();
  });

  it('calls API /api/v1/user POST method', () => {
    const userCreationRequest = new UserCreationRequest('Chuck', 'NORRIS');
    service.add(userCreationRequest)
      .subscribe((request: UserCreationRequest) => expect(request.firstName).toBe('Chuck'))
      .unsubscribe();

    const http = httpMock.expectOne('http://localhost:8080/api/v1/user');
    expect(http.request.method).toBe('POST');

    expect(service).toBeTruthy();
  });
});
