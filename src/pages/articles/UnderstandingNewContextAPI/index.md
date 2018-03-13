---
title: Understanding new Context API
date: "2018-03-12"
layout: post
draft: true
path: "/posts/understanding-new-context-api/"
category: "Tutorial"
tags:
  - "Building"
  - "Learning"
description: "I've playing a lot with the new Context API, comparing it with the old one and also re-write an old component of mine. You will learn the advantages of using it and why you should take a look ASAP!"
---

If you were following all the React trends in the last month, you would know that some API's have received a redesign: Context, refs, etc.

In this opportunity, I'm going to tell you my experience of re-writing a Component using this new Context API!

![Connection](./connection.jpg)

## But first, What the heck is Context?

Context is another way of sharing information between parent and children (like props). You could say that props is `explicit` communication, while Context is `implicit` Communication.

When an application starts to grow, you will end up having more components that also start to share more information between them. When this happened is common to start seeing the DrillingProps problem, which is a component passing down lots of props just to give access to component below of it.

This is when Context helps us! By removing those props chain between component, we endup with a more readeable and understandable code.

### Diagram Communication

```
Via props

<ParentComponent>   props: { foo: 'bar'}  ↓
  <IntermediateComponent>   props: { foo: 'bar'}  ↓
    <OtherIntermediateComponent>    props: { foo: 'bar'}  ↓
      <ChildComponent>    props: { foo: 'bar'}

Via Context

<ParentComponent>   context: { foo: 'bar'}
  <IntermediateComponent>
    <OtherIntermediateComponent>
      <ChildComponent>    props: { foo: 'bar'}
```

So what has changed?
Mainly the way we define context to our children.

Comparison of code before and after

Let's build something!
One of the most annoying component to build inside React is a Radio Group. Why? Because we have to always check if the value that is currently selected matches with the value of each radio button, leaving our code with lots of validation in lots of screens. A possible implementation of what I'm saying could be like this:

Problems that I see:
There are a lot of repetitive code inside: onChange, selected value, etc.
RadioGroup: it's a container that does not anything useful at all.

That's a lot of code for just 3 radio button, right? So we're going to write a new cool component that given a selectedValue to our radioGroup will choose for us which is selected!

Yes, only one night. In fact, it took me about 3 hours. So if you want to have your own, I highly recommend you to continue reading!

I'm sooo far away from building this website from scratch in one night. What I did was something different, I like to call it _'personalized'_. In software development, there is a quote that I love:

> 'You don't have to reinvent the wheel'

If there is anything that you want to build, first start by looking up someone on the Internet who has already made it. And that was exactly what I did!

![Wheel](./wheel.jpg)

## Looking for the solution

A few months ago (July 2017), the version 1.0.0 of Gatsby was announced, a Blazing-fast static site generator for React. In my opinion, a static site is the perfect match for a personal page where you just want to display information which doesn't have any complex logic (in case you want to implement something crazy).

So I've just searched for a Gatsby Starter that matches my requirements for my page. I wanted my page to have 3 sections:

* About me: where I can put information of who I am.
* Contact me: where I can write how people how to find me and get it in touch with me.
* Blog: where I can list all my posts on one page with a brief description and after clicking on one, it will be shown on full screen.

So I end up downloading [this starter](https://github.com/alxshelepenok/gatsby-starter-lumen). For me, it's really slick and displays the information in a clear and simple way. Also, it has the possibility to query post by category and tags, which in the first place I didn't ask for it but it was great :clap:

After I downloaded it and opened it in my text editor, I said _"Holly Molly, there are a lot of files here! How am I going to change this in order to display my information?"_ :worried:. I have to admit that I've never worked with Gatsby, I've just heard it in a couple of podcasts and read a few posts. Fortunately, it is not as hard as it seems :sweat_smile:.

## How to Customize your app

There are specific files/folders that you have to look into:

* `Gatsby-config.js`: it is divided into two sections:

  * siteMetadata: as the name implies this is where you will find the information of the site (like your name, photo, links, etc.). Changing those values will have an immediate impact because they are being used along the whole application.
  * plugins: all the Gatsby plugins that will be run when the application starts. You might not have to change any of them, but we'll talk about it later.

* `/templates`: inside templates folder, you will find all the pages of your application, so if you want to change any of them (e.g. remove one component in a specific application) this is the place! As Gatsby is a static generator page, generally components are simple (in most cases they are stateless) so changing them is pretty easy task.

* `/pages`: This is the most important folder of your application, this is where you can create content for your page. Inside, you'll find Markdown files, images and any other resources for your pages. All the markdown files will be magically transformed into HTML by Gatsby, so you focus only on writing content and not getting distracted by other things. A markdown file has this structure:

```Markdown
---
title: My Post Title
date: "2018-01-27"
layout: post # Which template is going to use
draft: false # If you want to hide it in our page
path: "/posts/my-custom-url/"
category: "My Category"
tags:
  - "Tag 1"
  - "Tag 2"
description: "Post Description"
---

CONTENT OF THE POST
```

## How does Gatsby work?

After seeing what is it important for creating our app, there is a big question left: How does Gatsby take all the configuration, template and markdown and transform into HTML? Inside Gatsby official page you'll find this image.

![Gatsby flow](./gatsby.jpg)

I'm going to explain what happens inside that Gatsby box:

1. After running the command of `gatsby develop`, Gatsby will read the gatsby-config.js and gatsby-node file. What happens here depends on what you have in those files, in the starter that I selected it will start the plugins, read the markdown file link it with the template and assign to a route and start the GraphQL server.

2. When you hit a link it reads the value from the router that it has defined inside the config file and return the template of it.

3. Inside any template you can specify a pageQuery, this will enable us to get information from our GraphQL database (or any dataSource that e (Think that query as a select in SQL, where you select the field from our database that you really want).

I have summarized the process of conversion inside Gatsby, please visit their documentation (gatsby documentation link), it's very well explained and structured!

## What are plugins?

> Plugins help accelerate developing websites as you can build on what others have done and help collaborate with others on basic building blocks.
>
> -- <cite>Kyle Mathews</cite>

Plugins can:

* add support for webpack loaders such as Sass, Less
* add a sitemap or RSS feed
* add Google Analytics
* …and so much more!

**Please do not stay with the plugins that the starter has**. Gatsby's community has created a lot of them and the majority of them are awesome and easy to implement. [Here](https://www.gatsbyjs.org/docs/plugins/) is the official list of plugins.

I hope that this post has encouraged you to create your own page! Let's keep building stuff :construction_worker:

Refs:

* [gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen)
* [Gatsby Documentation](https://www.gatsbyjs.org/docs/)
* [Announcing Gatsby 1.0.0](https://www.gatsbyjs.org/blog/gatsby-v1/)
