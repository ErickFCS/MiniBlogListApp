import "dotenv/config.js"


const URI = process.env.NODE_ENV === "test" ? process.env.TEST_URI : process.env.URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET

export default { URI, PORT, JWT_SECRET }