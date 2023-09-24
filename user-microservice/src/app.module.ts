import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormConfigManager } from "./applications/assets/config/typeorm.config.manger";
import { UserModule } from "./applications/user.module";
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeormConfigManager.getTypeOrmConfig()
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}