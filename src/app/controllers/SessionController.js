import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';


class SessionController {
    async store(request, response) {
       
            const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
                });
                
        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIncorrect = () => 
           response
                .status(401)
                .json({ error: "Make Sore your email or password are correct" });
            

        if (!isValid) {
            return emailOrPasswordIncorrect();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email,
            }
        });

        if (!user) {
            return emailOrPasswordIncorrect();
        }

        const isSomePassword = await user.checkPassword(password);

        if (!isSomePassword) {
            return emailOrPasswordIncorrect();
        }
      
        return response.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin,
            token: jwt.sign({id: user.id}, '975359016138b0223ab789505f7dbeca',{
                expiresIn: '5d',
            }),

             });
         
    }
}
export default new SessionController();
