"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: (0, path_1.join)(__dirname, '..', '/src', '/.env') });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.useStaticAssets((0, path_1.join)(__dirname, "..", "src/public"));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map