---
title: Brastlewark Finder
date: "2018-04-18"
layout: project
draft: true
path: "/projects/brastlewark-finder/"
category: "Exercise"
tags:
 - "React"
 - "Redux"
 - "GraphQL"
 - "Apollo"
 - "Styled Components"
description: "Web Application which allows you to look for gnomes inside the village of Brastlewark, using Apollo Server and Client."
---

> Web Application which allows you to look for gnomes inside the village of Brastlewark, using Apollo Server and Client.

[Link to the Repo](https://github.com/EmaSuriano/brastlewark-finder)

## Context

I was asked to develop an application for an interview which need to provide an easy way to look for **gnomes** (yes gnomes, the ones that really small) given a single endpoint which returns an array with the folowing structure of objects.

```json
{
     "id": 0,
     "name": "Tobus Quickwhistle",
     "thumbnail":
    "http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg",
     "age": 306,
     "weight": 39.065952,
     "height": 107.75835,
     "hair_color": "Pink",
     "professions": [
       "Metalworker",
       "Woodcarver",
       "Stonecarver",
       " Tinker",
       "Tailor",
       "Potter"
     ],
     "friends": ["Cogwitz Chillwidget", "Tinadette Chillbuster"]
   },
```

The exercise itself wasn't as hard as others, but the real problem was in the normalization of the response coming from the endpoint:

* Professions are an array of hardcoded string, this should be an array of profesion's id.
* Friends has the same problem as professions, but is even worse because if I want to create a relation between gnomes I have to manually look for the gnomes that match exactly the name of the another gnomes DINAMICALLY.

## Technologies implemented

When I saw this response, the first thing that camed to my mind was GraphQL! I always wanted to try Apollo, like ever! But I've never had an opportunity to try it, I mean in my work the project I'm working on isn't suitable for it, the same applies to my side projects.

So I endup implementing the following arquitechture:

* Server: simple node server which starts an apollo-server that it's going to communicate the UI with the restless endpoint, leaving the work of handling the response of the API to this.
* Client: The React application itself, which has to provide an interface so the user can filter gnomes and also see all the information about them.

### Client

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

## Screenshots

![online-cart](./product-detail.gif)

![product-filtering](./product-filter.gif)
