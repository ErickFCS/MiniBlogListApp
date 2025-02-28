import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import app from '../app.js'
import User from '../models/user.js'
import supertest from 'supertest'
import mongoose from 'mongoose'


const api = supertest(app)

const users = [
    {
        "username": "robert_delgado",
        "password": "brlRjJMKrs1",
        "passwordHash": "$2b$10$6cm/SYVBrDSSQlTH3YYx3elYbYzW45G.dOwshMwYI0Sdt0eo2ehHS",
        "name": "Robert"
    },
    {
        "username": "luluMorton",
        "password": "aNkhNML3td9cSi6gvgF",
        "passwordHash": "$2b$10$0QNg4/vO.GtzZ/v9v0PHJOEoDtCb.V1Jhv1Ad7AC1T5KjKyaXXRJe",
        "name": "Lulu"
    },
    {
        "username": "erik_herrera",
        "password": "tyacm",
        "passwordHash": "$2b$10$yyPlQ9ZwF/BMydCPYJ51Buq4Pg/UKsnut/PTtXYQe7y75aOM9cGP.",
        "name": "Erik"
    },
    {
        "username": "warrenClark",
        "password": "c0YqXGsmkcuE",
        "passwordHash": "$2b$10$jKeJQOxer5aK51aQ7dZ6OOKyw2Yr0JlvpLVQDVfo5W2PA.L8uoq2y",
        "name": "Warren"
    },
    {
        "username": "bess_collins",
        "password": "NtnGrJBEvUwWsp",
        "passwordHash": "$2b$10$BF4RhITkvbjNxVoMdF7Znu2XkXUJh3q0LQ4b8aIbdoBr/kUnl8x82",
        "name": "Bess"
    },
    {
        "username": "chadFoster",
        "password": "lrCnV8S",
        "passwordHash": "$2b$10$DANAw56yxg.SRTZ7lkwXhe95H7iMSu1X1vInF6Zy3a7Rv4LX4DBA.",
        "name": "Chad"
    },
    {
        "username": "marian_fowler",
        "password": "d3xjm",
        "passwordHash": "$2b$10$TVj78J8i1YYs1QTLkbgIgueZK2lS5KNIFN4YNnkNQtP66otZY0eI2",
        "name": "Marian"
    },
    {
        "username": "jordanWatkins",
        "password": "g9Xr4mweAI",
        "passwordHash": "$2b$10$t.hrrdCIhXE8m7PdVdPTJu1kTiR6uZhPAm3XUgFUVKeECJr85mLkK",
        "name": "Jordan"
    },
    {
        "username": "emilieVargas",
        "password": "8kG2sJ6",
        "passwordHash": "$2b$10$JNe3BQu3T3giIOFXAS/gBO3W6cul3pRM66QURq6cJNdUvojmZxNG6",
        "name": "Emilie"
    },
    {
        "username": "jayden_valdez",
        "password": "QghWZTyDwzt6rtMLg",
        "passwordHash": "$2b$10$OAFZZdyNmvNSx8CELDOcO..bWhHltR2Dml4.u94Ikeq4MLnyABsm.",
        "name": "Jayden"
    }
]

describe('Users API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(users)
    })
    test('Get request to /api/users', async () => {
        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.deepStrictEqual(
            result.body.map(({ username, name }) => ({ username, name })),
            users.map(({ username, name }) => ({ username, name }))
        )
    })
    test('Verify id property is named id and not _id', async () => {
        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        assert.strictEqual(
            result.body.every((e) => (Object.hasOwn(e, "id") && !Object.hasOwn(e, "_id"))),
            true
        )
    })
    test('Post request to /api/users', async () => {
        await User.deleteMany({})
        const newUser = { ...users[0], passwordHash: undefined }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
        const result = await api
            .get('/api/users')
            .expect(200)
        assert.deepStrictEqual(
            { ...newUser, Blog: undefined, id: undefined, password: undefined, passwordHash: undefined },
            { ...result.body[0], Blog: undefined, id: undefined, password: undefined, passwordHash: undefined }
        )
    })
    test('Verify bad requests', async () => {
        await User.deleteMany({})
        await api
            .post('/api/users')
            .send({
                username: "Er",
                password: "qwertyuiop",
                name: "Erick"
            })
            .expect(400)
        await api
            .post('/api/users')
            .send({
                username: "erick_fernando",
                password: "qwertyuiop",
                name: ""
            })
            .expect(400)
        await api
            .post('/api/users')
            .send({
                username: "erick_fernando",
                password: "qw",
                name: "Erick"
            })
            .expect(400)
        const users = await api
            .get('/api/users')
            .expect(200)
        assert.strictEqual(users.body.length, 0)
    })
    after(async () => {
        await mongoose.connection.close()
    })
})
