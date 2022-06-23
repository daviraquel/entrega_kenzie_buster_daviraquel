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
exports.Cart = void 0;
var typeorm_1 = require("typeorm");
var index_1 = require("./index");
var Cart = /** @class */ (function () {
    function Cart() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Cart.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Cart.prototype, "paid", void 0);
    __decorate([
        (0, typeorm_1.Column)("float", { default: 0 }),
        __metadata("design:type", Number)
    ], Cart.prototype, "total", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function (type) { return index_1.User; }, function (user) { return user.cart; }, { eager: true }),
        __metadata("design:type", index_1.User)
    ], Cart.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return index_1.Dvd; }, { eager: true }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", index_1.Dvd)
    ], Cart.prototype, "dvd", void 0);
    Cart = __decorate([
        (0, typeorm_1.Entity)()
    ], Cart);
    return Cart;
}());
exports.Cart = Cart;
//# sourceMappingURL=cart.entity.js.map