import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { of } from 'rxjs';

// Dummy data
const mockTasks = [
  { id: 't1', title: 'Test Task 1', completed: false },
  { id: 't2', title: 'Test Task 2', completed: true },
];

// Mock service
class MockTasksService {
  getUserTasks(userId: string) {
    return mockTasks;
  }
}

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;

    // Set required inputs
    component.userId = 'u1';
    component.name = 'Anna';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the user name in the heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2')?.textContent;
    expect(heading).toContain("Anna's Tasks");
  });

  it('should render a list of tasks', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taskItems = compiled.querySelectorAll('app-task');
    expect(taskItems.length).toBe(2); // from mockTasks
  });

  it('should show new task form when Add Task button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    button?.click();
    fixture.detectChanges();

    const newTaskComponent = compiled.querySelector('app-new-task');
    expect(newTaskComponent).toBeTruthy();
  });

  it('should hide new task form when onCloseAddTask is called', () => {
    component.isAddingTask = true;
    fixture.detectChanges();

    component.onCloseAddTask();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const newTaskComponent = compiled.querySelector('app-new-task');
    expect(newTaskComponent).toBeFalsy();
  });
});

