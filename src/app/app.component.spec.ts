import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { RouterOutlet } from '@angular/router';
import { DUMMY_USERS } from './dummy-users';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet, HeaderComponent, UserComponent, TasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-assessment' title`, () => {
    expect(app.title).toEqual('angular-assessment');
  });

  it('should render title in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('EasyTask');
  });

  it('should update selectedUserId when onSelectUser is called', () => {
    const testId = '2';
    app.onSelectUser(testId);
    expect(app.selectedUserId).toBe(testId);
  });

  it('should return selected user based on selectedUserId', () => {
    app.selectedUserId = DUMMY_USERS[0].id;
    expect(app.selectedUser?.id).toBe(DUMMY_USERS[0].id);
  });
});
