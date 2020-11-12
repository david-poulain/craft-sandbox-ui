import {UserListComponent} from './user-list.component';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {instance, mock, when} from 'ts-mockito';

function expectUser(component: UserListComponent, index: number, id: number, firstName: string, lastName: string) {
  expect(component.users[index].id).toEqual(id);
  expect(component.users[index].firstName).toEqual(firstName);
  expect(component.users[index].lastName).toEqual(lastName);
}

function expectUserTableData<K extends keyof { 'th', 'td' }>(tagOfColumn: K,
                                                             index: number,
                                                             id: string,
                                                             firstName: string,
                                                             lastName: string) {
  const table = document.getElementById('userList');
  const lines = table.getElementsByTagName('tr');

  const headerOnLine0 = lines[index].getElementsByTagName(tagOfColumn);
  expect(headerOnLine0[0].innerText).toEqual(id);
  expect(headerOnLine0[1].innerText).toEqual(firstName);
  expect(headerOnLine0[2].innerText).toEqual(lastName);
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let serviceMock: UserService;

  beforeEach(() => {
    serviceMock = mock(UserService);

    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        {provide: UserService, useValue: instance(serviceMock)}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  function mockServiceWithValues(users: User[]) {
    when(serviceMock.findAll()).thenReturn(new Observable<User[]>(
      observer => observer.next(users)
    ));

    component.ngOnInit();
  }

  it('is created', () => {
    mockServiceWithValues([]);

    expect(component).toBeTruthy();
  });

  it('is getting user list from service', () => {
    mockServiceWithValues([
      new User(0, 'Sarah', 'CONNOR'),
      new User(1, 'John', 'FROM_THE_GARDEN')
    ]);

    expect(component.users.length).toEqual(2);
    expectUser(component, 0, 0, 'Sarah', 'CONNOR');
    expectUser(component, 1, 1, 'John', 'FROM_THE_GARDEN');
  });

  it('has a table that contains users', () => {
    mockServiceWithValues([
      new User(0, 'Sarah', 'CONNOR'),
      new User(1, 'John', 'FROM_THE_GARDEN')
    ]);
    fixture.detectChanges();

    expectUserTableData('th', 0, 'Id', 'First Name', 'Last Name');
    expectUserTableData('td', 1, '0', 'Sarah', 'CONNOR');
    expectUserTableData('td', 2, '1', 'John', 'FROM_THE_GARDEN');
  });
});
