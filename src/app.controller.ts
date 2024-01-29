import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Post()
  getGithubWebhook(@Body() body: any): { message: string } {
    return this.appService.getGithubWebhook(body);
  }
}
