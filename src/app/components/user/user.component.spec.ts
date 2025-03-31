import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    // ✅ Set required input before detectChanges
    component.user = {
      id: 'u1',
      name: 'Test User',
      avatar: 'avatar.png',
      // Add other properties if needed
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

