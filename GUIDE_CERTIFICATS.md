# Guide: Ajouter vos Certificats PDF

## 🎯 Fonctionnalité Ajoutée

Chaque carte de certification est maintenant cliquable et ouvrira le PDF du certificat dans un nouvel onglet!

## ✨ Effets Visuels

Au survol d'une certification:
- ✅ Ligne violette apparaît en haut
- 🔼 Carte s'élève avec animation
- 🎨 Badge "View Certificate" apparaît
- ✨ Glow violet plus prononcé

## 📂 Structure des Fichiers

```
frontend/
  certificates/
    ├── README.txt
    ├── datacamp-professional-data-scientist.pdf
    ├── google-data-analytics.pdf
    ├── aws-machine-learning.pdf
    ├── ibm-python-data-science.pdf
    ├── hackerrank-sql-advanced.pdf
    └── tableau-desktop-specialist.pdf
```

## 🚀 Méthodes pour Ajouter vos Certificats

### Méthode 1: Script Automatique (RECOMMANDÉ)

```powershell
.\add-certificates.ps1
```

Le script vous guidera pour:
- Voir le statut de chaque certificat (présent ou manquant)
- Ajouter un certificat spécifique
- Importer tous les certificats depuis un dossier

### Méthode 2: Manuelle

1. Copiez vos PDF dans `frontend/certificates/`
2. Renommez-les EXACTEMENT comme suit:

| Certification | Nom du fichier |
|--------------|----------------|
| DataCamp Professional Data Scientist | `datacamp-professional-data-scientist.pdf` |
| Google Data Analytics | `google-data-analytics.pdf` |
| AWS Machine Learning | `aws-machine-learning.pdf` |
| IBM Python for Data Science | `ibm-python-data-science.pdf` |
| HackerRank SQL Advanced | `hackerrank-sql-advanced.pdf` |
| Tableau Desktop Specialist | `tableau-desktop-specialist.pdf` |

### Méthode 3: PowerShell Direct

```powershell
# Exemple
Copy-Item "C:\Mes Documents\Mon_Certificat.pdf" "frontend\certificates\datacamp-professional-data-scientist.pdf"
```

## 🎨 Personnalisation

Pour modifier les certifications affichées, éditez:
- `frontend/index.html` - Section certifications
- `frontend/css/style.css` - Styles des cartes

## 📝 Notes Importantes

- **Format**: PDF uniquement
- **Noms**: Respectez exactement les noms de fichiers (minuscules, tirets)
- **Ouverture**: Les certificats s'ouvrent dans un nouvel onglet
- **Erreur 404**: Si un PDF n'existe pas, une erreur s'affichera (c'est normal)

## ✅ Test

1. Ajoutez au moins un certificat PDF
2. Rafraîchissez le navigateur (Ctrl+F5)
3. Cliquez sur la carte du certificat
4. Le PDF devrait s'ouvrir dans un nouvel onglet!

## 🎯 Prochaines Étapes

1. Exécutez `.\add-certificates.ps1`
2. Ajoutez vos certificats PDF
3. Rafraîchissez http://localhost:3000
4. Testez en cliquant sur les cartes!
