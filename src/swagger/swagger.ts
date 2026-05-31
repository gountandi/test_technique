import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "OrgaAfrica API",
            version: "1.0.0",
            description:
                "API de gestion dynamique des commandes et paiements restaurants"
        },
        servers: [
            {
                url: "http://localhost:3000/api"
            }
        ]
    },

    apis: ["./src/routes/*.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;