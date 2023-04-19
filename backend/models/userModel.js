import bcrypt from 'bcryptjs'
import { mongoose } from 'mongoose'

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        userColor: {
            type: String,
            default: '#f44336',
        },
        id: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

// hash user's password with salt before saving document to db
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// extend matchPassword function unto userSchema
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
