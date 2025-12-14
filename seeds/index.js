import mongoose from "mongoose";
import User from "../models/user.js";
import Blog from "../models/blog.js";
import logger from "../utils/logger.js";
import config from "../utils/config.js";

const blogs = [
    {
        title: 'TEST React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'TEST Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'TEST Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        title: 'TEST First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10
    },
    {
        title: 'TEST TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        title: 'TEST Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
];

const users = [
    {
        'username': 'admin',
        'password': 'password',
        'passwordHash': '$2b$10$s7EavavMtaF1B9FOHNrxZuoB5OTFrx/VnqMcomb/gSgnAlYvsjeTq',
        'name': 'TEST Admin 1'
    },
    {
        'username': 'admin2',
        'password': 'password',
        'passwordHash': '$2b$10$s7EavavMtaF1B9FOHNrxZuoB5OTFrx/VnqMcomb/gSgnAlYvsjeTq',
        'name': 'TEST Admin 2'
    }
];

try {
    await mongoose.connect(config.URI);
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    logger.info('connection to mongodb succeed');
    await Blog.deleteMany({ title: /TEST/ });
    await User.deleteMany({ name: /TEST/ });
    await User.insertMany(users);
    let { id } = await User.findOne();
    await Blog.insertMany(blogs.map((e) => ({ ...e, User: id })));
} catch (error) {
    logger.error('connection to mongodb failed', error);
} finally {
    await mongoose.disconnect()
}
