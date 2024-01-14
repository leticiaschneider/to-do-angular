import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { BoardSection, Task } from '../models/tasks.model';
import { HeaderComponent } from './components/header/header.component';
import { SectionComponent } from './components/section/section.component';
import { IconComponent } from './components/icon/icon.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { CardComponent } from './components/card/card.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, DragDropModule, IconComponent, HeaderComponent, SectionComponent, SectionFormComponent, CardComponent, TaskFormComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.scss'
})
export class TasklistComponent implements OnInit {

  sectionTasks: BoardSection[] = [
    {
      title: "Todo",
      status: "todo",
      tasks: [],
      showFormAddTask: false,
    },
    {
      title: "In Progress",
      status: "inprogress",
      tasks: [],
      showFormAddTask: false,
    },
    {
      title: "Done",
      status: "done",
      tasks: [],
      showFormAddTask: false,
    }
  ];

  newTaskForm: FormGroup;
  sectionForm: FormGroup;
  showFormAddSection: boolean = false;
  
  toggleValue: string = "board";
  textSearch: string = "";

  constructor(private fb: FormBuilder) {
    this.sectionForm = this.fb.group({
      sectionName: ['', Validators.required]
    });

    this.newTaskForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      checked: false,
      showPainel: false,
      showEditFrom: false
    });
  }

  ngOnInit(): void {
    const storedTasks = localStorage.getItem('tasks');

    if (!storedTasks) {
      localStorage.setItem("tasks", JSON.stringify(this.sectionTasks));
    }
    else {
      this.sectionTasks = JSON.parse(storedTasks);

      this.sectionTasks.map((section) => {
        section.showFormAddTask = false;
        if (section.tasks) {
          section.tasks.map((tasks) => {
            tasks.showPainel = false;
            tasks.showEditFrom = false
          });
        }
      });
    }
  }

  onTextSearchChange(textSearch: string) {
    this.textSearch = textSearch;
  }

  onValueToggleButton(value: boolean) {
    this.toggleValue = value ? 'board' : 'list';
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    localStorage.setItem("tasks", JSON.stringify(this.sectionTasks));
  }

  showFormTask(section: BoardSection) {
    this.sectionTasks.map((item) => item.showFormAddTask = false);
    section.showFormAddTask = !section.showFormAddTask;

    this.newTaskForm.setValue({
      id: null,
      title: null,
      description: null,
      checked: false,
      showPainel: false,
      showEditFrom: false
    });
  }

  addSection() {
    this.showFormAddSection = false;

    const sectionName = this.sectionForm.get('sectionName')?.value || '';

    const newItem: BoardSection = {
      title: sectionName,
      status: sectionName.split(' ').join('').toLowerCase(),
      tasks: [],
      showFormAddTask: false,
    };

    this.sectionTasks = [...this.sectionTasks, newItem];
    localStorage.setItem("tasks", JSON.stringify(this.sectionTasks));

    this.sectionForm.reset();
  }

  deleteSection(status: string) {
    let index = this.sectionTasks.findIndex(item => item.status === status);
    this.sectionTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(this.sectionTasks));
  }

  addTask(status: string) {
    const { id, title, description, checked, showPainel, showEditFrom } = this.newTaskForm.value;

    const column = this.sectionTasks.find(board => board.status === status);

    if (column) {
      let newTask: Task = { id, title, description, checked, showPainel, showEditFrom };
      newTask.id = this.generateId();
      column.tasks.push(newTask);
      column.showFormAddTask = false;
      this.newTaskForm.reset();
    }
    localStorage.setItem("tasks", JSON.stringify(this.sectionTasks));
  }

  generateId() {
    const randomPart = Math.random().toString(16).substring(2);
    const timestampPart = (new Date().getTime()).toString(16);
    const id = randomPart + timestampPart;

    return id;
  }
}
