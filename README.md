# Best Practice

> All of the best programming practice exercises

This repository sets out to serve two distinct purposes with separate goals.

1. It's a web application that gives its users the ability to learn about and co-create a filter for high quality learning content on the internet. This purpose will serve _learners_ and we'll refer to this aspect as **The Best Practice App**.

2. It's a model fullstack application Enspiral Dev Academy can use as a standard for the naming, structure and application shape for the EDA challenges and group projects. This purpose will serve EDA _teachers_ and we'll refer to this aspect as **The Best Practice Model**.


## Setup

To get this repo working on your computer, after cloning this repo

```sh
cd best-practice
cp server/.env.example server/.env
npm install
npm run db:migrate
npm run db:seed
npm test
npm run dev
```

The server should be listening at [http://localhost:3000](http://localhost:3000).


## The Best Practice Model

### Intentional decisions

* Explicit partitioning into `client` and `server`
