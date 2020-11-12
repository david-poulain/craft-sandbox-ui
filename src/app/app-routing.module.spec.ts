import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from './app-routing.module';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppModule} from './app.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';

@Component({
  template: '<router-outlet></router-outlet>'
})
export class TestComponent {
}

describe('App-Routing', () => {
  let fixture: ComponentFixture<TestComponent>;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        AppModule,
        HttpClientTestingModule
      ],
      declarations: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  function advance() {
    tick();
    fixture.detectChanges();
  }

  function navigate(url: string): boolean {
    let success = false;
    fixture.ngZone.run(() => {
      router.navigate([url])
        .then(value => success = value);
    });
    advance();
    return success;
  }

  function assertNavigation(requestedUrl: string, expectedUrl: string, expected: boolean = true) {
    const success = navigate(requestedUrl);
    expect(location.path()).toBe(expectedUrl);
    expect(success).toEqual(expected);
  }

  it('navigate to "/users"', fakeAsync(() => {
    assertNavigation('/users', '/users');
  }));
});
