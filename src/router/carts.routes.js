import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
const io = require('socket.io')();
const router = new Router();

const CartRouter = Router();
const carts = new CartManager

CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts())
    res.render('home', { products });
})

CartRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products });
});

CartRouter.get("/", async (req, res) => {
    res.send(await carts.readCarts())
})

CartRouter.get("/:id", async (req, res) => {
    res.send(await carts.getCartsById(req.params.id))
})


CartRouter.post('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(cartId, productId));
})

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('productAdded', (product) => {
        addProducts(product);
        io.emit('updateProducts', product);
    });
});


export default CartRouter