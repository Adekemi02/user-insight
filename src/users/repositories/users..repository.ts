import { Injectable } from "@nestjs/common";
import { TypeOrmRepository } from "src/cofig/typeorm.repository";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";



@Injectable()
export class UserRepository extends TypeOrmRepository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}