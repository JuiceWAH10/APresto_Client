import Shop from '../models/shop';
import Product from '../models/products';
import Reward from '../models/rewards';

export const shops = [
    new Shop(
        '1',
        '1',
        'Keitandkat Perfume',
        'Jacob St., Taytay, Rizal',
        'Perfumes'
        )
    ,
    new Shop(
        '2',
        '2',
        'Scrapyard Café & Restaurant',
        '45 Manila E. Rd., Angono, 1930 Rizal',
        'Pinoy Restaurant'
    ),
    new Shop
    (
        '3',
        '3',
        'Blugre Coffee Manila East',
        'Don Hilario Cruz, Taytay, Rizal',
        'Cafe'
    )
]

export const products = [
    new Product
    (
        'a1',
		'1',
        'Big Joe',
        150,
		200,
        'Burger',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'a2',
		'1',
        'VS Vanilla Lace',
        150,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'a3',
		'1',
        'Perry Ellis Perfume',
        155,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'a4',
		'1',
        'Lacoste Black Perfume',
        175,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'a5',
		'1',
        'CK One Type Perfume',
        210,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
    (
        'a6',
		'1',
        'VS Perfume',
        210,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
    (
        'a7',
		'1',
        'Lacoste Black Perfume',
        210,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
    (
        'a8',
		'1',
        'Hanging Diffuser',
        210,
	    200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
    (
        'a9',
		'1',
        'Black Suede',
        210,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
    (
        'a10',
		'1',
        'JV Vien Scent',
        210,
		200,
        'Perfume',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'b1',
		'2',
        'Kalderetang Itik',
        200,
		200,
        'Ulam',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'b2',
		'2',
        'Daing na Bangus',
        150,
		200,
        'Ulam',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'b3',
		'2',
        'Pork Sisig',
        70,
		200,
        'Ulam',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'b4',
		'2',
        'Tapsilog',
        55,
		200,
        'Ulam',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'b5',
		'2',
        'Pork Steak',
        65,
	    200,
        'Ulam',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'c1',
		'3',
        'Durian Frappé',
        70,
		200,
        'Drinks',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'c2',
		'3',
        'Hot/ Iced Choco',
        60,
		200,
        'Drinks',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'c3',
		'3',
        'Americano',
        60,
		200,
        'Drinks',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'c4',
		'3',
        'Cappuccino',
        60,
		200,
        'Drinks',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Product
	(
        'c5',
		'3',
        'Iced Lemon Tea',
        50,
		200,
        'Drinks',
        'available',
        '../../../../assets/DummyShop.jpg'
    )
]

export const rewards = [
    new Reward
    (
        'a1',
        '1',
        'Diffuser Oil',
        10,
        'Lovely smell for lovely suki',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a2',
        '1',
        'Perfume Collection',
        25,
        'Lovely smell for lovely suki',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a3',
        '1',
        'Perfume Pouch',
        25,
        'For your convenience',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a4',
        '1',
        'Perfume Organizer',
        25,
        'For your convenience',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a5',
        '1',
        'PHP100 Voucher',
        50,
        'Kaching!',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a6',
        '1',
        'PHP200 Voucher',
        75,
        'Kaching!',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a7',
        '1',
        'PHP300 Voucher',
        100,
        'Kaching!',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a8',
        '1',
        'PHP500 Voucher',
        250,
        'Kaching!',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a9',
        '1',
        'PHP1000 Voucher',
        500,
        'Kaching!',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'a10',
        '1',
        '50% off Voucher',
        150,
        'Kaching!',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'b1',
        '2',
        'Dinuguan',
        15,
        'INC',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'b2',
        '2',
        'Fresh Buko Juice',
        10,
        '*toktok* kokonat',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'c1',
        '3',
        'Adobo Cheesemelt',
        10,
        'Ulam',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'c2',
        '3',
        'Chicken Pesto',
        10,
        'Mmmm',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'c3',
        '3',
        'Tuna Cheesemelt',
        10,
        'Mmmmm',
        'available',
        '../../../../assets/DummyShop.jpg'
    ),
    new Reward
    (
        'c4',
        '3',
        'Ham and Cheese',
        10,
        'DepEd',
        'available',
        '../../../../assets/DummyShop.jpg'
    )
]