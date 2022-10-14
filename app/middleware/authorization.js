import jwt from 'jsonwebtoken';
import { user,book,issue,activity} from '../models/index.js';
import User from '../models/user.js';

//----------------------------------------authorization----------------------------------------------------*//

let authorization = async function (req, res, next) {
    try {
        let token = req.header('Authorization');
        let splitToken = token.split(" ") 
        let decodedtoken = jwt.verify(splitToken[1], process.env.SECRET_KEY)
        let userId = req.SessionID
        if (!isValidObjectId(userId))
        return res.status(422).send({ status: 1003, msg: "You are not a valid User" })

        let user = await User.findOne({ _id: userId })
        req.currentUser=user
        if (!user) { return res.status(404).send({ status: 1006, msg: "you are not authorized to do this Please contact Admin for more details" }) }
        if (decodedtoken.userId != user._id){
         return res.status(403).send({ status: 1007, msg: " unauthorised access" }) }
        next()
    }
    catch (error) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check again" })
    }
}

export { authorization}
   
  