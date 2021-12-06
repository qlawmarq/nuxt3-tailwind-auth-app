# nuxt3-fastapi-mysql

## Front-end

Based on:
- Nuxt3 (Vue3)
- Tailwind CSS

For more infos, please look at the [Nuxt3](https://v3.nuxtjs.org) and [Tailwind CSS](https://tailwindcss.com).

Validation Library:
- VeeValidate
- yup
- zxcvbn

Recommended Editors:
- [VSCode](https://code.visualstudio.com/)

Recommended Pligins:
- [Volor](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### Setup

Need to install `Node.js >= 14` first.
Make sure to install the dependencies.

```bash
cd front-end
npm i
```

### Development

Start the development server on http://localhost:3000.
Start the Tailwind config viewer on http://localhost:4000.

```bash
npm run dev
```

#### Trouble shooting

```bash
nuxi: command not found
```

If you found this, please try to install nuxt3 again.

```bash
npm i nuxt3
```

### Production

Build the application for production:

```bash
npm run build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).



## API Server & DB Server

Based on:
- FastAPI
- MySQL

Use JWT for authentication

### Setup

Please install `Docker` and `Docker compose` first.

```bash
docker-compose build
docker-compose up
```
Start the API server on http://localhost:8000.
Also, you can check API document on http://localhost:8000/redoc.
