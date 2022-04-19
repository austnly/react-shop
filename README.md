# react-shop

A demo e-commerce site using the React library and Google Firestore.

## Requirements

MVP:

-   2 pages:
    -   Home Page
        -   Grid of products
        -   Carousel of featured products
    -   Product Page (with id parameter) Similar to a product page on another site, allows you to add to cart and select product variants

All products should be stored in Firestore, you should store the following information:

-   quantity
-   variants (could be colors, sizes, etc)
-   price per unit
-   name
-   image url
-   favourited or not (boolean)

All data should be stored in Firestore and fetched by the frontend, there should be NO static product data in the react application

Bonus:

-   Using Firestore and react, create a cart system.
-   Create a cart page in your react app
-   Add logic to prevent users from adding items to cart that are no longer in stock.
-   You will have to check the current cart and the product quantity
-   Cart page should have the following:
    -   List of products in cart
    -   ability to change quantity of products in cart
    -   ability to remove items from cart
    -   Make sure you site is scope to one category of products

Cart Logic using States

1. Click add to cart
1. Check cart state for existing ID
1. If ID exists, add 1 to variant quantity
1. If ID does not exist, create and add 1 to variant quantity
1. Set Cart item for this ID in DB

Cart Logic using DB

1. Click add to cart
1. Point to DocId, set all same props except vars
1. If DocId exists, add 1 to var quantity
1. If DocId does not exist, vars should be reset to 0 except passed var, +1
