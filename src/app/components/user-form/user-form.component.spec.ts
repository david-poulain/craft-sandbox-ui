import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {UserFormComponent} from './user-form.component';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {UserCreationRequest} from '../../model/user-creation-request';
import {AppModule} from '../../app.module';
import {Router} from '@angular/router';

describe('UserFormComponent', () => {
  let injector: TestBed;
  let service: UserService;
  let router: Router;
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    injector = getTestBed();
    service = injector.get(UserService);
    router = injector.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('calls user service when adding a user', () => {
    component.userCreationRequest.firstName = 'firstname';
    component.userCreationRequest.lastName = 'lastname';
    const spyAddUser = spyOn(service, 'add').and.returnValue(new Observable<User>());

    component.onSubmit();

    const expected = new UserCreationRequest('firstname', 'lastname');
    expect(spyAddUser).toHaveBeenCalledWith(expected);
    expect(spyAddUser).toHaveBeenCalledTimes(1);
  });

  it('redirects the user to /users when a user has been added', () => {
    spyOn(service, 'add').and.returnValue(new Observable<User>(
      observer => observer.next(new User(0, 'firstname', 'lastname'))
    ));
    const spyRouter = spyOn(router, 'navigate');

    component.onSubmit();

    expect(spyRouter).toHaveBeenCalledWith(['/users']);
    expect(spyRouter).toHaveBeenCalledTimes(1);
  });

  it('has an input form for firstname"', () => {
    const input = document.getElementById('firstName');
    expect(input.tagName.toLowerCase()).toEqual('input');
    expect(input.getAttribute('type')).toEqual('text');
  });

  it('has an input form for lastname"', () => {
    const input = document.getElementById('lastName');
    expect(input.tagName.toLowerCase()).toEqual('input');
    expect(input.getAttribute('type')).toEqual('text');
  });

  it('has a button to add a user"', () => {
    const button = document.getElementById('addUser');

    expect(button.tagName.toLowerCase()).toEqual('button');
    expect(button.getAttribute('type')).toEqual('submit');
    expect(button.innerText).toEqual('Add User');
  });

  it('has a button "Add User" that calls addUser method on click', async(() => {
    const spyComponent = spyOn(component, 'onSubmit');

    const button = document.getElementById('addUser');
    button.click();

    fixture.whenStable().then(() => {
      expect(spyComponent).toHaveBeenCalledTimes(1);
    });
  }));
});
