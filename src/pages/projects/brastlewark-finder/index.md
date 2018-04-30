---
title: Brastlewark Finder
date: "2018-04-18"
layout: project
draft: false
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

![Brastlewark Finder](./brastlewark-finder.gif)

> Web Application which allows you to look for gnomes inside the village of Brastlewark, using Apollo Server and Client.

[Link to the Repo](https://github.com/EmaSuriano/brastlewark-finder)

## Context

I was asked to develop an application for an interview which needs to provide an easy way to look for **gnomes** (yes gnomes, the ones that are really small) given a single endpoint which returns an array with the folowing structure of objects.

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

* `Professions` are an array of hardcoded string, this should be an array of profesion's id.
* `Friends` has the same problem as `professions`, but is even worse because if I want to create a relation between gnomes I have to manually look for the gnomes that match exactly the name of the another gnomes DINAMICALLY.

## Technologies implemented

When I saw this response, the first thing that camed to my mind was GraphQL! I always wanted to try Apollo, but I've never had an opportunity to try it, I mean in my work the project I'm working on isn't suitable for it, the same applies to my side projects.

So I endup implementing the following arquitechture:

* Server: a simple node server which starts an apollo-server that it's going to communicate the UI with the restless endpoint, leaving the work of handling the response of the API to this.
* Client: The React application itself, which has to provide an interface so the user can filter gnomes and also see all the information about them.

### Client

Communicate with the Server and provides a simple page which will help the user to find gnomes with a specific name or with different proffessions. To filter by name I used a simple TextInput with free text and for the professions I used `react-select` which allow me to filter by multiple values of an array so I can search for gnomes with more than one profession at the same time!

After the user select a gnome a popup will be displaying showing all the information about it:

* Name
* Picture
* Height and weigth
* A list of professions
* Friends of it: This is where GraphQL brings all the magic! I can request the gnome information and his friends too, but the only what I want (name, picture and professions) with only one request!

For routing I used `react-router` as it is the defacto way of handling routes inside React, nothing complex just 2 routes:

* `/`: Home page.
* `/gnome/:id`: Display a modal with the information of the gnome.

I used some components that help me building the application:

* react-svg-spinner: just a Spinner, nothing cool.
* react-select: a typeahead that can handle multiple selection, which is neat!
* react-modal: Modal for React which internally uses React.Portal!

#### Redux store

So this is where it gets interesting. I decided to use a structure called [ducks structure](https://github.com/erikras/ducks-modular-redux) in Redux, which consist in dividing your store into different files, each file represent a feature and inside of it you will find:

* Actions
* Reducer
* Action Creators
* Selectors
* Middleware

This may sound really overwhelming, but in small application this way of writing Redux is awesome! You don't have 10 files just to perform a request to the backend and store inside your store.

I didn't use any helper to create my Redux entities, except for `reselect` only for performance reasons.

### Server

Using Micro from Zeit, I'm hosting a GrahQL server using Apollo-GraphQL-Server, that will fetch the json and then give me a GraphQL endpoint so I can query it without having any problem!

So by doing this, all the request are going to be managed using Apollo, so we don't have to care of how the request is being performed just what information we need.

This is how Apollo explain how to link `micro` with `apollo-server`, it's pretty standard.

```javascript
const schema = makeExecutableSchema({
  //define inside schema.js
  typeDefs,
  resolvers
});

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

const server = micro(
  cors()(
    router(
      post('/graphql', graphqlHandler),
      get('/graphiql', graphiqlHandler),
      (req, res) => send(res, 404, 'not found')
    )
  )
);

server.listen(3001, () => {
  console.log(`Go to http://localhost:${3001}/graphiql to run queries!`);
});
```

I'm not going to explain all the code inside the server because it's not the focus of this post. Anyway, I'm seriously thinking in writting a post about how to set it up.

#### Project's structure

```
/server
├── index.js // entry of the server
├── server.js // Micro gets up the server and set the urls
├── query.js // All the queries to retrieve data from the endpoint
└── schema.js // type definitions and resolvers
/src // entry of client
├── ducks
│   └── search.js // Duck
├── screens
│   └── Home
│       └── components //components from this screen only
│       └── Container //Connection to redux
│       └── Home //Screen itself
│   └── Gnome // same structure from above
├── shared
│   └── components
│       └── Title.js
│       └── GnomeCard
│   └── constansts
│       └── theme.js
├── apolloClient.js // Apollo configuration
├── index.js // start of the application
├── store.js // Redux configuration
└── setupTests.js // Jest configuration for all the tests
```

---

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
    "react-modal": "^3.3.2",
    "react-select": "^1.2.1",

    // apollo
    "apollo-client": "^2.2.8",
    "react-apollo": "^2.1.3",

    // routing
    "react-router-dom": "^4.2.2",
    "react-router-prop-types": "^1.0.3",

    // redux
    "redux": "^3.7.2",
    "react-redux": "^5.0.7",
    "redux-devtools-extension": "^2.13.2",
    "redux-thunk": "^2.2.0",
    "reselect": "^3.0.1",

    // Server
    "apollo-cache-inmemory": "^1.1.12",
    "apollo-link-http": "^1.5.3",
    "apollo-server-micro": "^1.3.4",
    "fast-memoize": "^2.3.2",
    "graphql": "^0.13.2",
    "graphql-tag": "^2.8.0",
    "graphql-tools": "^2.23.1",
    "micro": "^9.1.4",
    "micro-cors": "^0.1.0",
    "microrouter": "^3.1.1",
    "node-fetch": "^2.1.2",

    // build tools
    "npm-run-all": "^4.1.2"
  }
}
```

## Testing

I choose `jest` as the test-runner and `enzyme` as the testing library which allows to render (shallow/mount) the components. I made Unit for all the components inside `shared` folders and only one integration for the main flow.

I have to say that if I had to do this exercise today I would go for the approach of building integration or end 2 end test due to the confidence they gave me, comparing to the unit test.

## Last Words

This exercise took me A LOT, like 3 weeks (coding mostly on weekends) which was greater than the time they give. Besides that, I really love this exercise due to it allowed me to try Apollo in a real application, here it's what I learned about this experience:

* If you have an endpoint which is not REST at all, building your own graphQL server could be an excellent option.
* Think twice if you have the time to learn a new technlogy when you have a deadline to deliver, you'll easily loose track of what it's important to deliver.
* When working with Apollo there are a lot of things that changed:
  * You usually don't save the response in your store, like you do in Redux.
  * You have to think in testing too, how are you going to mock the `Query` component in order to simulate loading, response, etc.
  * In case you have to build your own server, you'll have to learn important concepts in GraphQL: resolvers, schema, typeDefinitions, etc.

In my opinion, a GraphQL server could boost the productivity of a frontend team, the client is the one which picks the values he wants, he knows what are the values available to query and most important you have all the async request already manage by Apollo which is GREAT!
