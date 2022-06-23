"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var schemaValidation_middleware_1 = __importDefault(require("../middlewares/schemaValidation.middleware"));
var checkDuplicateEmail_middleware_1 = __importDefault(require("../middlewares/checkDuplicateEmail.middleware"));
var checkAdmCreate_middleware_1 = __importDefault(require("../middlewares/checkAdmCreate.middleware"));
var userCreate_schema_1 = require("../schemas/user/userCreate.schema");
var userLogin_schema_1 = __importDefault(require("../schemas/user/userLogin.schema"));
var routes = (0, express_1.Router)();
var userRoutes = function () {
    routes.post("/register", (0, schemaValidation_middleware_1.default)(userCreate_schema_1.userCreateSchema), checkDuplicateEmail_middleware_1.default, checkAdmCreate_middleware_1.default, controllers_1.userController.createUser);
    routes.post("/login", (0, schemaValidation_middleware_1.default)(userLogin_schema_1.default), controllers_1.userController.loginUser);
    return routes;
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.routes.js.map