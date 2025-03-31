import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTaskComponent } from './new-task.component';
import { TasksService } from '../tasks/tasks.service';
import { By } from '@angular/platform-browser';

const addTaskSpy = jasmine.createSpy('addTask');

class MockTasksService {
  addTask = addTaskSpy;
}

describe('NewTaskComponent', () => {
  let component: NewTaskComponent;
  let fixture: ComponentFixture<NewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTaskComponent);
    component = fixture.componentInstance;
    component.userId = 'u1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind form inputs', () => {
    const titleInput = fixture.nativeElement.querySelector('#title');
    titleInput.value = 'Test Title';
    titleInput.dispatchEvent(new Event('input'));

    const summaryInput = fixture.nativeElement.querySelector('#summary');
    summaryInput.value = 'Test Summary';
    summaryInput.dispatchEvent(new Event('input'));

    const dateInput = fixture.nativeElement.querySelector('#due-date');
    dateInput.value = '2025-04-10';
    dateInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.enteredTitle).toBe('Test Title');
    expect(component.enteredSummary).toBe('Test Summary');
    expect(component.enteredDate).toBe('2025-04-10');
  });

  it('should emit close when cancel is clicked', () => {
    spyOn(component.close, 'emit');

    const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
    cancelButton.click();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call addTask and emit close on form submit', () => {
    spyOn(component.close, 'emit');

    component.enteredTitle = 'Task Title';
    component.enteredSummary = 'Task Summary';
    component.enteredDate = '2025-04-15';

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(addTaskSpy).toHaveBeenCalledOnceWith(
      {
        title: 'Task Title',
        summary: 'Task Summary',
        date: '2025-04-15',
      },
      'u1',
    );

    expect(component.close.emit).toHaveBeenCalled();
  });
});
