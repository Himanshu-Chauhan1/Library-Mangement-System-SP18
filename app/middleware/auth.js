import jwt from 'jsonwebtoken';
import { user,book,issue,activity} from '../models/index.js';
import User from '../models/user.js';


//----------------------------------------authentication----------------------------------------------------*/
const authentication = async function (req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(422).send({ status: 1002, message: "login is required" })

        let splitToken = token.split(" ")

        let verifiedtoken = jwt.verify(splitToken[1], "securedprivatekey")
        if (!verifiedtoken) return res.status(422).send({ status: 1003, message: "token is invalid" })

        let exp = verifiedtoken.exp
        let iatNow = Math.floor(Date.now() / 1000)
        if (exp < iatNow) {
                return res.status(401).send({ status: 1005, message: 'session expired, please login again' })
        }
        next();
    }
    catch (error) {
        return res.status(422).send({status: 1001, msg: "Something went wrong Please check again" })
    }
}
   
   // //----------------------------------------authorization----------------------------------------------------*/

let authorization = async function (req, res, next) {
    try {
        let token = req.header('Authorization', 'Bearer Token');
        let splitToken = token.split(" ") 
        let decodedtoken = jwt.verify(splitToken[1], "securedprivatekey")
        let userId = req.params.userId;
        if (!isValidObjectId(userId))
        return res.status(422).send({ status: 1003, msg: "Please enter valid userId" })

        let user = await User.findOne({ _id: userId })
        req.currentUser=user
        if (!user) { return res.status(404).send({ status: 1006, msg: "user does not exist with this userId" }) }
        if (decodedtoken.userId != user._id){
         return res.status(403).send({ status: 1007, msg: " unauthorised access" }) }
        next()
    }
    catch (error) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check again" })
    }
}

export { authentication, authorization}
   
  