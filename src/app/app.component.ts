import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { UserComponent } from './components/user/user.component';
import { DUMMY_USERS } from './dummy-users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-assessment';
  users = DUMMY_USERS;
}
