import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Study Planner API",
            description: "API documentation for the Study Planner application",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "Development server",
            },
        ],
    },
    apis: ["./server/routes/*.js"],
};