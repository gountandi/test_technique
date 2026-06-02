
# OrgaAfrica - Dynamic Order & Payment Management System

## Présentation

Ce projet a été réalisé dans le cadre du test technique développeur d'OrgaAfrica.

L'objectif est de concevoir un système permettant la gestion dynamique des commandes dans un restaurant, avec prise en charge des paiements Cash et Mobile Money, des factures complémentaires (Invoices) et de la modification des commandes tant qu'elles ne sont pas terminées.

Le système répond à une problématique métier réelle : permettre à un client d'ajouter des articles à sa commande après une commande initiale tout en garantissant la cohérence des paiements et des montants facturés.

---

## Fonctionnalités

### Gestion des commandes

* Création d'une commande
* Consultation d'une commande
* Ajout d'articles à une commande existante
* Modification de la quantité d'un article
* Suppression d'un article
* Recalcul automatique du montant total
* Validation d'une commande

### Gestion des factures

* Génération automatique d'une facture initiale
* Gestion des statuts de facture
* Historisation des factures payées
* Génération de factures complémentaires

### Gestion des paiements

* Paiement Cash
* Paiement Mobile Money
* Historisation des paiements
* Calcul automatique du montant restant à payer

---

## Règles Métier Implémentées

### Commandes

Une commande peut être modifiée uniquement si :

```text
status != COMPLETED
```

Une commande terminée devient verrouillée.

---

### Mobile Money

Lorsqu'une facture est déjà payée et que la commande est modifiée :

```text
Commande initiale : 4000 FCFA
Facture payée : 4000 FCFA

Ajout d'un article : +1500 FCFA

Nouveau total : 5500 FCFA
Reste à payer : 1500 FCFA
```

Le système crée automatiquement une nouvelle facture complémentaire.

---

### Factures

Une facture :

```text
PAID
```

n'est jamais modifiée.

Les paiements déjà effectués sont conservés pour garantir la traçabilité.

---

## Architecture

Le projet suit une architecture en couches.

```text
src
│
├── controllers
├── services
├── repositories
├── routes
├── middlewares
├── validators
├── swagger
├── types
├── generated
├── seeders
└── lib
```

---

### Controllers

Responsables de la gestion des requêtes HTTP.

Exemples :

```text
OrderController
InvoiceController
PaymentController
```

---

### Services

Contiennent toute la logique métier.

Exemples :

```text
OrderService
InvoiceService
PaymentService
```

---

### Repositories

Responsables des accès aux données.

L'utilisation des repositories permet de découpler la logique métier de Prisma et facilite les évolutions futures.

---

### Validators

Validation des données entrantes avec Joi.

Toutes les requêtes sont validées avant exécution de la logique métier.

---

### Middlewares

Gestion :

* de la validation
* des erreurs
* du traitement des requêtes

---

### Types

Contient :

* DTO
* Interfaces
* Enums
* Erreurs personnalisées

Le projet n'utilise pas directement les types Prisma dans les couches métier afin de réduire le couplage avec l'ORM.

---

## Technologies

* TypeScript
* Node.js
* Express.js
* Prisma ORM
* SQLite
* Joi
* Swagger
* TSX

---

## Installation

### Cloner le projet

```bash
git clone <repository-url>
cd OrgaAfrica
```

### Installer les dépendances

```bash
npm install
```

---

## Base de données

Créer les tables :

```bash
npm run db
```

---

## Données de démonstration

Exécuter les seeders :

```bash
npm run seed
```

Cette commande crée :

* Restaurants
* Menus
* Clients

---

## Lancement du projet

Mode développement :

```bash
npm run dev
```

Serveur :

```text
http://localhost:3000
```

---

## Documentation Swagger

Documentation disponible à l'adresse :

```text
http://localhost:3000/api-docs
```

---

## Endpoints Principaux

### Orders

```http
POST /api/orders
```

Créer une commande.

```http
GET /api/orders/:id
```

Récupérer une commande.

```http
POST /api/orders/:id/items
```

Ajouter un article.

```http
PATCH /api/orders/items/:itemId
```

Modifier une quantité.

```http
DELETE /api/orders/:orderId/items/:itemId
```

Supprimer une ligne de commande.

```http
POST /api/orders/:id/complete
```

Finaliser une commande.

---

### Invoices

```http
POST /api/invoices/orders/:orderId
```

Créer une facture complémentaire.

```http
GET /api/invoices/:id
```

Consulter une facture.

---

### Payments

```http
POST /api/payments/invoices/:id/pay
```

Payer une facture.

---

---

## Choix Techniques

### Utilisation de DTO et Interfaces personnalisées

Les types Prisma ne sont pas utilisés directement dans les couches métier.

Cette approche permet :

* de réduire le couplage avec l'ORM ;
* de faciliter un changement futur de solution de persistance ;
* de mieux contrôler les données manipulées dans l'application.

### Validation avec Joi

Toutes les données reçues par l'API sont validées avant traitement afin de garantir leur cohérence.

### Architecture Repository-Service

La séparation entre Repository et Service permet :

* une meilleure maintenabilité ;
* une meilleure testabilité ;
* une séparation claire entre accès aux données et logique métier.

---

# Démarrage rapide

Après avoir cloné le projet, exécuter les commandes suivantes :

### 1. Installer les dépendances

```bash
npm install
```

### 2. Générer le client Prisma

```bash
npx prisma generate --config prisma.config.ts
```

### 3. Créer la base de données et appliquer les migrations

```bash
npm run db
```

### 4. Charger les données de démonstration

```bash
npm run seed
```

### 5. Démarrer l'application

```bash
npm run dev
```

Le serveur sera disponible sur :

```text
http://localhost:3000
```

La documentation Swagger sera disponible sur :

```text
http://localhost:3000/api-docs
```

---

# Scripts Disponibles

```bash
# Développement
npm run dev

# Construction du projet
npm run build

# Lancer la version compilée
npm start

# Créer / mettre à jour la base de données
npm run db

# Charger les données de démonstration
npm run seed
```

---

# Données de démonstration créées par le Seeder

Le seeder crée automatiquement :

### Restaurants

* Chez Mama Africa
* Le Gourmet Lomé

### Menus

* Burger
* Jus
* Frites
* Pizza
* Coca

### Clients

* Nabila
* Kossi
* Afi

---

# Exemple de test rapide

Créer une commande :

```http
POST /api/orders
```

```json
{
  "clientId": 1,
  "restaurantId": 1,
  "paymentMode": "MOBILE_MONEY",
  "items": [
    {
      "menuId": 1,
      "quantity": 2
    },
    {
      "menuId": 2,
      "quantity": 1
    }
  ]
}
```

Le système :

* crée la commande ;
* crée les lignes de commande ;
* calcule automatiquement le total ;
* génère la facture initiale.

---

# Workflow Métier

```text
Client
   │
   ▼
Création commande
   │
   ▼
Ajout articles
   │
   ▼
Recalcul total
   │
   ▼
Création Invoice
   │
   ▼
Paiement
   │
   ▼
Validation commande
   │
   ▼
COMPLETED
```

Cette partie est très appréciée dans les tests techniques parce qu'elle montre immédiatement que tu as compris le métier derrière l'implémentation.


