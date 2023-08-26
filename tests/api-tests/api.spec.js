const {test,expect} = require('@playwright/test')


test.describe.parallel('API tests', ()=> {
    const baseURL = "https://reqres.in/api";


    test("Simple get test to test the status 200", async ({ request }) => {
      const response = await request.get(baseURL+"/users/2")
      expect(response.status()).toBe(200)
      const responseBody = JSON.parse(await response.text())
    })


    test("Simple get test to test status 404, for a user which doesn't exist", async ({ request }) => {
        const response = await request.get(baseURL+"/users/2x")
        expect(response.status()).toBe(404)
    })


    test("Simple get test to test the status 200, get the user detail", async ({ request }) => {
        const response = await request.get(baseURL+"/users/1")
        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe("George")
    })




    test("POST - Create a new user", async ({ request }) => {
        const response = await request.post(baseURL+"/user",{
            data: {
                id: 1000,
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBe(1000)   
    })


    test("POST - Login to the system", async({ request }) => {
        const response = await request.post(baseURL+"/login",{
            data: {            
                    email: "eve.holt@reqres.in",
                    password: "cityslicka"               
            }
        })
         const responseBody = JSON.parse(await response.text())
         expect(response.status()).toBe(200)
         expect(responseBody.token).toBeTruthy()
    })


    test("PUT - Check the user details can be edited", async({ request }) => {
        const response = await request.put(baseURL+"/users/2", {
            data: {
                "name": "morpheus",
                "job": "zion resident"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.job).toBe("zion resident")
        expect(responseBody.updatedAt).toBeTruthy()
    })


    test("Delete - Check whether user deletion can be done", async({ request }) => {
        const response = await request.delete(baseURL+"/users/2")
        expect(response.status()).toBe(204)
    })


})