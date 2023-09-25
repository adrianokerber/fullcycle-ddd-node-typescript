# A study about Domain Driven Design (DDD)
A study of DDD applied on FullCycle course using Node.js with TypeScript. Also using Jest as the test framework.

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
# In order to get coverage full report use the following command. Note: The coverage will be saved on the folder with the same name
npm test --coverage
```
> Important: We had to change our scripts section on `package.json` to add the TypeScript check before the Jest execution to ensure that our code is always OK before running the test cases. Further explaining: Since Jest is being run on the JavaScript runtime, syntactic errors of TypeScript will be ignored unless we added that pre-check on the test script command definition.

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

```bash
# Install UUID for Guids
npm i uuid @types/uuid
```

```bash
# Install Sequelize - an ORM framework
npm install sequelize reflect-metadata sequelize-typescript
```

```bash
# Install the database SQLite 3 package
 npm install sqlite3
```