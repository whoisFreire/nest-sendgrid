import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { SendGridInterface } from '../interface/send-mail.interface';

@Injectable()
export class SendgridService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(emailData: SendGridInterface): Promise<boolean> {
    const baseURL = 'https://api.sendgrid.com/v3/mail/send';
    const config = {
      headers: {
        Authorization:
          'Bearer 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',
      },
    };
    const response = await lastValueFrom(
      this.httpService.post(baseURL, emailData, config),
    );

    return response.status === HttpStatus.ACCEPTED;
  }
}
