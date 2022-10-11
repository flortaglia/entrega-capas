const supertest = require("supertest") ;
const { expect } = require("chai")   ;
const productGenerate = require("./product.generate.js")  ;

let request;
let response
let id
describe("Test sobre Productos", () => {
    before(() => {
        request = supertest("http://localhost:8080");
    });

    describe("- POST /api/productos", () => {
        const productToCreate = productGenerate.generateProduct();
        
        
        it("Creamos producto, debería devolver status 201", async () => {
            response = await request
                        .post("/api/productos")
                        .send(productToCreate);
            id=response.body._id
            console.log ('id',id)
            expect(response.status).to.eql(201);
            expect(response.body.title).to.eql(productToCreate.title);
            expect(response.body.thumbnail).to.eql(productToCreate.thumbnail);
            expect(response.body.description).to.eql(productToCreate.description);
            expect(response.body.price).to.eql(Number(productToCreate.price));
            expect(response.body.stock).to.eql(Number(productToCreate.stock));
            expect(response.body.code).to.eql(Number(productToCreate.code));
        });
    });
   
    describe("- GET /api/productos", () => {
        it("Deberia devolver status 200", async () => {
        response = await request
            .get("/api/productos")
    
        expect(response.status).to.eql(200);
        });
    });

    describe("- GET Unkown", () => {
        it("Deberia devolver status 404", async () => {
        const response = await request.get("/asdasds");

        expect(response.status).to.eql(404);
        });
    });

    describe("- GET /api/productos/id", () => {
        it("Deberia devolver status 200", async () => {
        response = await request
            .get(`/api/productos/${id}`)
            // .set({ productId: "6325e134691a867ef6d0ffd3" }); x header

        expect(response.status).to.eql(200);
        
        expect(response.body).to.keys("_id","title", "description", "code","price", "thumbnail", "stock");
        });
    });

    describe("- DELETE /api/productos/id", () => {
        it("Deberia devolver status 200", async () => {
        response = await request
            .delete(`/api/productos/${id}`)
        expect(response.status).to.eql(200);
        });
    });

    describe("- PUT /api/productos/id", () => {
        const productToCreate = productGenerate.generateProduct();
        let response
        
        it("Creamos producto, debería devolver status 201", async () => {
            response = await request
                        .put(`/api/productos/${id}`)
                        .send(productToCreate);

            expect(response.status).to.eql(201);
        });
    });

});