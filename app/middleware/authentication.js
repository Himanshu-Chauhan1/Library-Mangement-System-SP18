import jwt from 'jsonwebtoken';
import { user, book, issue } from '../models/index.js';


//----------------------------------------authentication----------------------------------------------------*/
const authentication = async function (req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(422).send({ 1002: false, message: "Token is Required" })

        let splitToken = token.split(" ")
        jwt.verify(splitToken[1], process.env.SECRET_KEY, (error, data) => {
            if (error) {
                return res.status(401).send({ status: 1007, message: "Unauthorized Access" })
            } else {
                req.userId = data.aud
                next();
            }
        })
    }
    catch (error) {
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check again" })
    }
}
  
export { authentication }



   
  