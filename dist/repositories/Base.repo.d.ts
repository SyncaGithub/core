/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
