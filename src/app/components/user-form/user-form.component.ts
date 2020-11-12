import {UserService} from '../../services/user.service';
import {UserCreationRequest} from '../../model/user-creation-request';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userCreationRequest: UserCreationRequest;

  constructor(
    private router: Router,
    private userService: UserService) {
    this.userCreationRequest = new UserCreationRequest(null, null);
  }

  public onSubmit() {
    this.userService.add(this.userCreationRequest).subscribe(() => this.gotoUserList() );
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
