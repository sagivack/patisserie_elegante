# 🍰 Application de Commande de Gâteaux (TP2)

Bienvenue dans l'application de commande de gâteaux personnalisés ! 
Ce projet est entièrement conteneurisé pour un lancement ultra-rapide et fiable.

## 🚀 Démarrage Rapide (Docker)

Si vous avez Docker d'installé, lancez simplement :

```bash
docker-compose up --build -d
```

L'application sera disponible sur : **http://localhost:3000**

---

## 🐳 Guide Docker Détaillé

Voici toutes les commandes utiles pour gérer votre environnement.

### 1. Prérequis
- Avoir **Docker Desktop** installé et lancé sur votre machine.

### 2. Lancer l'application
Pour construire les images et démarrer les conteneurs (App + MongoDB) en arrière-plan :
```bash
docker-compose up -d
```
*(Ajoutez `--build` si vous avez modifié le code : `docker-compose up --build -d`)*

### 3. Accéder à l'application
- **Interface Utilisateur** : [http://localhost:3000](http://localhost:3000)
- **API Backend** : [http://localhost:3000/commandes](http://localhost:3000/commandes)

### 4. Gérer l'application
- **Voir les logs** (pour déboguer) :
  ```bash
  docker-compose logs -f
  ```
- **Arrêter l'application** :
  ```bash
  docker-compose down
  ```

---

## 🛠️ Technologies Utilisées

- **Backend** : Node.js, Express, TypeScript
- **Base de données** : MongoDB (Image officielle Docker)
- **Frontend** : HTML, CSS, JavaScript (Vanilla)
- **Infrastructure** : Docker Compose

## 📂 Organisation des Fichiers

- `src/` : Code du serveur (Node.js/TypeScript).
- `Scripts/` : Code du client (JavaScript).
- `docker-compose.yml` : Chef d'orchestre des conteneurs.
- `Dockerfile` : Recette de cuisine pour l'image de l'application.

## 👤 Auteur
Projet réalisé par [sagivack](https://github.com/sagivack).
