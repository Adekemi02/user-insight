import { BaseEntity } from "src/cofig/base-entity";
import { Entity, Column } from "typeorm";




@Entity({name: "users"})
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    friendsCount: number;

    @Column()
    facebookId: string;

    @Column()
    photoUrl: string;
}
