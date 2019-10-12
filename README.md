# This Repository is deprecated.
## Please move [here](https://github.com/doong-jo/membership-airbnb)

---

<h1 align="center">Welcome to amazon-carousel 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/doong-jo/membership-amazon#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/doong-jo/membership-amazon/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/doong-jo/membership-amazon/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>


### 🏠 [Homepage](https://github.com/doong-jo/membership-amazon#readme)

## Demo
### [membership-amazon](http://106.10.32.179) 👀

## Install

```sh
npm install && npm run prod
vim env (write your environment)
```

## env
```sh
DB_HOST=?
DB_USER=?
DB_PASSWORD=?
DB_NAME=?
REDIS_SECRET=?
```

## Directory
```bash
server
├─ api       // ...user
├─ models    // ...user
├─ routes    // ...router
├─ services  // ...services (auth, admin ...)
│   ├─ handler
│   └─ middleware
└─ ssr-admin // html, css, js

public
├─ img         
├─ js
│   ├─ components
│   │   ├─ component.js
│   │   ├─ card.js
│   │   ├─ carousel.js
│   │   ├─ form.js
│   │   ├─ modal.js
│   │   └─ taglist.js
│   ├─ pages
│   │   ├─ login.js
│   │   ├─ main.js
│   │   ├─ page.js
│   │   └─ signup.js
│   ├─ services
│   │   ├─ constants.js
│   │   └─ form-validator.js
│   └─ utils
│   │   ├─ util.js
│   │   ├─ light-dom.js
│   │   ├─ node-builder.js
│   │   └─ light-api.js
│   ├─ index.js
│   └─ router.js
├─ json
├─ lib
├─ styles   // css, scss
├─ views    // htmls
└─ webfonts
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Sungdong Jo**

* Github: [@doong-jo](https://github.com/doong-jo)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/doong-jo/membership-amazon/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Sungdong Jo](https://github.com/doong-jo).<br />
This project is [MIT](https://github.com/doong-jo/membership-amazon/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
