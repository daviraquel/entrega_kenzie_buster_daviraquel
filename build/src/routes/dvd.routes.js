"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dvdRoutes = void 0;
var express_1 = require("express");
var dvd_controller_1 = __importDefault(require("../controllers/dvd.controller"));
var schemaValidation_middleware_1 = __importDefault(require("../middlewares/schemaValidation.middleware"));
var checkAdmPermission_middleware_1 = __importDefault(require("../middlewares/checkAdmPermission.middleware"));
var authUser_middleware_1 = __importDefault(require("../middlewares/authUser.middleware"));
var dvdCreate_schema_1 = __importDefault(require("../schemas/dvd/dvdCreate.schema"));
var dvdBuy_schema_1 = __importDefault(require("../schemas/dvd/dvdBuy.schema"));
var checkDvdExist_middleware_1 = __importDefault(require("../middlewares/checkDvdExist.middleware"));
var checkDvdQtd_middleware_1 = __importDefault(require("../middlewares/checkDvdQtd.middleware"));
var routes = (0, express_1.Router)();
var dvdRoutes = function () {
    routes.post("/register", (0, schemaValidation_middleware_1.default)(dvdCreate_schema_1.default), checkAdmPermission_middleware_1.default, dvd_controller_1.default.createDvds);
    routes.get("/", dvd_controller_1.default.listDvds);
    routes.post("/buy/:dvdId", authUser_middleware_1.default, (0, schemaValidation_middleware_1.default)(dvdBuy_schema_1.default), checkDvdExist_middleware_1.default, checkDvdQtd_middleware_1.default, dvd_controller_1.default.buyDvd);
    return routes;
};
exports.dvdRoutes = dvdRoutes;
//# sourceMappingURL=dvd.routes.js.map