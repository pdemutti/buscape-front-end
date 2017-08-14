# Buscape challenge
--------------------

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

* Node.js - [Download and install Node.js](https://nodejs.org/en/download/);
* MongoDb - [Download and install mongo](https://docs.mongodb.com/manual/installation/) and the npm package manager, if you don't have it yet.

## Quick install

The first thing you should do is install the Node.js dependencies. To install Node.js dependencies you're going to use npm again. In your application folder run this in the command-line:

```bash
$ npm install
```

You'll need to insert all data of products.json into mongodb

```bash
$ npm run loadDataBase
```

Starting application

```bash
$ npm start
```

Listening port on 3001

```bash
http://localhost:3001/
```


Endpoints Documentation
-------------
### Add Cart endpoint

  > Add new item to cart, using cookie to indentify user cart

Endpoint: /cart/add/{idProduct} <br />
method: GET <br />
response :  <br />
Set-Cookie:cart={cartId}   <br />
body:
```
{
"items" : [
        {
          "id" : 2321312,
          "name" : "Smartphone Apple iPhone 7 128GB",
          "image" : [
              "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb_600x600-PU98460_1.jpg",
              "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_2_c.jpg?v=2347575274",
              "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_3_c.jpg?v=318433138",
              "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_4_c.jpg?v=33273730"
          ],
          "price" : 3509.1,
          "installments" : 10,
          "installmentsValue" : 389.9
      }
  ],
  "_id": "598d21557c7c5d8066db6483"
}
```

### Remove Cart endpoint

  > Remove item from cart, return cart after removed

Endpoint: /cart/remove/{idProduct} <br />
method: GET <br />
response :  <br />
body:
```
{
  "_id": "5823a966a8c2d24580c9495c",
  "items": [
      {
        "id" : 2321312,
        "name" : "Smartphone Apple iPhone 7 128GB",
        "image" : [
            "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb_600x600-PU98460_1.jpg",
            "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_2_c.jpg?v=2347575274",
            "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_3_c.jpg?v=318433138",
            "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_4_c.jpg?v=33273730"
        ],
        "price" : 3509.1,
        "installments" : 10,
        "installmentsValue" : 389.9
    },
    {...}
  ]
}
```

### Products endpoint

  > Find all product items

Endpoint: /products <br />
method: GET <br />
response :  <br />
body:
```
[
  {
    "_id" : ObjectId("598d16695bd9477dd304265d"),
    "id" : 2321312,
    "name" : "Smartphone Apple iPhone 7 128GB",
    "images" : [
        "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb_600x600-PU98460_1.jpg",
        "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_2_c.jpg?v=2347575274",
        "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_3_c.jpg?v=318433138",
        "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_4_c.jpg?v=33273730"
    ],
    "price" : {
        "value" : 3509.1,
        "installments" : 10,
        "installmentValue" : 389.9
    }
  },
  {...}
]  
```


### Cart endpoint

  > Find all cart items

Endpoint: /cart <br />
method: GET <br />
response :  <br />
body:
```
{
  "_id": "5823a966a8c2d24580c9495c",
  "items" : [
          {
            "id" : 2321312,
            "name" : "Smartphone Apple iPhone 7 128GB",
            "image" : [
                "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb_600x600-PU98460_1.jpg",
                "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_2_c.jpg?v=2347575274",
                "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_3_c.jpg?v=318433138",
                "http://thumbs.buscape.com.br/celular-e-smartphone/smartphone-apple-iphone-7-128gb/__200x400-PU98460_4_c.jpg?v=33273730"
            ],
            "price" : 3509.1,
            "installments" : 10,
            "installmentsValue" : 389.9
        },  
        {...}
    ]
}
```


## Structure

The basic structure of this challenge is given in the following way:

* `buscape-front-end/`Contains the source code of the front-end challenge.
* `data/`Contains sample json file.
* `node_modules/` Contains all dependencies fetched via [NPM](https://www.npmjs.org/). However, this directory is unnecessary for versioning, so it is ignored.
* `public/` Contains all the static files you use in your application, this is where you store your front-end files.
* `.gitignore` The .gitignore file specifies intentionally untracked files that Git should ignore.
* `LICENSE` A software license tells others what they can and can't do with your source code.
* `package.json` Lists all [Node.js](http://nodejs.org/) dependencies.
* `README.md` Explains how your application works.
