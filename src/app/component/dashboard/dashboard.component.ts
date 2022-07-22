import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';

import { TodoAppService } from 'src/app/services/todo-app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  objTask: Task = new Task();
  taskArry: Task[] = [];
  addValue: string = '';
  editTaskValue: string = ""; 
  addTaskValue: string = "";
  
  constructor(private newData: TodoAppService) {
   }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue  = "";
    this.objTask = new Task();
    this.taskArry = [];
    this.getAllTask();
  }

  getAllTask(){
    this.newData.getAllTask().subscribe(res => {
      this.taskArry = res;
    });
  }

  addTask() {
    this.objTask.task_name = this.addTaskValue
    this.newData.addTask(this.objTask).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = "";
    }, )
  }

  editTask() {
      this.objTask.task_name = this.editTaskValue
      this.newData.editTask(this.objTask).subscribe(res => {
      this.ngOnInit();
    }, )
  }

  deleteTask(etask : Task){
    this.newData.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    });
  }

  call(etask : Task) {
    this.objTask = etask;
    this.editTaskValue = etask.task_name;
  }


}