# Global Search Component (Palette de Commande)

Le composant `GlobalSearch` est une barre de recherche universelle haute fidélité conçue pour la bibliothèque **Orix-UI**. Il permet d'indexer dynamiquement tout le contenu du site (composants, blocs et documentation) pour une navigation instantanée.

## 🚀 Fonctionnement Technique

### 1. Source de Données Dynamique
Le moteur de recherche s'appuie sur le fichier `registry.json`. Il analyse en temps réel les propriétés suivantes de chaque item :
- `title` : Le nom public du composant.
- `description` : Son utilité et ses caractéristiques.

### 2. Algorithme de Recherche
Le filtrage est effectué côté client via une comparaison insensible à la casse sur les chaînes de caractères. Le composant priorise les pages de documentation essentielles, puis les items du registre, en limitant les résultats aux 8 éléments les plus pertinents pour maintenir une UI propre.

### 3. Gestion du Focus et de l'État
- **Auto-focus** : Dès l'ouverture, le champ de recherche prend le focus automatiquement via une `ref` React pour permettre une saisie immédiate.
- **Scroll Lock** : Pour éviter toute confusion visuelle, le scroll du corps de la page (`document.body`) est désactivé tant que la recherche est active.

## ✨ Caractéristiques Visuelles

- **Adaptative UI** : Grâce à la prop `isScrolled`, le composant passe d'une barre de recherche complète à une icône minimaliste lorsque l'utilisateur descend dans la page, optimisant ainsi l'espace dans la barre de navigation.
- **Esthétique Premium** : Utilise le système de design d'Orix avec des bordures subtiles, des ombres portées profondes, un flou d'arrière-plan (`backdrop-filter`) et des éléments de clavier (`kbd`) stylisés.

## ⌨️ Raccourcis Clavier

| Raccourci | Action |
| :--- | :--- |
| `Cmd + K` (Mac) | Ouvrir / Fermer la recherche |
| `Ctrl + K` (Win/Linux) | Ouvrir / Fermer la recherche |
| `Esc` | Fermer le dialogue |
| `↑` / `↓` | Naviguer entre les résultats |
| `Enter` | Valider la sélection et naviguer vers le lien |

## 🛠️ Props

```typescript
interface GlobalSearchProps {
    isScrolled?: boolean; // Si true, le déclencheur se collapse en icône
}
```

## 📍 Emplacements actuels
- **Navbar principale** : Présent en version adaptative.
- **Docs Layout** : Présent dans le header pour un accès rapide pendant la lecture des guides.

---
*Documentation générée pour la version v0.1.0 d'Orix-UI.*
