import { FilterQuery, Model } from "mongoose";

export interface IBaseRepo<Entity = any> {
	list(filter: FilterQuery<Entity>): Promise<Entity[]>;
	findById(id: string): Promise<Entity>;
	add(entity: Entity): Promise<Entity>;
	update(
		filter: FilterQuery<Entity>,
		dataToUpdate: Partial<Entity>
	): Promise<Entity>;
	delete(filter: FilterQuery<Entity>): Promise<void>;
}

export abstract class BaseRepo<Entity = any> implements IBaseRepo<Entity> {
	private readonly model: Model<Entity>;

	constructor(model: Model<Entity>) {
		this.model = model;
	}
	list(filter: FilterQuery<Entity>): Promise<Entity[]> {
		return this.model.find(filter).exec();
	}
	findById(id: string): Promise<Entity> {
		return this.model.findById(id).exec();
	}
	add(entity: Entity): Promise<Entity> {
		return this.model.create(entity);
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
