---
title: Understanding the new Context API
date: "2018-03-12"
layout: post
draft: false
path: "/posts/understanding-the-new-context-api/"
category: "New Concepts"
tags:
  - "Building"
  - "Learning"
description: "I've playing a lot with the new Context API, comparing it with the old one and also rewriting an old component of mine. You will learn the advantages of using it and why you should take a look ASAP!"
---

If you were following all the React trends in the last month, you should know that some API's have received a redesign: Context, refs, etc.

In this opportunity, I'm going to tell you my experience of rewriting a Component using this new Context API!

![Connection](./connection.jpg)

## But first ... What the f\*\*k is Context? :thinking:

Context is another way of sharing information between parents and children (like props). Where you have a top component (Father) that define an object with information (Context) so any component inside (Children) of him can access to that. You could say that using props is `explicit` communication, while Context is `implicit` Communication.

When an application starts to grow, you will end up having more components that also start to share more information between them. When this happened is common to start seeing the `Prop Drilling` problem, which consist on components passing down lots of props just to give access to component below of it :slightly_frowning_face:

This is when Context helps us! By removing those props chain between component, we end up with a more readable and understandable code :thumbsup:

### Communication Diagram

#### Via props

```javascript
<ParentComponent>   props: {  value: 1 }  ↓
  <IntermediateComponent>   props: {  value: 1 }  ↓
    <OtherIntermediateComponent>    props: {  value: 1 }  ↓
      <ChildComponent>    props: {  value: 1 }
```

#### Via Context

```javascript
<ParentComponent>   context: {  value: 1 }
  <IntermediateComponent>
    <OtherIntermediateComponent>
      <ChildComponent>    props: {  value: 1 }
```

## Why did React rewrite Context?

The main flaw with context today is how it interacts with `shouldComponentUpdate` :fearful:

* **`shouldComponentUpdate` blocks context changes**: context changes will not propagate through a component whose `shouldComponentUpdate` return false. `shouldComponentUpdate` is a fairly common optimization in React applications.
* **Shifts complexity to user space**: developers circumvent the `shouldComponentUpdate` problem using subscriptions which are largely used in Open Source libraries like Redux and React Broadcast. The problem is that the ownership and responsibility for a core feature (Context) has been shifted from the framework to its users.

<div class="gatsby-highlight">
<iframe src="https://codesandbox.io/embed/845on7vqx9" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</div>

## What does this new API offer?

React developer team has re-design from scratch the way we declare a context inside a Component and introduce new concepts that previously were not present inside the framework :fire:

Let's see a comparison between the new version and the old one.

### Old version :older_man:

```javascript
import React, { Component } from 'react';
import { number } from 'prop-types';

class Parent extends Component {
  static childContextTypes = {
    value: string
  };

  getChildContext() {
    return { value: 1 };
  }

  render() {
    return <Child />;
  }
}

class Child extends Component {
  static contextTypes = {
    value: number
  };

  render() {
    const { value } = this.context;
    return <p>The value from Context is: {value}</p>;
  }
}
```

### New version :man:

```javascript
import React, { createContext } from 'react';
import { number } from 'prop-types';

const { Provider, Consumer } = createContext('contextExample')

const Parent = () => (
  <Provider value={ value: 1}>
    <Child />
  </Provider>
)

const Child = () => (
  <Consumer>
    ({value}) => <p>The value from Context is: {value}</p>
  </Consumer>
)
```

#### List of changes:

* Remove the need of using `getChildContext` to set values inside a context.
* Remove `contextType` and `childContextTypes` static definition in parent and children (which in my opinion was the worst).
* Add a new method `React.createContext` which create a new instance of a Context and return an object with a `Provider` and a `Consumer`.
* The `Provider` component allows you to define values inside the Context created.
* The `Consumer` component uses `renderProp` pattern inside its children, inside that function we'll have access to all the information inside the context created.

## Let's build something! :construction_worker:

In 2017 I wrote a RadioGroup component with the old Context, so my goal is to rewrite it using the new one! :muscle:

[Here](https://github.com/EmaSuriano/react-radio-group-context) it's the repository in case you want to skip all the explanation and go straight forward to the codebase.

I choose a RadioGroup because is one of those component that are very annoying component to build in React. If you want to know why, just check this portion of code which objective is to render a set of radio button that are controlled.

```javascript
import React, { Component } from 'react';

class Example extends Component {
  state = {
    selectedFruit: 'apple'
  };

  onChangeFruit = ({ target: { value } }) =>
    this.setState({ selectedFruit: value });

  render() {
    return (
      <div>
        <input
          type="fruits"
          value="apple"
          id="apple"
          onChange={this.onChangeFruit}
          checked={this.state.selectedFruit === 'apple'}
        />
        <label for="apple">Apple</label>
        <br />
        <input
          type="fruits"
          value="grapes"
          id="grapes"
          onChange={this.onChangeFruit}
          checked={this.state.selectedFruit === 'grapes'}
        />
        <label for="apple">Grapes</label>
        <br />
        <input
          type="fruits"
          value="orange"
          id="orange"
          onChange={this.onChangeFruit}
          checked={this.state.selectedFruit === 'orange'}
        />
        <label for="apple">Orange</label>
        <br />
      </div>
    );
  }
}
```

<div class="gatsby-highlight">
<iframe src="https://codesandbox.io/embed/py4m4jjyr7" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</div>

![Horrible](./horrible.gif)

That's a lot of code just to manage 3 radio buttons! Let's see how you can accomplish the same with the abstraction of the `RadioGroup` built with context.

```javascript
import React, { Component } from 'react';
import { RadioButton, RadioGroup } from 'react-radio-group-context';

class Example extends Component {
  state = {
    selectedFruit: 'apple'
  };

  onChangeFruit = ({ target: { value } }) =>
    this.setState({ selectedFruit: value });

  render() {
    return (
      <RadioGroup
        name="fruits"
        selected={this.state.selectedFruit}
        onChange={this.onChangeFruit}
      >
        <RadioButton id="apple">Apple</RadioButton> <br />
        <RadioButton id="grapes">Grapes</RadioButton> <br />
        <RadioButton id="orange">Orange</RadioButton> <br />
      </RadioGroup>
    );
  }
}
```

<div class="gatsby-highlight">
<iframe src="https://codesandbox.io/embed/ojz83pjz2z" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</div>

That looks sooo much better right? :sparkles: Lets see what is happening.

As you can see I have created a new component called `RadioGroup` which received all the shared properties along the `RadioButton`.

Then those properties are magically passed to every `RadioButton` which can determine if they are selected or not by themself. So, how are we going to do that? And the answer is Context :smile:

In order to create a new context just call to `React.createContext` and pass a name for the context.

```javascript
import React from 'react';

const { Provider, Consumer } = React.createContext('radioGroup');
```

Lets see how to write `RadioGroup` and `RadioButton`.

### RadioGroup

This component is in charge of distributing the information to all the `RadioButton` and nothing more, it doesn't have to render anything in particular.

This component have to store inside its context:

* Name of the group for the radio buttons,
* The callback `onChange`.
* The selected radio.
* If the group is disabled

```javascript
const RadioGroup = ({ selected, onChange, name, disabled, children }) => (
  <Provider
    value={{
      selected,
      onChange,
      name,
      disabledGroup: disabled
    }}
  >
    {children}
  </Provider>
);
```

### RadioButton

This component has to read from the context defined by the `RadioGroup` and make some validations:

* If the selected radio is equal to the `id`, then `checked` has to be `true`.
* If the `disabled` or `disabledGroup` were true, then `disabled` has to be `true`.
* In case `value` was not being sent, then `value` should be equal to `id`.

```javascript
const RadioButton = ({ id, value, disabled, children }) => (
  <Consumer>
    {({ selected, onChange, disabledGroup, name }) => (
      <Fragment>
        <input
          type="radio"
          checked={selected === id}
          disabled={disabled || disabledGroup}
          id={id}
          value={value || id}
          name={name}
          onChange={onChange}
        />
        <label for={id}>{children}</label>
      </Fragment>
    )}
  </Consumer>
);
```

Merging all, we end up with this powerful library! :atom_symbol: ⚛

```javascript
import React, { Fragment } from 'react';

const { Provider, Consumer } = React.createContext('radioGroup');

const RadioGroup = ({ selected, onChange, name, disabled, children }) => (
  <Provider
    value={{
      selected,
      onChange,
      name,
      disabledGroup: disabled
    }}
  >
    {children}
  </Provider>
);

const RadioButton = ({ id, value, disabled, children }) => (
  <Consumer>
    {({ selected, onChange, disabledGroup, name }) => (
      <Fragment>
        <input
          type="radio"
          checked={selected === id}
          disabled={disabled || disabledGroup}
          id={id}
          value={value || id}
          name={name}
          onChange={onChange}
        />
        <label for={id}>{children}</label>
      </Fragment>
    )}
  </Consumer>
);

export { RadioGroup, RadioButton };
```

---

I really like this new API, and I think it will be game changing in React. I invite all of you to build your own components using this awesome API, it's really powerful :fire:

Let’s keep building stuff together :construction_worker:

### Refs:

* [Context - React Documentation](https://reactjs.org/docs/context.html)
* [New version of Context - Pull Request](https://github.com/reactjs/rfcs/pull/2)
* [React new Context API - Blog](https://medium.com/dailyjs/reacts-%EF%B8%8F-new-context-api-70c9fe01596b)
* [Context in ReactJS Applications - Blog](https://javascriptplayground.com/context-in-reactjs-applications/)
* [Radio Group Repository](https://github.com/EmaSuriano/react-radio-group-context)
