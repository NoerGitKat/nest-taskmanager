import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      // Get all tasks
      return this.tasksService.fetchTasks();
    }
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

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    const updatedTask = await this.tasksService.updateTaskStatus(id, status);

    return updatedTask;
  }
}
