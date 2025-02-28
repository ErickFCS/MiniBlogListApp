import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username must be given"],
        unique: true,
        validate: {
            validator: (v) => (
                /^.{3,}$/.test(v)
            ),
            message: "username must be at least 3 characters long"
        }
    },
    passwordHash: {
        type: String,
        required: [true, "there must be a password"]
    },
    name: {
        type: String,
        required: [true, "you must have a name"]
    },
    Blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

userSchema.set('toObject', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = mongoose.model("User", userSchema)

export default User