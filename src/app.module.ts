import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendgridModule } from './infra/sendgrid/sendgrid.module';

@Module({
  imports: [ConfigModule.forRoot(), SendgridModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
