"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDevelopmentServer = exports.getWebClientExpressRouter = void 0;
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
function getWebClientExpressRouter() {
    const router = express_1.default.Router();
    router.use('/', express_1.default.static(__dirname));
    // TODO: Find a way to serve this without using relative path
    router.use('/resources', express_1.default.static(path_1.default.resolve(__dirname, '../node_modules/@amethyst-writer/ui/dist')));
    return router;
}
exports.getWebClientExpressRouter = getWebClientExpressRouter;
async function startDevelopmentServer() {
    const app = (0, express_1.default)();
    app.use(getWebClientExpressRouter());
    const server = http_1.default.createServer(app);
    await (0, util_1.promisify)(server.listen.bind(server))(8000);
    console.log('Started development server');
}
exports.startDevelopmentServer = startDevelopmentServer;
if (require.main === module) {
    startDevelopmentServer();
}
