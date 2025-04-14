"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = require("./routes");
const config_1 = require("./config");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)({
            origin: config_1.ORIGIN,
            credentials: config_1.CREDENTIALS,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Server is running!');
        });
        const appRouter = new routes_1.AppRouter();
        this.app.use(`/api/${config_1.VERSION}`, appRouter.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map