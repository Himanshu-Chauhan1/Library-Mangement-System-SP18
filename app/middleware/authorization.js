import jwt from 'jsonwebtoken';
import { user,book,issue} from '../models/index.js';
import User from '../models/user.js';

//----------------------------------------authorization----------------------------------------------------*//

let authorization = async function (req, res, next) {
    try {
        let token = req.header('Authorization');
        let splitToken = token.split(" ") 
        let decodedtoken = jwt.verify(splitToken[1], process.env.SECRET_KEY)
        let user = await User.findOne({ _id: userId })
        req.currentUser=user
        if(decodedtoken.userId !== user) {
            return res.status(401).send({ status: 1006, msg: "you are not authorized to do this Please contact Admin for more details" })
           }
        next()
    }
    catch (error) {
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check again" })
    }
}

export { authorization}
   
  