export const md = `
# How does useState hook works behind the scenes?

Behind the scenes, the useState hook works by leveraging two important features of js: closures and the fact that function components are re-evaluated on each render.

When a function component is executed, React creates a new instance of the component and evaluates its body to produce the UI. If the component uses the useState hook, React also creates a new state object for that component and initializes it with the initial state value provided by the component.

React also returns an array with two elements: the current state value and a function that can be used to update the state. The current state value is stored in a variable that is defined inside the closure of the component function, so it can be accessed by the component's render function and any other functions defined inside the component.

When the component is rendered for the first time, the current state value is set to the initial state value. If the component re-renders due to a change in props or state, React evaluates the component function again to produce the new UI. However, this time, React re-uses the same state object and updates its value based on the updates requested by the setState function.

When the setState function is called, React schedules a re-render of the component and updates the state object with the new state value. The next time the component is evaluated, React uses the updated state value to produce the new UI.

Overall, the useState hook works by creating a state object for each component and managing its value across multiple renders. The hook also provides a convenient API for updating the state value and triggering a re-render of the component.


# Why useState does not work immediately after calling it, for example, in function scope when I call setState and console.log the state immediately after the setState call, I still see the previous state

When you call useState to define a state variable, React sets the initial state and returns an array with two elements: the current state value and a function to update the state value. The initial state value is available immediately, but when you update the state using the update function, the new state value is not immediately available.

This is because React batches state updates for performance reasons. When you call the state update function, React puts the update request in a queue and batches the updates together to avoid unnecessary re-renders. This means that if you call setState multiple times in a row, React will only perform a single re-render after all of the updates have been processed.

As a result, if you try to log the updated state value immediately after calling setState, you may still see the previous state value. This is because the state update has not been processed yet and the new state value is not available until after the re-render has occurred.


# What is the difference between using the setState function with the callback function and without a callback function

In React, you can use the setState function to update the state of a component. There are two ways to use setState: with a callback function and without a callback function.

When you use setState without a callback function, React will immediately update the state and re-render the component:

~~~scss
// Update state directly without callback
setState(newState);
~~~
When you use setState with a callback function, React will call the callback function after the state has been updated and the component has been re-rendered:

~~~scss
// Update state with callback
setState(newState, callback);
~~~
The callback function can be used to perform additional logic after the state has been updated, such as making an API call or updating a global state store.

One key difference between using setState with and without a callback function is that when you use a callback function, React guarantees that the state update is complete and the component has been re-rendered before the callback function is called. This is important if the callback function relies on the new state value or needs to interact with the updated DOM.

Here's an example to illustrate the difference:

~~~js
function ExampleComponent() {
  const [count, setCount] = useState(0);

  // Update state directly without callback
  const handleClick1 = () => {
    setCount(count + 1);
    console.log('Count:', count); // Output: Count: 0
  };

  // Update state with callback
  const handleClick2 = () => {
    setCount(count + 1, () => {
      console.log('Count:', count); // Output: Count: 1
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick1}>Increment (no callback)</button>
      <button onClick={handleClick2}>Increment (with callback)</button>
    </div>
  );
}
~~~
In this example, we have two buttons that increment the count state value. The first button uses setCount without a callback function, and the second button uses setCount with a callback function that logs the current count value.

When we click the first button, we see that the count value is logged as 0, even though we expect it to be 1. This is because React has not yet updated the count value or re-rendered the component when we log the count value.

When we click the second button, we see that the count value is logged as 1, as expected. This is because the callback function is only called after the state has been updated and the component has been re-rendered, so we can rely on the new state value and the updated DOM

# What happens if I use callback function as the first parameter to a useState hook

If you pass a function as the first parameter to the useState hook, React will use that function to calculate the initial state value. This is useful if you need to derive the initial state value from some props or other variables that may change over time.

However, if you pass a callback function as the first parameter to useState, you may run into issues. The callback function will only be called once, when the component is first rendered. After that, the initial state value will be set, and the callback function will never be called again. This means that any changes to the state variable will not be reflected in the initial state value, and any logic in the callback function that relies on the initial state value will not behave as expected.

Here's an example to illustrate the issue:

~~~js
function ExampleComponent(props) {
  const [count, setCount] = useState(() => {
    console.log('Calculating initial state');
    return props.initialCount;
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
~~~
In this example, we're using the useState hook to declare a count state variable, and we're passing a callback function to calculate the initial state value based on a prop called initialCount.

However, if we click the increment button, we'll see that the count value is not increasing as expected. This is because the handleClick function is using the count variable, which is not being updated correctly due to the issue with the initial state value and the callback function.

To fix this issue, we can use the props.initialCount value directly as the initial state value, without using a callback function:

~~~js
function ExampleComponent(props) {
  const [count, setCount] = useState(props.initialCount);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
~~~
In this updated example, we're using the props.initialCount value directly as the initial state value, so there's no need for a callback function. Now, if we click the increment button, the count value will increase as expected.


# Will the given example result in with count = 2 or count = 1 after the re-render? Why ?
Example:
~~~js
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Increment the count by 1
    setCount(count + 1);

    // Mutate the count value
    count += 1;
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
~~~
Here's what will happen in the example:

* Initially, the count value is 0.
* When the button is clicked, setCount is called with count + 1, which sets the count value to 1 and triggers a re-render.
* After the re-render, the updated count value of 1 is displayed in the UI.
* The subsequent mutation of count variable does not affect the displayed value since it's outside of the React lifecycle and won't trigger a re-render.

So, the final value of count after the re-render will be 1, not 2.


`;