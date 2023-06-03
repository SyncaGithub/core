import { Connection, FilterQuery, HydratedDocument, Model, ObjectId, Query, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
export interface IBaseRepo<Entity = any> {
    list(filter: FilterQuery<Entity>): Promise<Entity[]>;
    find(filter: FilterQuery<Entity>): Query<HydratedDocument<Entity, {}, {}>[], HydratedDocument<Entity, {}, {}>, {}, Entity>;
    findById(id: string | ObjectId): Promise<Entity>;
    add(entity: Partial<Entity>): Promise<Entity>;
    update(filter: FilterQuery<Entity>, dataToUpdate: Partial<Entity>): Promise<Entity>;
    delete(filter: FilterQuery<Entity>): Promise<void>;
    findOne(filter: FilterQuery<Entity>): Promise<Entity>;
    updateMany(filter?: FilterQuery<Entity>, update?: UpdateWithAggregationPipeline | UpdateQuery<Entity>): Promise<any>;
}
export declare abstract class BaseRepo<Entity = any> implements IBaseRepo<Entity> {
    private readonly _model;
    private readonly _connection;
    constructor(connection: Connection, model: Model<Entity>);
    find(filter: FilterQuery<Entity>): Query<HydratedDocument<Entity, {}, {}>[], HydratedDocument<Entity, {}, {}>, {}, Entity>;
    list(filter: FilterQuery<Entity>): Promise<Entity[]>;
    findById(id: string | ObjectId): Promise<Entity>;
    findOne(filter: FilterQuery<Entity>): Promise<Entity>;
    add(entity: Partial<Entity>): Promise<Entity>;
    update(filter: FilterQuery<Entity>, dataToUpdate: Partial<Entity>): Promise<Entity>;
    delete(filter: FilterQuery<Entity>): Promise<void>;
    addMany(entities: Partial<Entity>[]): Promise<Entity[]>;
    updateMany(filter?: FilterQuery<Entity>, update?: UpdateWithAggregationPipeline | UpdateQuery<Entity>): Promise<import("mongodb").UpdateResult>;
}
