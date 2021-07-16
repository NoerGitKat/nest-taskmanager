import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public fetchTasks() {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task: Task) => task.id === id);
    if (foundTask) {
      return foundTask;
    }
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  public deleteTask(id: string): Task[] {
    const filteredTasks = this.tasks.filter((task) => task.id !== id);

    this.tasks = filteredTasks;

    return filteredTasks;
  }
}
