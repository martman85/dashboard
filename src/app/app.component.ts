import { Component, OnInit } from '@angular/core';
import cards from './../assets/lang.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public cards:any[] = cards;
  public card: any = null;
  public activeside = "1";
  public isAddingTask: boolean = false;
  public taskText: string = "";
  public tasks: any[] = []

  ngOnInit() {
    this.getRandomCard();
    this.getTasks();
  }

  getRandomCard() {
    this.activeside = "1";
    this.card = cards[Math.floor(Math.random() * cards.length)]
  }

  flipCard() {
    this.activeside = this.activeside == "1" ? "2" : "1";
  }

  prepareTask() {
    this.isAddingTask = true;
    this.taskText = "";
  }

  getTasks() {
    const tasks = localStorage.getItem('tasks');
    if(tasks !== null) {
      this.tasks = JSON.parse(tasks);
    }
  }

  addTask() {
    this.tasks.push({
      completed: false,
      task: this.taskText
    });
    this.isAddingTask = false;
    this.saveTasks();
  }

  saveTasks() {
    setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }, 100);
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

}
