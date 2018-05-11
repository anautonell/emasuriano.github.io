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

Nowadays every application is connected to a server. That server could be sending the data using different protocols (HTTP, FTP, HTTPS) and designs (SOAP, REST, something similar to REST :laughing:), our application has to deal with that so for that we always would like to have a service layer inside our architechture.

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

![What did you said](./what.gif)

Let's calm down and see what they are saying

### GraphQL is a query language for APIs

> Query Language (QL) refers to any computer programming language that requests and retrieves data from database and information systems by sending queries.

Talk about the syntax of GraphQL The Schema Definition Language (SDL)

https://www.howtographql.com/basics/2-core-concepts/

So we could assume that we can use GraphQL to get and send information to _something_.

### GraphQL is a runtime for fulfilling those queries with your existing data

Talk about connecting with services and databases.

### GraphQL provides a complete and understandable description of the data in your API

Talk about the schemas and types

### GraphQL gives clients the power to ask for exactly what they need and nothing more

Talk about fetching data with Queries

### GraphQL makes it easier to evolve APIs over time

Talk about resolvers

### GraphQL enables powerful developer tools

Talk about graphi

## GraphQL is not a framework

I already exaplained what GraphQL is, and in any time I mentioned anything about framework or library. So let's see how we can implement GraphQL!

GraphQL-js is the official implementation of the stantard, by using it we ca defined the Schema, Type, resolvers, etc.

Explain more of this!!

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
