import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendGridInterface } from '../interface/send-mail.interface';
import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let sendGridservice: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridservice = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridservice).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should be able to send a email with success', async () => {
      jest.spyOn(httpService, 'post').mockReturnValueOnce(
        of({
          status: 202,
          statusText: 'ACCEPTED',
          config: {},
          headers: {},
          data: '',
        }),
      );
      const data: SendGridInterface = {
        personalizations: [
          {
            to: [
              { name: 'leonardo', email: 'leonardofreire.russi@icloud.com' },
            ],
          },
        ],
        from: { name: 'leonardosender', email: 'leonardo@leonardo' },
        reply_to: { email: 'leonardofreire.russi@icloud.com', name: 'suporte' },
        subject: 'sua fatura chegou',
        content: [{ type: 'text/html', value: '<p>Sua fatura chegou</p>' }],
      };
      const result = await sendGridservice.sendEmail(data);

      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
