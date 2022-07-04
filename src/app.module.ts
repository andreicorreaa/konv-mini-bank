import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AtmModule } from './app/atm/atm.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 3306),
        username: config.get('DB_USER', 'root'),
        password: config.get('DB_PASSWORD', 'root'),
        database: config.get('DB_DATABASE', 'bank'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        logging: true,
        synchronize: true,
      }),
    }),
    AtmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
