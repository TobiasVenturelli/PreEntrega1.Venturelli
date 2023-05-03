import express from "express";
import ProductRouter from "./router/product.routes.js"
import CartRouter from "./router/carts.routes.js"

const handlebars = require('handlebars');

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('User connected');
});


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`);

})