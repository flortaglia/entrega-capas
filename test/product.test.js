const supertest = require("supertest") ;
const { expect } = require("chai")   ;
const productGenerate = require("./product.generate.js")  ;

let request;

describe("Test sobre Productos", () => {
    before(() => {
        request = supertest("http://localhost:8080");
    });

  describe("- POST /api/productos", () => {
        const productToCreate = productGenerate.generateProduct();
        let response
        
        it("Creamos producto, debería devolver status 200", async () => {
        
        response = await request
                    .post("/api/productos")
                    .send(productToCreate);

        expect(response.status).to.eql(200);
        });
    });
    // it("Should return the created product", () => {
    //     expect(response.body.title).to.eql(productToCreate.title);
    //     expect(response.body.thumbnail).to.eql(productToCreate.thumbnail);
    //     expect(response.body.description).to.eql(productToCreate.description);
    //     expect(response.body.price).to.eql(Number(productToCreate.price));
    //     expect(response.body.stock).to.eql(Number(productToCreate.stock));
    //     expect(response.body.code).to.eql(Number(productToCreate.code));
    // });

    describe("- GET /api/productos", () => {
        it("Deberia devolver status 200", async () => {
        response = await request
            .get("/api/productos")
            .set({ productId: "6325e134691a867ef6d0ffd3" });

        expect(response.status).to.eql(200);
        expect(response.body.data).to.keys("title", "description", "code","price", "thumbnail", "stock");
        });
    });

    describe("- GET Unkown", () => {
        it("Deberia devolver status 404", async () => {
        const response = await request.get("/asdasds");

        expect(response.status).to.eql(404);
        });
    });
});