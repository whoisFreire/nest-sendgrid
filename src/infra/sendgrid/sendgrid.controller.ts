import { Body, Controller, Post } from '@nestjs/common';
import { SendgridService } from './service/sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
  constructor(private readonly sendgridService: SendgridService) {}
  @Post()
  async sendMail(@Body() body: any) {
    const result = await this.sendgridService.sendEmail(body);
    return result;
  }
}
