import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  public fetchTasks() {
    return this.tasks;
  }
}
