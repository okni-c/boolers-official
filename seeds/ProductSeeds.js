const Product = require('..models/Product');

const product = [
    new Product({
        productDescription: 'The minimalist collaboration features chairs, lightening, Shelves, Sofas, Desks and various home accessories, all offering form and function at the same point.We use high-strength clamps and joinery techniques specially designed for engineered wood beds. Ergo, no irksome creaks - and you can sleep like a baby, well into adulthood!',
        productName: 'Boolers Equipped Shirt',
        productQuote: 'The origin of Boolers',
        price: 25.00,
        stock: 50,
        imageRoute: './public/img/merch/shirt_1A.PNG'
    }),
    new Product({
        productDescription: 'The minimalist collaboration features chairs, lightening, Shelves, Sofas, Desks and various home accessories, all offering form and function at the same point.We use high-strength clamps and joinery techniques specially designed for engineered wood beds. Ergo, no irksome creaks - and you can sleep like a baby, well into adulthood!',
        productName: 'Boolers Racing Division Shirt',
        productQuote: 'The racing spirit',
        price: 25.00,
        stock: 60,
        imageRoute: './public/img/merch/shirt_2.PNG'
    }),
    new Product({
        productDescription: 'The minimalist collaboration features chairs, lightening, Shelves, Sofas, Desks and various home accessories, all offering form and function at the same point.We use high-strength clamps and joinery techniques specially designed for engineered wood beds. Ergo, no irksome creaks - and you can sleep like a baby, well into adulthood!',
        productName: 'Boolers Third Shirt',
        productQuote: 'We really just make anything huh?',
        price: 25.00,
        stock: 40,
        imageRoute: './public/img/merch/shirt_3.PNG'
    })
];