# A study about Domain Driven Design (DDD)
A study of DDD applied on FullCycle course using Node.js with TypeScript. And Used Jest as the test framework.

> Tip: This Node.js project was created using `npm i typescript --save-dev` command and `npx tsc --init` for a typescript configured project

Our Domain was modeled with these aggregates:
1. Customer Aggregate: The class group responsible for the customer data creation and management;
2. Order Aggregate: The class group responsible for the order creation;
3. Product Aggregate: The product itself;

As follows:
    - Customer => Address
    - Order => OrderItem[]
    - Product

> Tip: All files with the filename suffix ".spec.ts" are tests

## Setup
Install Node.js via [NVM](https://github.com/nvm-sh/nvm).

Run the initial command to install the project dependencies:
```bash
npm install
```

In order to run the tests use:
```bash
# Run tests - NOTE: run this command after each domain change
npm test
```

The following command is responsible for generating the JavaScript files. Run this to ensure that your TypeScript is right, the tests on Jest won't fail if you mess up with the TypeScript syntax.
```bash
# Compile TypeScript to generate .js code
npx tsc
```

> Tip: On Windows system prefer installing Node on WSL2 as in [here](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl).

## Useful commands used on the project
Some useful commands for you to use.

```bash
# Install lint dependency
npm i tslint --save-dev
# Configure the lint dependency
npx tslint --init
```

```bash
# Install Jest framework (For testes) dependency
npm i -D jest @types/jest ts-node --save-dev
```

```bash
# Transpiler to improve performance
npm i -D @swc/jest @swc/cli @swc/core
```

```bash
# Initialize Jest for this project
npx jest --init
```