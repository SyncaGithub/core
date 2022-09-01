import {
	Connection,
	FilterQuery,
	HydratedDocument,
	Model,
	ObjectId,
	Query,
} from "mongoose";
import { Populated, Raw } from "../models";

export interface IBaseRepo<Entity = any> {
	list(filter: FilterQuery<Entity>): Promise<Entity[]>;
	find(
		filter: FilterQuery<Entity>
	): Query<
		HydratedDocument<Entity, {}, {}>[],
		HydratedDocument<Entity, {}, {}>,
		{},
		Entity
	>;
	findById(id: string | ObjectId): Promise<Entity>;
	add(entity: Partial<Entity>): Promise<Entity>;
	update(
		filter: FilterQuery<Entity>,
		dataToUpdate: Partial<Entity>
	): Promise<Entity>;
	delete(filter: FilterQuery<Entity>): Promise<void>;
	findOne(filter: FilterQuery<Entity>): Promise<Entity>;
}

export abstract class BaseRepo<Entity = any> implements IBaseRepo<Entity> {
	private readonly _model: Model<Entity>;
	private readonly _connection: Connection;
	constructor(connection: Connection, model: Model<Entity>) {
		this._model = model;
		this._connection = connection;
	}
	find(
		filter: FilterQuery<Entity>
	): Query<
		HydratedDocument<Entity, {}, {}>[],
		HydratedDocument<Entity, {}, {}>,
		{},
		Entity
	> {
		return this._model.find(filter);
	}
	list(filter: FilterQuery<Entity>): Promise<Entity[]> {
		return this._model.find(filter).exec();
	}
	findById(id: string | ObjectId): Promise<Entity> {
		return this._model.findById(id).exec();
	}
	findOne(filter: FilterQuery<Entity>): Promise<Entity> {
		return this._model.findOne(filter).exec();
	}
	async add(entity: Partial<Entity>): Promise<Entity> {
		const newEntity = await this._model.create(entity);
		newEntity.validateSync();
		await newEntity.save();
		return newEntity;
	}
	update(
		filter: FilterQuery<Entity>,
		dataToUpdate: Partial<Entity>
	): Promise<Entity> {
		return this._model
			.findOneAndUpdate(filter, dataToUpdate, { new: true })
			.exec();
	}
	delete(filter: FilterQuery<Entity>): Promise<void> {
		this._model.findOneAndDelete(filter).exec();
		return;
	}
}
