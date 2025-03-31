import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TasksService } from '../tasks/tasks.service';
import { Task } from './task.model';

// Mock task data
const mockTask: Task = {
  userId: 'u1',
  id: 't1',
  title: 'Mock Task',
  summary: 'This is a test task',
  dueDate: new Date('2025-03-31').toString(),
};

// Mock TasksService
const removeTaskSpy = jasmine.createSpy('removeTask');
class MockTasksService {
  removeTask = removeTaskSpy;
}

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain(mockTask.title);
    expect(compiled.querySelector('p')?.textContent).toContain(mockTask.summary);
    expect(compiled.querySelector('time')?.textContent).toContain('March'); // rough check
  });

  it('should call removeTask when "Complete" button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(removeTaskSpy).toHaveBeenCalledOnceWith(mockTask.id);
  });
});
