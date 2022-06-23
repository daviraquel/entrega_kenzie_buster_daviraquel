"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRepository = exports.dvdRepository = exports.cartRepository = exports.userRepository = void 0;
var user_repository_1 = __importDefault(require("./user.repository"));
exports.userRepository = user_repository_1.default;
var cart_repository_1 = __importDefault(require("./cart.repository"));
exports.cartRepository = cart_repository_1.default;
var dvd_repository_1 = __importDefault(require("./dvd.repository"));
exports.dvdRepository = dvd_repository_1.default;
var stock_repository_1 = __importDefault(require("./stock.repository"));
exports.stockRepository = stock_repository_1.default;
//# sourceMappingURL=index.js.map