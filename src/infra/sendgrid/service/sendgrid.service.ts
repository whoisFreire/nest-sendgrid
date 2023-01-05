import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendGridInterface } from '../interface/send-mail.interface';

@Injectable()
export class SendgridService {
  private readonly SENDGRID_API_URL = process.env.SENDGRID_API_URL;
  private readonly SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(emailData: SendGridInterface): Promise<boolean> {
    const baseURL = `${this.SENDGRID_API_URL}/mail/send`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.SENDGRID_API_KEY}`,
      },
    };
    const response = await lastValueFrom(
      this.httpService.post(baseURL, emailData, config),
    );

    return response.status === HttpStatus.ACCEPTED;
  }
}
