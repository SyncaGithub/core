"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepo = void 0;
class BaseRepo {
    constructor(connection, model) {
        this._model = model;
        this._connection = connection;
    }
    find(filter) {
        return this._model.find(filter);
    }
    list(filter) {
        return this._model.find(filter).exec();
    }
    findById(id) {
        return this._model.findById(id).exec();
    }
    findOne(filter) {
        return this._model.findOne(filter).exec();
    }
    async add(entity) {
        const newEntity = await this._model.create(entity);
        newEntity.validateSync();
        await newEntity.save();
        return newEntity;
    }
    update(filter, dataToUpdate) {
        return this._model
            .findOneAndUpdate(filter, dataToUpdate, {
            returnDocument: "after",
            returnOriginal: false,
        })
            .exec();
    }
    delete(filter) {
        this._model.findOneAndDelete(filter).exec();
        return;
    }
    async addMany(entities) {
        const newEntities = await this._model.insertMany(entities);
        newEntities.forEach(async (e) => {
            await e.validateSync();
            await e.save();
        });
        return newEntities;
    }
}
exports.BaseRepo = BaseRepo;
//# sourceMappingURL=Base.repo.js.map