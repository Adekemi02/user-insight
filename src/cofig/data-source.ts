import { User } from "src/users/entities/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";



export const typeOrmConfig: DataSourceOptions = {
    type: "sqlite",
    database: "db.sqlite",
    entities: [User],
    synchronize: true,
    logging: false,
    migrations: ["dist/db/migrations/*.js"],
    subscribers: []
};

export const dataSource = new DataSource(typeOrmConfig);