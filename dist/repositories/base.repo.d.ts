import { Connection, FilterQuery, HydratedDocument, Model, ObjectId } from "mongoose";
export interface IBaseRepo<Entity = any> {
    list(filter: FilterQuery<Entity>): Promise<Entity[]>;
    findById(id: string | ObjectId): Promise<Entity>;
    add(entity: Partial<Entity>): Promise<Entity>;
    update(filter: FilterQuery<Entity>, dataToUpdate: Partial<Entity>): Promise<Entity>;
    delete(filter: FilterQuery<Entity>): Promise<void>;
    create(entity: Partial<Entity>): HydratedDocument<Entity>;
    findOne(filter: FilterQuery<Entity>): Promise<Entity>;
}
export declare abstract class BaseRepo<Entity = any> implements IBaseRepo<Entity> {
    private readonly model;
    private readonly connection;
    constructor(_connection: Connection, _model: Model<Entity>);
    list(filter: FilterQuery<Entity>): Promise<Entity[]>;
    findById(id: string | ObjectId): Promise<Entity>;
    findOne(filter: FilterQuery<Entity>): Promise<Entity>;
    add(entity: Partial<Entity>): Promise<Entity>;
    update(filter: FilterQuery<Entity>, dataToUpdate: Partial<Entity>): Promise<Entity>;
    delete(filter: FilterQuery<Entity>): Promise<void>;
    create(entity: Partial<Entity>): HydratedDocument<Entity, {}, unknown>;
}
//# sourceMappingURL=Base.repo.d.ts.map