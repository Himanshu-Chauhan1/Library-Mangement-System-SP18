import { user } from '../models/index.js'
import signAccessToken from "../helpers/jwt.js"
import bcrypt from 'bcrypt'



//========================================POST /register==========================================================//

const create = async function (req, res) {
    try {

        const userCreated = await user.create(req.body)

        res.status(201).send({ status: 1009, message: "User has been created successfully", data: userCreated })

    } catch (err) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST /login==========================================================

let login = async (req, res) => {
    try {

        let data=req.body

        let { email, password } = data

        const user1 = await user.findOne({ email: email });
        if (!user1) {
            return res.status(422).send({ status: 1003, message: "Invalid email credentials" });
        }
        let checkPassword = await bcrypt.compare(password, user1.password)
        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid password credentials" })

        const token = await signAccessToken(user1._id.toString());

        const userData = { token: token }
        return res.status(200).send({ status: 1010, message: "User successfully logged in", data: userData })

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/updateUser==========================================================//

const updateUser = async function (req, res) {
    try {

    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


//========================================POST/getUsers==========================================================//

const getAllUsers = async function (req, res) {
    try {

        let userData = await user.find({ $and: [{ isDeleted: false }, { isAdmin: false }] }).select({ title: 1, name: 1, phone: 1, email: 1, password: 1, joined: 1, address: 1 })

        if (!userData) {
            return res.status(422).send({ status: 1006, message: "No Users Found....." });
        }

        return res.status(200).send({ status: 1010, message: 'All Users', data: userData })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================POST/deleteBooks==========================================================//

const deleteUser = async function (req, res) {
    try {

        let userId = req.params.userid

        let checkUser = await user.findOne({ $and: [{ _id: userId }, { isDeleted: false }] })

        if (!checkUser) {
            return res.status(422).send({ status: 1011, message: "User Already Deleted" })
        }

        let updateUser = await user.findOneAndUpdate({ _id: userId }, { isDeleted: true, deletedAt: Date.now() }, { new: true })

        return res.status(200).send({ status: 1010, message: 'User has been deleted Successfully', data: updateUser })
    }
    catch (err) {

        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};


export { create, login, updateUser, getAllUsers, deleteUser }
