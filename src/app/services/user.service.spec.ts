import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserCreationRequest} from '../model/user-creation-request';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  it('has a method findAll that calls API /api/v1/user GET method', () => {
    service.findAll().subscribe().unsubscribe();

    const http = httpMock.expectOne('/api/v1/user');
    expect(http.request.method).toBe('GET');

    expect(service).toBeTruthy();
  });

  it('has a method add that API /api/v1/user POST method', () => {
    const userCreationRequest = new UserCreationRequest('Chuck', 'NORRIS');
    service.add(userCreationRequest)
      .subscribe((request: UserCreationRequest) => expect(request.firstName).toBe('Chuck'))
      .unsubscribe();

    const http = httpMock.expectOne('/api/v1/user');
    expect(http.request.method).toBe('POST');

    expect(service).toBeTruthy();
  });
});
