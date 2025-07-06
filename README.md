# Duotrigordle Visualizer

[Duotrigordle](https://duotrigordle.com/) is a wonderful little game, but I don't love its current visualization. This SPA let you quickly generate an alternative visualization.

![Preview of the conversion](./preview.png)

The new visualization shows 1 square for each guess you make, right (🟩) or wrong (🟨).

## Local Development

### Prerequiesites

You'll need a recent-ish version of node installed.

### Running the App

You can start up the app right away with this command:

```
$ npx serve@latest -l 3032
```

### Editing TypeScript

The code for generating the new visualization is writen in TypeScript. If you want to make modifications to that TypeScript code you'll need take a few extra steps:

1. `npm install`
1. `npm start`
