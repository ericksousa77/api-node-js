
const jwt = require('jsonwebtoken');
const AuthConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({error: 'no token provided!'});

    // Bearer sopdkapsdsad123asdasdjaosnd2  
    
    const parts = authHeader.split(' ');  //separando em Bearer e hash

    if(!parts.length === 2)   //checando se possui as duas partes
        return res.status(401).send({error: 'token error!'});

    const [ scheme, token ] = parts;  //desestruturando , scheme deve ter a palavra Bearer

    if(!/^Bearer$/i.test(scheme))   //regex pra checar se começa com Bearer / = inicio da regex ^ = inicio da verify $ = fim da verify / = fim da regex
        return res.status(401).send({error: 'token malformated!'});


    jwt.verify(token, AuthConfig.secret, (err, decoded)=>{  //decoded = id do usuario se o token tiver correto
        if(err)
            return res.status(401).send({error: 'invalid token!'});
        
        req.userId = decoded.id;
        return next();
    });
    
};
