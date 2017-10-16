import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: express.Request, res: express.Response, next: () => void) => {
    // Security: no one should know what software is running backend
    res.removeHeader('X-Powered-By');
    next();
});

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/static');
});

app.get('/static/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/static');
});

app.post('/api/submitForm', (req: express.Request, res: express.Response) => {
    res.json({
        names: req.body.names || [],
        items: [
            {
                item: 'Sales Tax',
                price: '2.94',
            },
            {
                item: 'men\'s lavge theyma\' shin ',
                price: '10.99',
            },
            {
                item: 'men\'s sue 34 hiking shuns, brawn ',
                price: '29.95',
            },
            {
                item: 'water bottle ',
                price: '10.95',
            },
            {
                item: 'women\'s ankle running socks ',
                price: '5.99',
            },
        ]
     });
});

const port = process.env.ART_ZOOMER_PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Application running on localhost:${port}`));
