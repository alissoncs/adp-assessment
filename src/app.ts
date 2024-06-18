import express from 'express';
// import handleMathOperation from './domain/service/handleMathOperation';
import path from 'path';
import cors from 'cors';
import MathService from './domain/service/math-service';
import { AdpApi } from './adapter/adp-api';

const app = express();

app.use(cors());

const mathService = new MathService(new AdpApi());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.get('/', (req, res) => {
    mathService.findAllExecutions().then((data) => {
        res.render('index', {
            operations: data,
        });
    });
});


mathService.executeMathOperationsInBackground()

export default app;