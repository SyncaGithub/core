import mongoose, { Connection, FilterQuery, Model } from "mongoose";

export interface IBaseRepo<Entity = any> {
	list(filter: FilterQuery<Entity>): Promise<Entity[]>;
	findById(id: string | mongoose.Types.ObjectId): Promise<Entity>;
	add(entity: Partial<Entity>): Promise<Entity>;
	update(
		filter: FilterQuery<Entity>,
		dataToUpdate: Partial<Entity>
	): Promise<Entity>;
	delete(filter: FilterQuery<Entity>): Promise<void>;
	findOne(filter: FilterQuery<Entity>): Promise<Entity>;
}

export abstract class BaseRepo<Entity = any> implements IBaseRepo<Entity> {
	private readonly model: Model<Entity>;
	private readonly connection: Connection;
	constructor(_connection: Connection, _model: Model<Entity>) {
		this.model = _model;
		this.connection = _connection;
	}
	list(filter: FilterQuery<Entity>): Promise<Entity[]> {
		return this.model.find(filter).exec();
	}
	findById(id: string | mongoose.Types.ObjectId): Promise<Entity> {
		return this.model.findById(id).exec();
	}
	findOne(filter: FilterQuery<Entity>): Promise<Entity> {
		return this.model.findOne(filter).exec();
	}
	async add(entity: Partial<Entity>): Promise<Entity> {
		const newEntity = await this.model.create(entity);
		newEntity.validateSync();
		return (await newEntity.save()) as Entity;
	}
	update(
		filter: FilterQuery<Entity>,
		dataToUpdate: Partial<Entity>
	): Promise<Entity> {
		return this.model
			.findOneAndUpdate(filter, dataToUpdate, { new: true })
			.exec();
	}
	delete(filter: FilterQuery<Entity>): Promise<void> {
		this.model.findOneAndDelete(filter).exec();
		return;
	}
}
