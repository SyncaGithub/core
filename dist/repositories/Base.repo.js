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
        return (await newEntity.save());
    }
    update(filter, dataToUpdate) {
        return this._model
            .findOneAndUpdate(filter, dataToUpdate, { new: true })
            .exec();
    }
    delete(filter) {
        this._model.findOneAndDelete(filter).exec();
        return;
    }
}
exports.BaseRepo = BaseRepo;
//# sourceMappingURL=Base.repo.js.map