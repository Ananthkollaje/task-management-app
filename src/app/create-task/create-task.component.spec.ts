import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CreateTaskComponent } from './create-task.component';
import { TaskService } from '../services/task.service';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let taskService: TaskService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [TaskService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    spyOn(taskService, 'addTask').and.stub();
    spyOn(router, 'navigate').and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method when form is submitted with valid data', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const spy = spyOn(component, 'onSubmit').and.callThrough();
  
    form.title.value = 'Task Title';
    form.description.value = 'Task Description';
    form.dueDate.value = '2024-04-04';
    form.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  
    expect(spy).toHaveBeenCalled();
    expect(taskService.addTask).toHaveBeenCalledWith({
      id: jasmine.any(Number), // Assuming ID is generated dynamically
      title: 'Task Title',
      description: 'Task Description',
      dueDate: '2024-04-04',
      completed: false
    });
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should not call onSubmit method when form is submitted with invalid data', () => {
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    const addTaskSpy = spyOn(taskService, 'addTask').and.stub(); // Spying here
  
    form.title.value = ''; // invalid data
    form.description.value = 'Task Description';
    form.dueDate.value = '2024-04-04';
    form.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  
    expect(spy).not.toHaveBeenCalled();
    expect(addTaskSpy).not.toHaveBeenCalled(); // Ensuring addTask is not called
  });
});
