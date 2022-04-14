# vue-template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test
```

### Lints and fixes files

Setup your IDE to automatically run that on save. Works in VS Code and IntelliJ.

```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Unit Tests

### How To Run Tests
```
npm run test
```

### What to Test?
The output of a component on a specific input:

That is called "Contract".

#### Inputs:
* Props
* Slots
* Vuex 
* Event triggers

#### Outputs:
* Triggered Events ($emit)
* External Method Calls (E.g. VueX Store Dispatches)
* Rendered View Elements (DOM)
* Vuex Store Value

### What NOT to Test?
Internal logic, components w/o logic

Bad Examples:
--> NOT: is a variable set correctly?
--> NOT: Search for a child component (e.g. login button), click it and check if navigation in the parent is rendered...
    --> Better: Check if store value is updated on click and check if UI is correct based on store value 

### When to write tests?

Before start coding the actual Vue component.
