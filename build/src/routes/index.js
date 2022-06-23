"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
var user_routes_1 = require("./user.routes");
var dvd_routes_1 = require("./dvd.routes");
var cart_routes_1 = require("./cart.routes");
var appRoutes = function (app) {
    app.use("/api/users", (0, user_routes_1.userRoutes)());
    app.use("/api/dvds", (0, dvd_routes_1.dvdRoutes)());
    app.use("/api/carts", (0, cart_routes_1.cartRoutes)());
};
exports.appRoutes = appRoutes;
//# sourceMappingURL=index.js.map