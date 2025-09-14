import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { Transfer } from './entities/transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities,
      // logging: ['query'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Transfer]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
