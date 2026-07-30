import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        inject: [databaseConfig.KEY],
        useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
            type: 'postgres',
            port: dbConfig.port || 5432,
            host: dbConfig.host || 'localhost',
            username: dbConfig.username || 'postgres',
            password: dbConfig.password || 'password',
            database: dbConfig.database || 'postgres',
            autoLoadEntities: true,
            synchronize: true
        })
    })]
})
export class DatabaseModule { }
