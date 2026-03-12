# myspotify-front-vue3-ts

## Done
### [Dette technique] Refactorer la recherche d'album
La logique de recherche qui vivait directement dans la vue a été extraite dans un store Pinia et un service dédié. Les types Spotify ont été centralisés dans un fichier spotify.ts. La vue ne fait plus que afficher.

### [Feature] Afficher le détail d'un album
Ajout d'une page de détail accessible en cliquant sur un album. On y retrouve la pochette, les artistes, le label, l'année de sortie et la tracklist complète avec les durées. Un skeleton de chargement a été ajouté pour ne pas laisser l'utilisateur face à une page vide.

### [Feature] Gérer la pagination de la recherche
Les résultats de recherche peuvent être nombreux, on a ajouté le composant Paginator de PrimeVue sur l'API Spotify pour naviguer entre les pages sans relancer une recherche complète.

### [Feature] Ajouter un album en favoris
Un bouton cœur a été ajouté sur chaque album, aussi bien dans la liste que sur la page de détail. Les favoris sont persistés en localStorage, donc ils survivent au rechargement de la page.

### [Feature] Afficher les albums favoris
Ajout d'une page dédiée accessible depuis le menu. Elle affiche les albums mis en favoris avec le même composant que la recherche. Un message d'accès refusé s'affiche si l'utilisateur n'est pas connecté.

### [Feature] Gérer les favoris par utilisateur
Les favoris sont maintenant stockés par utilisateur Spotify, clé spotify_favorites_<userId>. Changer de compte recharge automatiquement les bons favoris. Si plusieurs personnes utilisent l'app sur le même navigateur, elles ne se marchent plus dessus.

### [Sécurité] Changer le flow d'authentification à Spotify
Migration du flow Implicit Grant (déprécié) vers Authorization Code. La différence concrète : le token n'est plus exposé dans l'URL, un paramètre state aléatoire est vérifié pour prévenir les attaques CSRF, et un refresh token est maintenant disponible pour renouveler la session sans reconnexion.

### [Feature] Remplacer les cards dans les composants AlbumList
Les composants Card ont été remplacés par un DataView PrimeVue qui propose un toggle liste/grille. En mode grille, une image plus grande est utilisée pour éviter la pixelisation. Le composant AlbumItem gère les deux layouts via une prop layout.




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

## Favoris — choix d'implémentation

L'énoncé prévoit un backend H2 + Liquibase pour persister les favoris en base de données. Ce backend n'étant pas disponible dans le cadre de cet exercice, les favoris sont stockés **en localStorage**, avec une clé par utilisateur Spotify (`spotify_favorites_<userId>`).

L'identifiant utilisateur est récupéré via l'endpoint `/v1/me` de l'API Spotify après chaque connexion, ce qui garantit l'isolation des favoris entre utilisateurs sur un même navigateur.

L'architecture est conçue pour faciliter la migration vers un vrai backend : toute la logique de persistance est encapsulée dans `src/stores/favorites.store.ts`. Brancher une API REST reviendrait à remplacer les appels `localStorage` dans ce seul fichier par des appels HTTP, sans modifier les composants.

## Tester

Il faut ouvrir ton navigateur à l'adresse : (http://127.0.0.1:3000)[http://127.0.0.1:3000]

> Ne pas mettre localhost, il faut bien utiliser l'adresse ip locale

