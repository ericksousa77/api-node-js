import nodemailer from 'nodemailer';
import {host, port, user, pass} from '../config/mail.json'
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

//sintaxe curta do es6
const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user,pass },
});

transport.use('compile', hbs({

    viewEngine: {
  
      defaultLayout: undefined,
  
      partialsDir: path.resolve('./src/resources/mail/')
  
    },
  
    viewPath: path.resolve('./src/resources/mail/'),
  
    extName: '.html',
}));

export default transport;