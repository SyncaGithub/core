import { FilterQuery, Model } from "mongoose";
export interface IBaseRepo<Entity = any> {
    list(filter: FilterQuery<Entity>): Promise<Entity[]>;
    findById(id: string): Promise<Entity>;
    add(entity: Entity): Promise<Entity>;
    update(filter: FilterQuery<Entity>, dataToUpdate: Partial<Entity>): Promise<Entity>;
    delete(filter: FilterQuery<Entity>): Promise<void>;
}
export declare abstract class BaseRepo<Entity = any> implements IBaseRepo<Entity> {
    private readonly model;
    constructor(model: Model<Entity>);
    list(filter: FilterQuery<Entity>): Promise<Entity[]>;
    findById(id: string): Promise<Entity>;
    add(entity: Entity): Promise<Entity>;
    update(filter: FilterQuery<Entity>, dataToUpdate: Partial<Entity>): Promise<Entity>;
    delete(filter: FilterQuery<Entity>): Promise<void>;
}
//# sourceMappingURL=base.repo.d.ts.map