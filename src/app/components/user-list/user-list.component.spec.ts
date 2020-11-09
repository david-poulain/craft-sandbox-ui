import {async, ComponentFixture, fakeAsync, getTestBed, TestBed} from '@angular/core/testing';

import {UserListComponent} from './user-list.component';
import {AppModule} from '../../app.module';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

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
  let injector: TestBed;
  let component: UserListComponent;
  let service: UserService;
  let fixture: ComponentFixture<UserListComponent>;

  function mockServiceWithValues(users: User[]) {
    spyOn(service, 'findAll').and.returnValue(new Observable<User[]>(
      observer => observer.next(users)
    ));
    component.ngOnInit();
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    service = injector.get(UserService);
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('is getting user list from service', fakeAsync(() => {
    mockServiceWithValues([
      new User(0, 'Sarah', 'CONNOR'),
      new User(1, 'John', 'FROM_THE_GARDEN')
    ]);

    expect(component.users.length).toEqual(2);
    expectUser(component, 0, 0, 'Sarah', 'CONNOR');
    expectUser(component, 1, 1, 'John', 'FROM_THE_GARDEN');
  }));

  it('has a table that contains users', fakeAsync(() => {
    mockServiceWithValues([
      new User(0, 'Sarah', 'CONNOR'),
      new User(1, 'John', 'FROM_THE_GARDEN')
    ]);

    expectUserTableData('th', 0, 'Id', 'First Name', 'Last Name');
    expectUserTableData('td', 1, '0', 'Sarah', 'CONNOR');
    expectUserTableData('td', 2, '1', 'John', 'FROM_THE_GARDEN');
  }));
});
