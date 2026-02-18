# Guide : Réafficher la page "Notre Équipe"

Ce fichier documente les modifications effectuées le 29/01/2026 pour masquer la page "Notre Équipe" et explique comment la remettre en place.

## 1. Modifications effectuées
La page `notre-equipe.html` n'a **pas** été supprimée. Elle est toujours présente sur le serveur.
Seul le **lien** dans le menu de navigation a été masqué en utilisant des commentaires HTML (`<!-- ... -->`) dans tous les fichiers du site.

Le code ressemble maintenant à ceci :
```html
<!-- <li><a href="/notre-equipe.html" data-content="global.nav.team">Notre Équipe</a></li> -->
```

## 2. Comment réafficher la page
Pour rendre l'onglet "Notre Équipe" à nouveau visible dans le menu, vous devez supprimer les balises de commentaires `<!--` et `-->` autour de la ligne concernée dans chaque fichier HTML.

**Exemple :**

🔴 **Actuel (Masqué)** :
```html
<!-- <li><a href="/notre-equipe.html" data-content="global.nav.team">Notre Équipe</a></li> -->
```

🟢 **À modifier (Visible)** :
```html
<li><a href="/notre-equipe.html" data-content="global.nav.team">Notre Équipe</a></li>
```

## 3. Liste des fichiers à modifier
Vous devez effectuer cette opération dans les fichiers suivants (situés à la racine du projet) :

- `index.html`
- `candidate.html`
- `contact.html`
- `faire-un-don.html`
- `mentions-legales.html`
- `merci.html`
- `notre-equipe.html`
- `nous-rejoindre.html`
