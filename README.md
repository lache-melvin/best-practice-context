# Best Practice

> All of the best programming practice exercises

This repository intends to serve two purposes: (1) as a web application that gives its users the ability to learn about and co-create a filter for high quality learning content on the internet, and (2) as a model fullstack application Enspiral Dev Academy intends to use as a standard for the naming, structure and application shape for the EDA challenges and group projects.

## Setup

To get this repo working on your computer, after cloning this repo

```sh
cd best-practice
cp .env.example .env
npm install
npm run db:migrate
npm run db:seed
npm test
npm run dev
```

The server should be listening at [http://localhost:3000](http://localhost:3000).
