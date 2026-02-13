# Mini Blog List App

<p align="center">
  <img src="/overview.png" alt="Awesome Image" width="600">
</p>

This project is a mini web application built with React, Vite, and Bootstrap. It allows users share and rate blogs.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Vite: A next-generation front-end tool that provides a fast development server and optimized production builds.
- Bootstrap: A popular CSS framework for building responsive and mobile-first websites.

## Features

- Account system
- Rate system
- Responsive design using Bootstrap.

## Lives

- The base user is: admin
- The base password is: password

<p align="center">
  <img src="/overviewLogin.png" alt="Awesome Image" width="600">
</p>

- [Vanilla FrontEnd](https://minibloglistappvanilla.onrender.com "Just with states")

<p align="center">
  <img src="/overview_v.png" alt="Awesome Image" width="600">
</p>

- [  Redux FrontEnd](https://minibloglistapp.onrender.com "Using reduxjs/toolkit")
- [  Query FrontEnd](https://minibloglistappquery.onrender.com "Using the react query lib and some contexts")

## Getting Started

### Prerequisites

- Node.js
- Pnpm or npm
- A mongodb server instance running somewhere accessible

### Fast Setup

- In Unix based
    ```bash
    ./run.sh

- In windows

    ```bash
    run.bat

### Build

1. Clone the repository:
   
   ```bash
   git clone <repository-url>
   cd <repository-name>
2. Build the frontend
- With NPM

   ```bash
   cd <Prefered FrontEnd>
   npm install
   npm run build
- With PNPM

   ```bash
   cd <Prefered FrontEnd>
   pnpm install
   pnpm build
3. Run the BackEnd
- With NPM

   ```bash
   cd <Project Root>
   npm run dev
- With PNPM

   ```bash
   cd <Project Root>
   pnpm run dev
