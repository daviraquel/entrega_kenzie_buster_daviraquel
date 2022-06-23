"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoutes = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var authUser_middleware_1 = __importDefault(require("../middlewares/authUser.middleware"));
var checkEmptyCart_middleware_1 = __importDefault(require("../middlewares/checkEmptyCart.middleware"));
var routes = (0, express_1.Router)();
var cartRoutes = function () {
    routes.put("/pay", authUser_middleware_1.default, checkEmptyCart_middleware_1.default, controllers_1.cartController.payCart);
    return routes;
};
exports.cartRoutes = cartRoutes;
//# sourceMappingURL=cart.routes.js.map