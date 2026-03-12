# myspotify-front-vue3-ts

## Done
### [Dette technique] Refactorer la recherche d'album
La logique de recherche qui vivait directement dans la vue a été extraite dans un store Pinia et un service dédié. Les types Spotify ont été centralisés dans un fichier spotify.ts. La vue ne fait plus que afficher.

## Setup : Accès à l'API Spotify

* Aller sur la page [Spotify Dashboard](https://developer.spotify.com/dashboard).
* Se connecter ou créer un compte (gratuit).
* Ensuite dans le dashboard, il faut créer une application (bouton "Create an app")
    * Lui donner un nom
    * Ajouter un redirect URI : http://127.0.0.1:3000/callback et http://127.0.0.1:3000
    * Valider
* Récupérer le Client ID et le Client Secret (vers le haut à gauche)
* Copier ensuite le fichier .env vers un fichier .env.local
* Dans le fichier .env.local, modifier les variables VITE_SPOTIFY_CLIENT_ID et VITE_SPOTIFY_CLIENT_SECRET avec votre clientId et Client Secret

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Tester

Il faut ouvrir ton navigateur à l'adresse : (http://127.0.0.1:3000)[http://127.0.0.1:3000]

> Ne pas mettre localhost, il faut bien utiliser l'adresse ip locale

