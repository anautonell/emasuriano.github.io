---
title: The 3 testing layers which every Front-end Dev should know
date: "2018-05-03"
layout: post
draft: true
path: "/posts/the-3-layers-testing/"
category: "New concepts"
tags:
  - "React"
  - "Testing"
description: "For a long time, thinking of writting tests for the UI was a really crazy idea due to its lack of complexity. But in the times we're living a web application is responsible of doing lots of things, for example fetching information from a service, then doing some calculation with it and then display it inside a table."
---

For a long time, thinking of writting tests for the UI was a really crazy idea due to its lack of complexity. But in the times we're living a web application is responsible of doing lots of things, for example fetching information from a service, then doing some calculation with it and then display it inside a table.

All the logic inside a web application can be tested, the tests can be separated into different layers each one has different purpouse and approaches.

![Tree layers](./layers.jpg)

As those applications have more responsability, we need to make sure that they continue working as expected after a change was introduced in the codebase. When dealing And that's why we're here to talk!

## Aplication Structure Overview

As I said, todays application are more than a simple static site with some css just to look nice. Normally they communicate with some kind of service by sending or receiving information and then do something with that.
Also, most of them are built thinking in component, using any popular framework like React, Angular, Vue, etc. so we can achieve to have this schema of communication.

![Web Architecture](./webArchitecture.png)
