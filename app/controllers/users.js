import { user,book,issue,activity } from '../models/index.js';
import {isValid, isValidRequestBody ,isValidObjectId} from '../validator/validator.js'
import signAccessToken from "../helperJWT/jwtCreation.js"
import bcrypt from 'bcrypt';



//========================================POST /register==========================================================

const create = async function(req, res) {
    try {
        const data = req.body

        const { title, name, phone, email, password, address } = req.body

        const phoneValidator = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/

        const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Body is required" })
        }

        if (!isValid(title)) {
            return res.status(422).send({ status: 1002, message: "title is required" })
        }

        if (!(title == 'Mr' || title == 'Mrs' || title == 'Miss')) {
            return res.status(422).send({ status: 1003, message: "title only can be Mr, Mrs and Miss" })
        }

        if (!isValid(name)) {
            return res.status(422).send({ status: 1002, message: "Name is required" })
        }

        if (!(phone)) {
            return res.status(422).send({ status: 1002, message: "Phone No. is required" })
        }

        if (!phoneValidator.test(phone)) {
            return res.status(422).send({ status: 1003, message: "plz enter a valid Phone no" });
        }

        const isRegisteredphone = await user.findOne({ phone }).lean();

        if (isRegisteredphone) {
            return res.status(422).send({ status: 1008, message: "phoneNo. number already registered" });
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: 1002, message: "Email is required" })
        }

        if (!emailValidator.test(email)) {
            return res.status(400).send({ status: 1003, message: "plz enter a valid Email" });
        }

        const isRegisteredEmail = await user.findOne({ email }).lean();
        if (isRegisteredEmail) {
            return res.status(422).send({ status: 1008, message: "email id already registered" });
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "Password is required" })
        }
        if (password.length < 8) {
            return res.status(422).send({ status: 1003, message: "Your password must be at least 8 characters" })
        }
        if (password.length > 15) {
            return res.status(422).send({ status: 1003, message: "Password cannot be more than 15 characters" })
        }

        if (address != undefined) {
            if (address.street != undefined) {
                if (typeof address.street != 'string' || address.street.trim().length == 0) {
                    return res.status(422).send({ status: 1002, message: "street can not be a empty string" })
                }
            }

            if (address.city != undefined) {
                if (typeof address.city != 'string' || address.city.trim().length == 0) {
                    return res.status(422).send({ status: 1002, message: "city can not be a empty string" })
                }
            }

            if (address.pincode != undefined) {
                if (address.pincode.toString().trim().length == 0 || address.pincode.toString().trim().length != 6) {
                    return res.status(422).send({ status: 1003, message: "Pincode can not be a empty string or must be 6 digit number " })
                }
            }
        }
        
        const userCreated = await user.create(data)

        res.status(201).send({ status: 1009, message: "User has been created successfully", data: userCreated })

    } catch (err) {
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST /login==========================================================

let login = async(req, res) => {
    try {
        const data = req.body;
        let { email, password } = data
        if (!Object.keys(data).length) return res.status(422).send({ status: 1002, msg: "Please Provides the Details" })

        const emailValidator = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        if (!isValid(email)) {
            return res.status(422).send({ status: 1002, message: "Email is required" })
        }

        if (!emailValidator.test(email)) {
            return res.status(422).send({ status: 1003, message: "Email should be a valid email address" })
        }

        if (!isValid(password)) {
            return res.status(422).send({ status: 1002, message: "password is required" })
        }

        const user1 = await user.findOne({ email: email });
        if (!user1) {
            return res.status(422).send({ status: 1003, message: "Invalid email credentials" });
        }
        let checkPassword = await bcrypt.compare(password, user1.password)
        if (!checkPassword) return res.status(422).send({ status: 1003, msg: " Invalid password credentials" })

        const token = await signAccessToken(user1._id.toString());

        res.header("x-auth-token", token)
        
        const userData = {token: token }
        return res.status(200).send({ status: 1010, message: "User successfully logged in", data: userData })

    } catch (error) {
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check back again" })
    }
}


export {create,login}
