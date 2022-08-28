"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepo = void 0;
class BaseRepo {
    constructor(_connection, _model) {
        this.model = _model;
        this.connection = _connection;
    }
    list(filter) {
        return this.model.find(filter).exec();
    }
    findById(id) {
        return this.model.findById(id).exec();
    }
    findOne(filter) {
        return this.model.findOne(filter).exec();
    }
    async add(entity) {
        const newEntity = await this.model.create(entity);
        newEntity.validateSync();
        return (await newEntity.save());
    }
    update(filter, dataToUpdate) {
        return this.model
            .findOneAndUpdate(filter, dataToUpdate, { new: true })
            .exec();
    }
    delete(filter) {
        this.model.findOneAndDelete(filter).exec();
        return;
    }
    create(entity) {
        return new this.model(entity);
    }
}
exports.BaseRepo = BaseRepo;
//# sourceMappingURL=Base.repo.js.map