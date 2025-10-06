"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrmEntity = exports.AddressOrmEntity = void 0;
const typeorm_1 = require("typeorm");
// Definimos una clase para la dirección para mantener el código limpio y tipado.
class AddressOrmEntity {
}
exports.AddressOrmEntity = AddressOrmEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressOrmEntity.prototype, "addressLine1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }) // Hacemos la línea 2 opcional
    ,
    __metadata("design:type", String)
], AddressOrmEntity.prototype, "addressLine2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressOrmEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressOrmEntity.prototype, "stateOrProvince", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressOrmEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AddressOrmEntity.prototype, "country", void 0);
let UserOrmEntity = class UserOrmEntity {
};
exports.UserOrmEntity = UserOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(() => AddressOrmEntity),
    __metadata("design:type", AddressOrmEntity)
], UserOrmEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['admin', 'user'],
        default: 'user'
    }),
    __metadata("design:type", String)
], UserOrmEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserOrmEntity.prototype, "updatedAt", void 0);
exports.UserOrmEntity = UserOrmEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserOrmEntity);
