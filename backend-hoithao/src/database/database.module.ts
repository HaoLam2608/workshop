import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hao260804', // thay bằng mật khẩu thật
      database: 'QLHOITHAO',
      autoLoadEntities: true,
      synchronize: false, // giữ false nếu đã có sẵn database bằng file db.sql
    }),
  ],
})
export class DatabaseModule {}
