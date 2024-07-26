import {
    EntityManager,
    EntityTarget,
    ObjectLiteral,
    Repository,
} from 'typeorm';



export class TypeOrmRepository<
 Entity extends ObjectLiteral,
> extends Repository<Entity> {
    constructor(
        private readonly entityTarget: EntityTarget<Entity>,
        private readonly entityManager: EntityManager,
    ) {
        super(entityTarget, entityManager);
    }
}