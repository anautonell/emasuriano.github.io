---
title: GraphQL as your service layer
date: "2018-02-26"
layout: post
draft: false
path: "/posts/graphQL-service-layer/"
category: "Tutorial"
tags:
 - "Building"
 - "GraphQL"
 - "React"
description: ""
---

Nowadays every application is connected to a server. That server could be sending the data using different protocols (HTTP, FTP, HTTPS) and designs (SOAP, REST, something similar to REST :laughing:), and our application has to deal with that so for that we always would like to have a service layer inside our architechture.

![External Layer](./ExternalLayer.jpg)

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px;" href="https://unsplash.com/@redanais?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Anaïs Redant"><span style="display:inline-block;padding:2px 3px;"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white;" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px;">Anaïs Redant</span></a>

Let's see a simple example of them:

```javascript
const myService = await params => {
  const requestParams = adaptParamsForRequest(params);
  const response = fetch(MY_SERVICE_URL, {
    headers: SERVICE_HEADERS,
    method: SERVICE_METHOD,
    body: requestParams,
    ...more
  });

  return parseResponse(response);
}
```

This kind of service layer has some disavantages:

* Perfomance issues because of the adapting and parsing
* The web application has to know the protocol and design the service is following.
* It may happens that in order to get more information, we would need to perform another requests.
* It could happened that we don't need all the information inside the response, the parser would do that job but we shouldn't ask for it in the first if we won't use in the future.

GraphQL could help in all of these points! But first we need to understand what GraphQL is ..

## What is GraphQL?

If we check the oficial documentation, we would find something like this:

> GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

![Too Much](./tooMuch.gif)

Let's calm down and see what they are saying

### GraphQL is a query language for APIs

Let's first know what is a query language?

> Query Language (QL) refers to any computer programming language that requests and retrieves data from database and information systems by sending queries.

Okay so if GraphQL is a language, what are their rules? Due to GraphQL isn't tied to any specific database or storage engine, it has its own type system that’s used to define the schema of an API.

#### Schema

An `Schema` specifies the capabilities of the API and defines how clients can request the data. It is often seen as a contract between the server and client. The syntax for writing schemas is called Schema Definition Language (SDL).

```graphql
type Car {
  patent: String!
  color: String!
}
```

`Car` is an `ObjectType` which defines the structure of a car model in our application using `ScalarTypes`, it should have a patent which is a string and also an color which is a string, both are mandatory.

One thing to remark is that `ObjectType` or `ScalarTypes` don’t expose any functionality to client applications, for that we should define our entry points for our server.

#### Query Type

Queries are used by the client to request the data it needs from the server. Unlike REST APIs where there’s a clearly defined structure of information returned from each endpoint, GraphQL always exposes only one endpoint, allowing the client to decide what data it really needs from a predefined pattern.

Let’s take a look at an example query that a client could send to a server:

```graqphql
{
  allCars {
    patent
  }
}
```

This would return a list of all cars currently stored inside my server, with the following shape:

```graqphql
{
  "data": {
    "allCars": [
      {
        "patent": "ABC 123"
      },
      {
        "patent": "BQK 893"
      },
      {
        "patent": "POI 098"
      }
    ]
  }
}
```

In GraphQL, each field can have zero or more arguments if that’s specified in the schema, by doing this we are able to query the amount of fields returned and also select the fields we want!

```graqphql
{
  allCars(last: 2) {
    patent
  }
}
```

#### Mutation Type

The majority of applications also need some way of making changes to the data that’s currently stored in the backend. In GraphQL, these changes receive the name of `mutations` and they can be used for:

* Create new data
* Update existing data
* Delete existing data

The syntax for mutations look almost the same as queries, but they must start with the mutation keyword.

```graqphql
mutation {
  createCar(patent: “QWE 112”, color: “red”) {
    patent
    color
  }
}
```

#### Subscription Type

In case you want to establish a realtime connection to the server in order to get notified after important events, GraphQL offers the concept of Subscriptions. When a client subcribes to an event, it will establish an steady connection with the server, and whenever a particular event happens, the server pushes the corresponding data to the client.

They are written using the same syntax as queries, but stating with the subscription keyword.

```graphql
subscription {
  newCar {
    patent
  }
}
```

When a new mutation is performed that creates a new `Car`, the server will send the information directly to the subcribed clients.

```graphql
 "newCar": {
    "patent": "IUY 784",
  }
```

### GraphQL is a runtime for fulfilling those queries with your existing data

GraphQL itself does not provide any information or data, it will receive the query/mutation from the client and `resolve` it by communication with its entities.

GraphQL is able to communicate with lots of different kind of entities, they could be a SQL or NoSQL databases, REST APIs, 3rd-party APIs, legacy systems or even other GraphQL APIs. If we combine a local database with 2 external services we could endup with the following architechture.

![GraphQL Architechture](./servicesArchitechture.png)

But how do we retrieve information from those services if all of them could be different? It wasn't an accident to use the word resolve in the above sentence :P Let me introduce Resolvers!

#### Resolvers

As we know, a query/mutation/subscription consists of a set of fields. In the GraphQL server implementation, each of these fields actually corresponds to exactly one function that’s called a `resolver`. The sole purpose of a `resolver` function is to fetch the data for its field.

Once all resolvers returned, the server will gather all the data in the format that was described by the query and sent it back to the client.

![GraphQL reducer](./reducer.png)

As each field has it owns reducer, we can easily combined the response of different services.

```javascript
const CarResolver = {
  patent: async ({ id }) => {
    const patent = await getPatentFromDb(id);
    return patent;
  },
  owner: async ({ id }) => {
    const owner = await fetch(getOwnerInformatioById(id));
    return owner;
  }
};
```

## GraphQL is not a framework

I already exaplained what GraphQL is, and in any time I mentioned anything about framework or library. So let's see how we can implement GraphQL!

Depending on the server you want to run GraphQL, you will have to install a dependency for your specific. For Example, if you're runnning an `express` backend, then you have to install `express-graphql`. Same goes for `happy`, `koa`, etc.

One important thing to clarify, there is a really big company which is betting a lot in GraphQL technologies called Apollo. They have built an incredible amount of helpful libraries to get up and running your own GraphQL server and also connected to your client. Please check them out!

## Uses Cases

So this is great, this sounds like an excellent framework so why does everyone is building GraphQL server?

The simple question is because maybe we don't need it in most cases, and maybe using REST is enough to build a good software quality. I like to think that GraphQL is a MUST in these cases:

* Connection with multiple services: it'll work as a facade, it will coopeate between the different services without any problem.
* Wrap a response from a server: it could be times when you have to communicate with an endpoint, and the response of it is not correctly formatted.
* Different client platform: this when SDL delights me, when you are working on different platform it's very common to display different information, so just by specifying them inside the query will be enough.

I'm sure that must be more cases, these are the most important in my opinion so in order to not let the list longer I just chose only these.

## My experience

It won't be a full article if I didn't write my experience using it! Considering the uses cases described above, I was in the 2nd case: I need to build an application that will fetch for gnomes, display them inside a list and when clicking view the information of one them.

I named this project [brastlewark-finder](https://github.com/EmaSuriano/brastlewark-finder). I will explained the whole process of adding GraphQL to a project from scratch.

![brastlewark-finder](./brastlewark-finder.gif)

### Context

Let's take a look at the endpoint they gave me. It returns a list of 1336 items with the following structure.

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

The first thing I noticed was I didn't have a way to get the information of a friend without filtering by name the whole array from the response. A possible implementation using old style `fetch` could be:

```javascript
const getGnomes = () => fetch('gnomeURL'); //will return the whole list of gnomes

const getGnomeById = (id, loadFriends = true) => {
  const gnome = getGnomes().then(gnomes => {
    const result = gnomes.filter(gnome => gnome.id === id);
    if (loadFriends) {
      const friendsId = gnomes
        .filter(({ name }) => result.friends.includes(name))
        .map(gnome => gnome.id);
      result.friends = Promise.all(
        friendsId.map(id => getGnomeById(id, false))
      );
    }
    return result;
  });
};
```

As you can see, this will lead to serious performance issues and a really bad UX. There may be some improvement it can be made, but I saw that this was the perfect match for GraphQL. Look the same result, but in this case using a Query from GraphQL!

```javascript
export const GET_GNOME_BY_ID = gql`
  query getGnomeById($id: ID!) {
    gnome(id: $id) {
      name
      thumbnail
      age
      weight
      height
      hair_color
      professions
      friends {
        id
        name
        thumbnail
        professions
      }
    }
  }
`;
```

![Magic](./magic.gif)

### Implementation

As I explained before, you have to decide which implementation of GraphQL you'll use to get up and running your server. I decided to use [Micro](https://github.com/zeit/micro) by Zeit and [Apollo server](https://github.com/apollographql/apollo-server) because of the very well explained examples.

#### Server definition

The entry of our server is the instantiation of Micro and adding the routes for our GraphQL server. This is mainly what you'll find inside the Apollo's examples.

```javascript
import { microGraphiql, microGraphql } from 'apollo-server-micro';
import cors from 'micro-cors';
import micro, { send } from 'micro';
import { get, post, router } from 'microrouter';
import schema from './schema';

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

const corsUpdater = cors();

const server = micro(
  corsUpdater(
    router(
      get('/graphql', graphqlHandler),
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

#### GraphQL Schema

As we saw the schema is where we defined the structure for our GraphQL server. When we called `makeExecutableSchema` we should send all the Type Definitions (QueryType, ObjectType, MutationType, etc.) of our server and also them respective resolvers.

Inside `typeDefs` I define:

* Gnome: This is the ObjectType to represent the Gnome entity inside the server, it stores all the relevant information for a gnome and will be the object sent to the client.
* Queries:
  * allGNomes: recieves the critiera for filtering the gnomes (name and an array of professions) and will return an array of Gnomes.
  * gnome: receives an id (Mandatory field) and returns one Gnome with that Id.

In this case I'm defining two Queries one for retrieving all the Gnomes and another for get only one by Id. Both of them returns an ObjectType called `Gnome`.

Each the fields inside the `Gnome` ObjectType are resolved automatically when the key of the object returned by the service matched, except for friends! If you take a loook inside the resolver, you'll see that Gnome redefined the function of getting a Gnome friends, this is super useful because we can modified the data that comes from the server in a really easy way.

```javascript
import { makeExecutableSchema } from 'graphql-tools';
import { getGnomes, getGnomeById } from './query';

const typeDefs = `
  type Query { allGnomes(name: String, professions: [String]): [Gnome], gnome(id: ID!): Gnome }
  type Gnome {
    id: ID!,
    name: String,
    thumbnail: String,
    age: Int,
    weight: Float,
    height: Float,
    hair_color: String,
    professions: [String],
    friends: [Gnome],
    createdAt: Int,
  }
`;

const resolvers = {
  Query: { allGnomes: getGnomes, gnome: getGnomeById },
  Gnome: {
    friends: async ({ friends }) => {
      const gnomes = await getGnomes();
      return gnomes.filter(({ name }) => friends.includes(name));
    }
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers
});
```

#### Query

This is where we get the data from our API non-REST, also apply the logic of filtering by name and/or professions. I'm using memoize just to avoid fetching more than one time the same resource, due to it will always return the same data ...

```javascript
import fetch from 'node-fetch';
import memoize from 'fast-memoize';
import BASE_URL from './constants';

const fetchGnomes = memoize(async () => {
  const rawData = await fetch(BASE_URL);
  const jsonData = await rawData.json();
  return jsonData.Brastlewark;
});

const getGnomes = async (_, args) => {
  const gnomes = await fetchGnomes();
  if (!args) return gnomes;

  const { name = '', professions = [] } = args;
  return gnomes.filter(
    gnome =>
      (!name || new RegExp(name, 'i').test(gnome.name)) &&
      (!professions.length ||
        professions.every(prof => gnome.professions.includes(prof)))
  );
};

const getGnomeById = async (_, { id }) => {
  const gnomes = await fetchGnomes();
  return gnomes.find(gnome => gnome.id == id);
};

export { getGnomes, getGnomeById };
```

## Related links

* https://blog.graph.cool/graphql-server-basics-the-schema-ac5e2950214e
* https://blog.graph.cool/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
* https://blog.graph.cool/top-5-reasons-to-use-graphql-b60cfa683511
* https://dev-blog.apollodata.com/the-concepts-of-graphql-bc68bd819be3
