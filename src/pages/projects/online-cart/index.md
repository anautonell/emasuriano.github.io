---
title: Online Cart
date: "2018-04-25"
layout: project
draft: false
path: "/projects/online-cart/"
category: "Exercise"
tags:
 - "React"
 - "Redux"
 - "Styled Components"
description: "Mobile first e-commerce that displays a list of products with prices, the user can the details of any product by clicking on it and also filter them by name and price."
---

![online-cart](./product-detail.gif)

> Mobile first e-commerce application that displays a list of products with prices, the user can see the details of any product by clicking on it and also filter them by name and price.

[Link to the Repo](https://github.com/EmaSuriano/online-cart)

## Context

I was asked to develop an application for an interview which need to display a list of products and also can show information about it. There wasn't any restriction about how it has to look like, so it was kinda of free in that way. Fortunately the APIs were RESTful so that helped a lot to build a more structured application and free me from parsing the response!

There are the endpoint that I had to use:

### Product List

* Url: `https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/list`
* Method: `GET`
* Parameters: `none`

### Product's details

* Url: `https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/{product_id}/detail`
* Method: `GET`
* Parameters: `product_id`

The only requirement was that it must be responsive in order to be correctly displayed in smaller screens, e.g. in a mobile phone or tablet. But, in order to accomplish that I wasn't allowed to use any css framework that helped with that (Bootstrap), so I had to develop myself.

## Technologies implemented

Let's stop with the large introduction and see which stack I choosed. I decided to implement a React+Redux architecture.

### React

Inside React I used for styling mainly styled-components, because of the really cool API so I can simply create a new component that can be easily styled using css and also this css can be modified via props. This gives a lot of flexibility when creating new components!

Also, styled-components have a built-in Theme Provider, so I can define in one place all the color palette for my application and it will be automatically distributed inside all my components.

This is an example of what I was referring to:

```javascript
const PriceTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.fontSize}em; // accessing to props
  background: ${props => props.theme.accent}; //theming
  padding: 0.3em;
  border-radius: 1em;
`;
```

For routing I used react-router as it is the defacto way of handling routes inside React, nothing complex just 2 routes:

* `/`: Home page.
* `/products/:id`: Display a modal with the information of the product.

I used some components that help me building the application:

* react-svg-spinner: just a Spinner, nothing cool.
* react-input-range: a component that displays an input range with a MIN and MAX value.
* holen: Declarative fetch for React, this help me to request the detail of the product, something that I didn't want to store in my store ...
* react-modal: Modal for React which internally uses React.Portal!

### Redux

So this is where it gets interesting. I decided to use a structure called [ducks structure](https://github.com/erikras/ducks-modular-redux) in Redux, which consist in dividing your store into different files, each file represent a feature and inside of it you will find:

* Actions
* Reducer
* Action Creators
* Selectors
* Middleware

This may sound really overwhelming, but in small application this way of writing Redux is awesome! You don't have 10 files just to perform a request to the backend and store inside your store.

I didn't use any helper to create my Redux entities, except for reselect only for performance reasons.

## Summary

```json
{
  "dependencies": {
    // CRA dependencies
    "react": "^16.3.2",
    "prop-types": "^15.6.1",
    "react-dom": "^16.3.2",
    "react-scripts": "^1.1.4",

    // CSS styling
    "styled-components": "^3.2.5",

    // external components
    "react-svg-spinner": "^1.0.1",
    "holen": "^2.0.1",
    "react-responsive-modal": "^2.1.0",
    "react-input-range": "^1.3.0",

    // routing
    "react-router-dom": "^4.2.2",
    "react-router-prop-types": "^1.0.3",

    // redux
    "redux": "^3.7.2",
    "react-redux": "^5.0.7",
    "redux-devtools-extension": "^2.13.2",
    "redux-thunk": "^2.2.0",
    "reselect": "^3.0.1",
    "combine-selectors-redux": "0.0.2"
  }
}
```

## Folder Structure

```
/src
├── ducks
│   └── search.js // Duck
├── screens
│   └── Home
│       └── components //components from this screen only
│       └── index //Connection to redux
│       └── Home //Screen itself
│   └── Product // same structure from above
├── shared
│   └── components //shared components around the application
│       └── Footer.js
│       └── Title.js
│   └── constants
│       └── theme.js
│       └── services.js
│   └── ducks
│       └── products.js //store products information
│       └── services.js //store filters information
│       └── index.js //merge ducks into one!
├── index.js // start of the application
├── App.js // Router and Redux configuration
└── setupTests.js // Jest configuration for all the tests
```

## Testing

As this is a React+Redux application, most of the critical things to test are the 'glue' of the Redux and React. So this is the perfect case for Integration test!

All the tests in this projects are written as integration trying to avoid mocking dependency.

> The more dependencies you mock, the less confidence are your tests.

I'm not saying that Unit test is a bad practice, I'm just saying that in my opinion Integration Test brings more confidence than Unit Test.

## Last words

I had a really good time building this exercise due to the fact I tried new practices, like doing only integration test and not keep always with unit tests, composition of selectors, etc.

I encourage anybody who has to develop an exercise for an interview to always try new things, a new framework or a library. Your submittion will have more quality with it, but first study it and see lots of examples, otherwise your new incorporation could be useless.
