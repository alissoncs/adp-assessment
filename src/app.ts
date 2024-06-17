import express from 'express';
import handleMathOperation from './domain/service/handleMathOperation';

const app = express();

app.get('/', (req, res) => res.send("ok"));

app.get('/execute', (req, res) => {
    handleMathOperation()
        .then((data) => {
            return res.json({
                data
            });
        })
        .catch(err => {
            throw err;
        });
});

export default app;