# Tp vuejs

## Prérequis
Voici une liste non-exhaustive des sujets qui vont ou peuvent être utilisés tout au long du tp vue js :
- VueJS 2, cela va de soit
- Vue Router
- Vuex, en option
- Axios et les API REST
- Les promesses & fonctions asynchrones, en option
- La programation orientée objet
- La programation fonctionelle
- La doc de l'API REST https://dummyjson.com/
- Une bonne connaissance du language Javascript peut aider

## Quelques règles et remarques avant de commencer
Le but du TP étant de pratiquer le VueJS, tu peux donc installer boostrap ou n'importe quelle autre librairie CSS afin de te faire gagner du temps.

Les librairies javascript comme jQuery sont à bannir, le TP à aussi pour but de voir la façon dont tu organises ton code Javascript et ton code VueJS.

Le projet utilise des icônes en provenance du site icomoon.io mélangées avec des icônes du site fontawesome, tu peux retrouver les icônes dans `static/fonts/icomoon/`, si tu souhaites en ajouter, n'hesite pas ;)

Une base scss est mise à ta disposition pour bien commencer, il en est de même pour le JS, n'hesite pas à aller y faire un tour avant de commencer !

Je ne suis pas un partisant de prettier, ainsi je ne l'ai pas installé. Mais il y a tout de même un linter d'installer, je te laisse faire connaissance avec lui, il est un peu rustre, mais on s'y fait rapidement :)

Le projet est généré avec @vue/cli sur le template webpack, cela permet quelque facilité lors du développement. C'est aussi un template qu'on à utilisé et qu'on utilise encore sûrement chez nous, ça te permettera de te familiariser avec les projets qui l'utilise si tu es ammené à y apporter ta contribution.

Il n'y a pas de maquettes pour ce tp, tu es donc libre sur ce qui est du style des pages.

Je te recommande vivement d'installer l'extension Vue Devtool sur chrome ou firefox si ce n'est pas déjà fait.

Il est tout à fait possible de réaliser ce tp à plusieurs, étant donné qu'il est scindé en plusieurs partie assès indépendentes.

L'API REST fournis propose des méthodes POST, PUT, PATCH et DELETE qui sont factices, ainsi, si tu souhaites faire la partie bonus, je te recommande d'utiliser un store ou juste stocker l'utilisateur dans le localStorage du navigateur.

## Objectifs du TP

- Créer une application e-commerce simple en utilisant l'API REST fournis plus haut
- Rendre l'application un minimum accessible (sensibilisation normes a11y)
- Rendre l'application mobile-first et donc responsive, largeur min : 320px
- Rendre l'application compatible au minimum sur Firefox et Chrome

## I - Le header

Pour ton premier composant, crées un header simpliste, contenant deux liens, un pour retourné à la page "liste produits" et un autre permettant de se rendre sur la page "mon panier" ainsi qu'une barre de recherche dont le fonctionnement sera expliqué à la partie suivante. Ce header devra être présent sur toute les pages.

### a - Une barre de recherche simpliste

La barre de recherche ne doit s'affichée dans le header que si on est sur sur la page "liste produits" et son fonctionnement est le suivant : elle permet de filtrer les produits que l'on affiche sur la liste des produits en utilisant l'API REST (voir la doc de cette api). Le filtrage doit resté actif lorsque l'on passe de la page 1 à la page 2 etc... sur la liste de produits.

### b - Icône "Mon panier"

Une icône permet de se rendre sur la page "mon panier"

## II - La page "Liste produits"

La page liste de produits répertorie tous les produits fournis par l'API REST (voir la doc). On peut les filtrer par catégories, une pagination est mise à disposition de l'utilisateur afin de ne pas surcharger la page et on peut choisir combien de produit on affiche par page, on peut afficher 30, 40 ou 50 produits sur une même page via un selecteur, par défaut on affiche 30 produits.

### a - Mozaic des produits

La mozaic des produits peut être afficher de deux façon :
- en carte, les produits sont alignés sur plusieurs lignes et il y a plusieurs produits sur une même ligne
- en liste, les produits sont affichés 2 par 2 sur plusieurs lignes et on peut y voir plus de détails comme leur description.
L'affichage par défaut est celui en carte, un bouton type switch permet de basculer d'un afichage à un autre.

L'affichage en carte permet de consulter le prix, le nom du produit et contient un bouton permettant de l'ajouter rapidement au panier. En mobile on affiche toujours en carte.

L'affichage en liste permet de consulter le prix, le nom ainsi qu'une description courte du produit. En mobile, il n'y a pas d'affichage en liste, on peut donc masquer le bouton qui permet la bascule de l'un à l'autre.

Dans les deux cas, on affiche la vignette du produit.

Au clic sur un produit, on redirige l'utilisateur vers la page du produit en question.

### b - Filtrage par catégories

La page produit est divisée en 2 partie, une partie à gauche permetterai de lister toutes les catégories de produits et la partie de droite permetterai d'afficher le resultat du filtre appliqué. La partie de gauche, qui liste les catégories de produits, utilise l'API REST afin de récupérer les catégories en question. Au clic sur une cétégories, la partie de droite s'actualise afin de ne présenter que les produits de la catégories selectionnée. Une seul catégorie peut être séléctionnée à la fois. La pagination conserve se filtrage.

### c - Pagination

La pagination permet de passer d'une page affichant les 30 premiers produits à une autre page en affichant 30 autres.
Par soucis de place, on peut afficher la page en cours et les boutons suivant et précédent celon qu'il sont pertinant ou non avec la page en cours.
Exemple : je suis sur la page 1, j'affiche : 1, Suivant
je suis sur la page 10, j'affiche : Précédent, 10, Suivant
je suis sur la dernire page numérotée 20, j'affiche : Précédent, 20.

La pagination conserve les filtres que l'utilisateur à défini précédemment au travers de la barre de recherche simpliste ainsi que via le menu de gauche avec les catégories.

### d - Ajout au panier

Chaque produit de la page liste peut être ajouté au panier via un bouton

## III - La page "Produit"

La page produit permet de consulter toutes les données du produits comme son prix, son nom, sa description ainsi que de parcourir les images qui lui sont associées.

### a - Carrousel d'images

Un carrousel est mis en place afin de parcourir les images associées au produit

### b - Ajout au panier

Un bouton permet d'ajouter ce produit au panier et un selecteur de quantité permet de régler la quantité désirée en fonction du stock disponible (voir doc de l'API REST sur les produits pour le stock)

## IV - La page "Mon panier"

La page mon panier permet de consulter les produits qui y on été ajoutés, de régler la quantité souhaitée et de supprimer les produits que l'on ne veux plus. Elle doit afficher le montant total qui correspond au montant à payer. Il n'y aura pas de page de paiement apr la suite, c'est juste pour pratiquer le vuejs ;)

## V - Bonus : Création d'un compte client

Ceci est une partie bonus, à réalisée si tu te sens à l'aise avec tout ce que l'on viens de voir.

Le but étant de pouvoir s'inscrire et se connecter à notre site e-commerce

### a - Création d'un compte client

Notre projet va maintenant être disponible uniquement si l'on a un compte client. Pour cela il faut afficher la page de Login si l'utilisateur n'est pas conecté au lieu de la page liste produits, et de proposer à l'utilisateur de créer un compte s'il n'en possède pas. L'API REST fourni ce qu'il faut.

Les champs obligatoires sont les suivants : 
- Nom
- Prénom
- email
- mot de passe
Libre à toi d'en ajouter d'autres si tu le souhaites
