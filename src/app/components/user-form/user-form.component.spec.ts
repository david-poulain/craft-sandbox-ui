import {ComponentFixture, fakeAsync, getTestBed, TestBed} from '@angular/core/testing';

import {UserFormComponent} from './user-form.component';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {deepEqual, instance, mock, verify, when} from 'ts-mockito';

describe('UserFormComponent', () => {
  let injector: TestBed;
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  let serviceMock: UserService;
  let routerMock: Router;

  beforeEach(() => {
    serviceMock = mock(UserService);
    routerMock = mock(Router);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UserFormComponent],
      providers: [
        {provide: UserService, useValue: instance(serviceMock)},
        {provide: Router, useValue: instance(routerMock)}
      ]
    })
      .compileComponents();

    injector = getTestBed();
  });

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
    when(serviceMock.add(component.userCreationRequest)).thenReturn(new Observable<User>());

    component.onSubmit();

    verify(serviceMock.add(component.userCreationRequest)).once();
  });

  it('redirects the user to /users when a user has been added', () => {
    when(serviceMock.add(component.userCreationRequest)).thenReturn(new Observable<User>(
      observer => observer.next(new User(0, 'firstname', 'lastname'))
    ));

    component.onSubmit();

    verify(routerMock.navigate(deepEqual(['/users']))).once();
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

    expect(button.textContent.trim()).toEqual('Add User');
  });

  it('has a button "Add User" that calls addUser method on click', fakeAsync(() => {
    const spyComponent = spyOn(component, 'onSubmit');

    const button = document.getElementById('addUser');
    button.click();

    fixture.whenStable().then(() => {
      expect(spyComponent).toHaveBeenCalledTimes(1);
    });
  }));
});
