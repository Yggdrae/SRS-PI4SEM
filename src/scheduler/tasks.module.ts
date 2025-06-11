import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { DatabaseModule } from 'src/db/database.module';
import { tasksProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...tasksProviders, TasksService],
})
export class TasksModule {}
