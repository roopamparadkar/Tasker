import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/services/data/data.service';
import { WebApiService } from 'src/app/services/web-services/web-api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  localStorageData: any;
  tasks: any;
  taskFormContorl = new FormControl('');

  constructor(
    private webApiService: WebApiService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.localStorageData = JSON.parse(localStorage.getItem('user_details'));
    this.fetchTasks();
  }

  private fetchTasks() {
    this.webApiService.fetchTaskService({ user_id: this.localStorageData._id })
      .pipe(first())
      .subscribe(
        result => {
          this.tasks = result;
        },
        err => console.log(err)
      );
  }

  createTask(){
    const taskTitle = this.taskFormContorl.value
    if(taskTitle){
      this.webApiService.createTaskService({title:taskTitle,user_id: this.localStorageData._id})
      .pipe(first())
      .subscribe(
        result => {
          this.taskFormContorl.setValue('');
          this.fetchTasks();
          this.dataService.showSnackBar('Task Added', '', 'success');
        }
      )
    }
  }

  updateTask(event:MatCheckboxChange,taskID){    
      const taskStatus = event.checked;
      this.webApiService.updateTaskService({completed:taskStatus,task_id: taskID})
      .pipe(first())
      .subscribe(
        result => {
          this.fetchTasks();
          this.dataService.showSnackBar('Task Updated', '', 'success');
        }
      )
  }

  deleteTask(taskId) {
    this.webApiService.deleteTaskService({taskId})
      .pipe(first())
      .subscribe(
        result => {
          this.fetchTasks();
          this.dataService.showSnackBar('Task Removed', '', 'success');
        }
      )
  }

}
