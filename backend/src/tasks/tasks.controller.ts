import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.fetchTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  async createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = await this.tasksService.createTask(createTaskDto);
    return createdTask;
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<Task[]> {
    const remainingTasks = await this.tasksService.deleteTask(id);
    return remainingTasks;
  }
}
