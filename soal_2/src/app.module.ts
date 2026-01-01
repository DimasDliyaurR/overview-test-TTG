import { Module } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IsUniqueConstraint } from '@validation/isUnique/IsUniqueConstraint';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGOS_URL')
      }),
      inject: [ConfigService]
    }),
    UserModule,
  ],
  providers: [IsUniqueConstraint]
})
export class AppModule { }
