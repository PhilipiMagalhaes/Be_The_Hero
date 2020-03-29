const connection = require('../database/connection');


module.exports ={
   async create(request,response){
    const {title, description, value} = request.body;
    const id_Ong = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        id_Ong
    });
    return response.json({id});
   } 
}