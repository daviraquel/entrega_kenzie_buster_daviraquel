"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMigration1655981047008 = void 0;
var entities_1 = require("../entities");
var initialMigration1655981047008 = /** @class */ (function () {
    function initialMigration1655981047008() {
        this.name = "initialMigration1655981047008";
    }
    initialMigration1655981047008.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE \"user\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, \"isAdm\" boolean NOT NULL DEFAULT false, \"cartId\" uuid, CONSTRAINT \"UQ_e12875dfb3b1d92d7d7c5377e22\" UNIQUE (\"email\"), CONSTRAINT \"REL_342497b574edb2309ec8c6b62a\" UNIQUE (\"cartId\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"stock\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"quantity\" integer NOT NULL, \"price\" double precision NOT NULL, CONSTRAINT \"PK_092bc1fc7d860426a1dec5aa8e9\" PRIMARY KEY (\"id\"))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"dvd\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"duration\" character varying NOT NULL, \"stockId\" uuid, CONSTRAINT \"REL_a68c996998e86e22dc2580918c\" UNIQUE (\"stockId\"), CONSTRAINT \"PK_1a7f37c43aab7c9a335ee666451\" PRIMARY KEY (\"id\"))")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE \"cart\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"paid\" boolean NOT NULL DEFAULT false, \"total\" double precision NOT NULL DEFAULT '0', \"dvdId\" uuid, CONSTRAINT \"PK_c524ec48751b9b5bcfbf6e59be7\" PRIMARY KEY (\"id\"))")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"user\" ADD CONSTRAINT \"FK_342497b574edb2309ec8c6b62aa\" FOREIGN KEY (\"cartId\") REFERENCES \"cart\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"dvd\" ADD CONSTRAINT \"FK_a68c996998e86e22dc2580918c3\" FOREIGN KEY (\"stockId\") REFERENCES \"stock\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"cart\" ADD CONSTRAINT \"FK_9ed71a7c7e8e5e85c857bf79682\" FOREIGN KEY (\"dvdId\") REFERENCES \"dvd\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.afterMigration().then(function () {
                                queryRunner.connection
                                    .createQueryBuilder()
                                    .insert()
                                    .into(entities_1.User)
                                    .values([
                                    {
                                        name: "kenzinho",
                                        email: "kenzie@mail.com",
                                        password: "umaSenhaForte!",
                                        isAdm: true,
                                    },
                                ])
                                    .execute();
                            })];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    initialMigration1655981047008.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE \"cart\" DROP CONSTRAINT \"FK_9ed71a7c7e8e5e85c857bf79682\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"dvd\" DROP CONSTRAINT \"FK_a68c996998e86e22dc2580918c3\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE \"user\" DROP CONSTRAINT \"FK_342497b574edb2309ec8c6b62aa\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"cart\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"dvd\"")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"stock\"")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE \"user\"")];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return initialMigration1655981047008;
}());
exports.initialMigration1655981047008 = initialMigration1655981047008;
//# sourceMappingURL=1655981047008-initialMigration.js.map