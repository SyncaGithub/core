"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepo = void 0;
class BaseRepo {
    constructor(model) {
        this.model = model;
    }
    list(filter) {
        return this.model.find(filter).exec();
    }
    findById(id) {
        return this.model.findById(id).exec();
    }
    add(entity) {
        return this.model.create(entity);
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
}
exports.BaseRepo = BaseRepo;
//# sourceMappingURL=base.repo.js.map