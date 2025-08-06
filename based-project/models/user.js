const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProduct = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProduct >= 0) {
            newQuantity = this.cart.items[cartProduct].quantity + 1;
            updatedCartItems[cartProduct] = {
                productId: product._id,
                quantity: newQuantity
            };
        } else {
            updatedCartItems.push({ productId: product._id, quantity: newQuantity });
        }
        const updatedCart = { items: updatedCartItems };

        const db = getDb();
        return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(item => item.productId);
        return db.collection('products').find({
            _id: { $in: productIds }
        })
            .toArray()
            .then(products => {
                return products.map(product => {
                    return {
                        ...product,
                        quantity: this.cart.items.find(item => item.productId.toString() === product._id.toString()).quantity
                    };
                });
            })
            .catch(err => console.log(err));
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
        const db = getDb();
        return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: updatedCartItems } } });
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
            console.log("name", this.name, this.email)
            const order = {
                items: products,
                user: {
                    _id: this._id,
                    name: this.name
                }
            }
            return db.collection('orders').insertOne(order)
        })
            .then(result => {
                this.cart = { items: [] };
                return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
            })
            .catch(err => console.log(err))
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({ 'user._id': this._id }).toArray();
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: ObjectId.createFromHexString(userId) })
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => console.log(err));
    }
}

module.exports = User;