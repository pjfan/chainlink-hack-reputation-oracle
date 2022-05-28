import express, { Request, Response, Express } from 'express';
// import { rootHandler, helloHandler } from './handlers';
import { apiRouter } from './routes/api';

const app: Express = express();
const port: string = process.env.PORT || '3000';

app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRouter)

app.get('/', function(req: Request, res: Response): Response {
    return res.json({
        "desc": "Web3 ReputationOracle API. (API portion of project for Chainlink Hackathon Spring 2022)"
    });
});


app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});