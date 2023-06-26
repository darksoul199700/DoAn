"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
        credentials: true
    });
    app.useStaticAssets(path_1.join(__dirname, '..', 'photos'), {
        index: false,
        prefix: '/photos',
    });
    const option = new swagger_1.DocumentBuilder()
        .setTitle('Social_network')
        .setDescription('using for test api')
        .setVersion('1.0')
        .addTag('Users')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, option);
    swagger_1.SwaggerModule.setup('', app, document);
    await app.listen(8888);
}
bootstrap();
//# sourceMappingURL=main.js.map