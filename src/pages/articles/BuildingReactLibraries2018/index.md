---
title: Hello World!
date: "2018-01-27"
layout: post
draft: true
path: "/posts/my-experience-building-a-JS-library-2018/"
category: "Tutorial"
tags:
  - "Building"
  - "Learning"
description: "alksdalskdaklsdl"
---

In the past month, I successfully wrote 2 libraries for any React application and I learned that building an open source library in Javascript is not an easy task at all 😣.

Let's start from the beginning, why I even bother creating a library? As I said I've created 2 libraries, and the motivation was different in each case. But wait! What did I develop?

## [React Hotkey Tooltip](https://github.com/EmaSuriano/react-hotkey-tooltip)

What it does: This is a React component that given a hotkey and function, it will call that function when the hotkey was pressed and also when the user pressed a help hotkey (like ?) it will display a tooltip with the hotkey.

Context: I was working with a coworker on implementing a hotkey system inside the application. The idea was to create something that allows the user to navigate the application without using the keyboard.

Why I decided to create a library: After writing something that works, we decided that this could be easily implemented into another project because it wasn't coupled to anything.

## [Weather Styled Icon](https://github.com/EmaSuriano/weather-styled-icon)

What it does: Weather animated icons built with React. They are configurable by props, powered by [styled-components](https://github.com/styled-components/styled-components) (which is a library that allows writting CSS with Javascript) and animated only with CSS3.

Context: I was doing a forecast application just to have a Redux application, so then I could try doing integration test with [React Cosmos](https://github.com/react-cosmos/react-cosmos). While I was looking for weather Icons, I decided that I could create my own.

Why I decided to create a library: In this case, the idea of creating a library with this wasn't mine, in fact it was a user on Twitter! After tweeting a gif of how the application works, one person asks me for the icons and how he can get them. And that was when I think of creating the library, so huge thanks to that person 🙏

## The process of writing a library

I've never created a library for Javascript (more specifically for React), maybe one or two for C# and C, but Javascript was different the number of frameworks and tools that a person has to know is really large!

Let's summarize each part and divide them in obligatory and optional.

* Repository of code (Obligatory): We have to push our code into something, it could be a public or private repository but saving files locally doesn't work anymore. I used Github.
* Package published in a package manager (Obligatory): As we are creating a library, it has to be published inside a package manager in order to be download by any person. I used npm.
* README (Obligatory): This is the file that every person will read after reaching your library, it has to explain what it does, how to install it, a few examples of uses, etc.
* Test coverage (Obligatory): I marked this as Obligatory because many people refuse to use a library due to its coverage, and I agree with them, I don't want something inside my project that could break and I can't fix it immediately. I reach 100% of coverage in both libraries and used Coveralls to display it on the web.
* Demo Page (Optional): If you write a good README this task could be optional. What I like about Demo pages is that I can play with the library and see how it works in different situations. I wrote a Demo page for react-hoykey-tooltip and use React Storybook for weather-styled-icon.
* Continuos Integration ("Optional"): I marked as Optional because it is not obligatory at all, you can have an excellent library without it, but I can assure you that your life will be easier. Any CI frameworks can run your test, make the build, deploy to your package manager and more! I used Travis CI.
* Semantic Versioning (Optional): For anyone that does not what it means this, is to upgrade version of your package based on your commit messages. This is great to enforce you to write meaningful commits! I used semantic-release.

## How to start?

So as you can see, there are a lot of things to take in consideration to create a library but fortunately there are some tools that will help you setting all!

I highly recommend using [nwb](https://github.com/insin/nwb)! Nwb is a toolkit for quick development with React, Inferno, Preact or vanilla JavaScript. In simple words, it will give a fully functional project to develop our library with the command most used command: start, test and build.

Another great advantage is that it will come with a full Travis CI configuration made! So the only thing that you have to do is just enable Travis to run inside your repository via their page and it will automatically start running the project's setup 💪

Same goes to test coverage online reports, if you check the Travis configuration you will notice that the result of the coverage it's been sent to Coveralls, so the only thing that it's left is to activate in their page and that's all!

The only things that we have to take on are:

* Write the library (source, test and demo page) 😂
* Deploy to a package manager.
* Set up semantic versioning.

### Deploy to a package manager

Depending on the one you've chosen the process could be different, so I will tell you how it's like deploying to npm. It's the easiest process but at some point could be a bit frustrated. The only command that you have to run is `npm publish`, and that's it! Your package will be ready to be installed from any console that runs `npm install my-package-name`.

But in case you re-run the command of `publish`, you will receive a warning saying that the version number can't be the same 😓 So we have to manually change it from the package.json ... This takes less than a minute, but I could become very dense at some point.

### Semantic Versioning

This tool can release you from the stress of changing that number each time of a release! Let's take a look at the description of semantic-release:

> semantic-release automates the whole package release workflow including: determining the next version number, generating the release notes and publishing the package.

This is soooooooooo magic ✨ To sum up, you only have to write commit messages following a specific format and this tool will upgrade for you the version of the package, create a release (similar to a changelog) and publish to a package manager! 🤩

## My experience after all of this

After learning all of this, I can tell you will be spending more time setting up all these tools than writing your library, which can sound a bit boring ... But whenever you want to make a change on it, magically all the pieces will be already connected so your only concern will be coding which is AWESOME!

I can tell you that it's not as hard as it seems, there a lot of things to learn but any of them is difficult. There are a lot of information for any possible problem out there, so in case you are stuck into something I bet you that it happened to someone before!

---

I hope that this post has encouraged you to create your own library! Let’s keep building stuff 👷‍

### Refs:

* [Quick Development with nwb](https://github.com/insin/nwb/blob/master/docs/guides/QuickDevelopment.md#quick-development-with-nwb)
* [How to write an Open Source Javascript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)
