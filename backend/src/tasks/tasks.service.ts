import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { takeLast } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public fetchTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task: Task) => task.id === id);
    if (foundTask) {
      return foundTask;
    }
  }

  public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.fetchTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }

    return tasks;
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

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const updatedTask = this.tasks.find((task) => {
      if (task.id === id) {
        task.status = status;
        return task;
      }
    });

    return updatedTask;
  }
}
