
import {Router} from 'express'
import {v4} from 'uuid';
import User from './app/models/User';

const routes = new Router()

routes.get('/', async (request, response) =>{
const user = await User.create({
    id: v4(),
    name: 'Fagner',
    email: 'faglincojesus@gmail.com',
    password_hash: 'asdfjkl'
});

 return response.status(201).json(User);

});

export default routes;