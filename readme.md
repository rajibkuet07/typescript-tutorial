# TypeScript Tutorial For Beginners

![TypeScript](./typescript.png)

_[TypeScript](https://www.typescriptlang.org/) or TS is a strongly typed programming language build up on JavaScript that adds new features and make JS code easier and powerful._

This GitHub repository contains all the basics of TS for the absolute beginners. Here you will find all the codes of basic TS with explanation.

## Prerequisite

To get started with this basics course of TS, you should have the following tools and knowledge:

- You should have TypeScript installed on you machine/system. You can download & install it from [here](https://www.typescriptlang.org/download).
- NodeJS should be installed in your machine to use `npm` command. You can download and install it from [here](https://nodejs.org/en/).
- You should have some basic knowledge about JavaScript, HTML, CSS and Console.
- A modern code Editor like [VSCode](https://code.visualstudio.com/) or any other you prefer.

## Installation & Setup

- Run `npm install` to install the required packages for this tutorial.

## Some Necessary Commands

- `tsc <filename.ts>` - to compile a TS file.
- `tsc <filename.ts> --watch` - for watch mode which will re-compile the file if changes occur. Shorthand `tsc <filename.ts> -w`.

## Initialize a Project as TS Project

- `tsc --init` will create a _tsconfig.json_ file in the directory and all files in the folder/sub-folders will be managed by TS. In this file you will get all the default configurations for TS. You can change it as your need.
- In the config file you can use other options too like - `exclude`, `include`, `files` etc.
- The _lib_ option is depends on the _target_ option. If the lib option are not set then the default for the target option is assumed/used. ES6 default options are - _dom, es6, dom.iterable, scripthost_
  **More details on _[tsc CLI Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)_**
  **ALL the files for this project are located in the `src` folder.**

### Now you can use the following commands too

- `tsc` - to compile all the TS files in the directory.
- `tsc --watch` | `tsc -w` - to re-compile all the files if changes occur.

### Happy Coding!
