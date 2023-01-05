import { Module } from '@nestjs/common';
import { SendgridModule } from './infra/sendgrid/sendgrid.module';

@Module({
  imports: [SendgridModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
