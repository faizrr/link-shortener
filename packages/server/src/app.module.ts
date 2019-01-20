import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RootModule } from './root/root.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST || 'localhost',
      username: 'postgres',
      database: 'link-shortener',
      synchronize: true,
      entities: [
        process.env.NODE_ENV === 'production'
          ? 'dist/**/**.entity{.ts,.js}'
          : 'src/**/**.entity{.ts,.js}',
      ],
    }),
    LinksModule,
    RootModule,
  ],
})
export class AppModule {}
