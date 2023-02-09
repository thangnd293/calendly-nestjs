import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './configs/databaseConfig';

@Module({
  imports: [MongooseModule.forRoot(databaseConfig.url)],
})
export class AppModule {}
