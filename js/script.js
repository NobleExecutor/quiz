// ============================================================================
// BANQUE DE QUESTIONS BASÉE SUR LES COURS (1 À 11) - LONGUEURS ÉQUILIBRÉES
// ============================================================================
const QUIZ_DATA = [
    {
        id: "mvc",
        tag: "Chapitre 1",
        title: "Architecture MVC, Modèle & Sécurité SQL",
        description: "Routeur index.php, séparation Modèle-Vue-Contrôleur, gabarit, temporisation de sortie, requêtes préparées PDO et gestion des exceptions.",
        questions: [
            {
                q: "Dans l'architecture MVC mise en place dans le cours, quel est le rôle exact de chacun des 3 composants ?",
                options: [
                    "Modèle : mise en forme HTML | Vue : exécution des requêtes SQL | Contrôleur : connexion directe à la BDD",
                    "Modèle : gestion de l'accès aux données | Vue : mise en forme et interactions | Contrôleur : synchronise Modèle et Vue",
                    "Modèle : routage des URL entrantes | Vue : préparation des requêtes SQL | Contrôleur : affichage final du gabarit",
                    "Modèle : gestion des sessions PHP | Vue : stockage des cookies clients | Contrôleur : compilation des feuilles CSS"
                ],
                correct: 1,
                explanation: "En MVC, le Modèle s'occupe exclusivement de l'accès aux données (BDD), la Vue met en forme les données en HTML pour l'utilisateur, et le Contrôleur fait le lien en récupérant les données du Modèle pour les transmettre à la Vue."
            },
            {
                q: "Lorsqu'un client envoie une requête HTTP vers le site Web Shop, quel fichier joue le rôle de Routeur (point d'entrée unique) et que fait-il ?",
                options: [
                    "Le fichier gabarit.php, qui analyse le menu cliqué par l'utilisateur et appelle directement la requête SQL du Modèle.",
                    "Le fichier config.php, qui intercepte l'URL demandée et redirige automatiquement le navigateur vers la vue correspondante.",
                    "Le fichier index.php, qui analyse le paramètre $_GET['action'] et appelle la fonction correspondante du Contrôleur.",
                    "Le fichier modele.php, qui vérifie les droits d'accès dans l'URL avant d'établir la connexion au serveur MySQL."
                ],
                correct: 2,
                explanation: "Le fichier index.php est le point d'entrée unique (routeur) : il inspecte les paramètres transmis dans l'URL (notamment $_GET['action']) et déclenche la fonction appropriée du contrôleur."
            },
            {
                q: "Dans le fichier config/config.php, comment déclare-t-on une constante (comme NOMSITE ou DBHOST) et comment l'utilise-t-on ensuite en PHP ?",
                code: `// Déclaration dans config.php`,
                options: [
                    "define('NOMSITE', 'Web Shop'); puis on l'appelle directement avec NOMSITE (sans le signe $)",
                    "const $NOMSITE = 'Web Shop'; puis on l'appelle comme une variable classique avec $NOMSITE",
                    "$_SESSION['NOMSITE'] = 'Web Shop'; puis on l'appelle à l'aide de la fonction NOMSITE()",
                    "setcookie('NOMSITE', 'Web Shop'); puis on la récupère partout via $_COOKIE['NOMSITE']"
                ],
                correct: 0,
                explanation: "En PHP, define('NOM', 'Valeur') définit une constante globale. Contrairement aux variables, une constante s'utilise sans le préfixe $ (ex. $header = NOMSITE;)."
            },
            {
                q: "Dans les vues ou le fichier gabarit.php, que signifie exactement l'écriture raccourcie suivante ?",
                code: `<h2><?= $titre ?></h2>`,
                options: [
                    "C'est une condition raccourcie qui vérifie si la variable $titre existe avant de l'afficher (équivalent de isset).",
                    "C'est une balise PHP courte strictement équivalente à l'instruction d'affichage <?php echo $titre; ?>.",
                    "C'est un opérateur d'affectation qui attribue une valeur par défaut à la variable $titre si elle est vide.",
                    "C'est une syntaxe spécifique à PDO permettant d'insérer un paramètre sécurisé directement dans le code HTML."
                ],
                correct: 1,
                explanation: "La balise <?= $variable ?> est la syntaxe courte d'affichage en PHP, identique à <?php echo $variable; ?>."
            },
            {
                q: "Dans une vue (ex. vue/vueClients.php), à quoi servent les fonctions ob_start() et ob_get_clean() ?",
                code: `ob_start();
// ... génération du tableau HTML des clients ...
$contenu = ob_get_clean();
require "gabarit.php";`,
                options: [
                    "ob_start() compresse le code HTML généré, et ob_get_clean() l'envoie directement au navigateur web.",
                    "ob_start() ouvre une transaction sécurisée avec PDO, et ob_get_clean() referme proprement la connexion SQL.",
                    "ob_start() met en mémoire l'affichage généré, et ob_get_clean() récupère ce contenu dans $contenu en vidant le tampon.",
                    "ob_start() initialise les variables de session, et ob_get_clean() détruit les données temporaires en fin de script."
                ],
                correct: 2,
                explanation: "Ce mécanisme de temporisation de sortie (output buffering) évite de faire une multitude de concaténations dans une variable : tout le HTML/PHP exécuté après ob_start() est capturé et stocké d'un bloc dans $contenu grâce à ob_get_clean(), puis injecté dans gabarit.php."
            },
            {
                q: "Dans la fonction getClients() du modèle, quel est le type et la structure de la variable $clients retournée par fetchAll(PDO::FETCH_ASSOC) ?",
                code: `$reponse = $bdd->query('SELECT id_client AS "N° Client", nom AS "NOM", prenom AS "Prénom" FROM client;');
$clients = $reponse->fetchAll(PDO::FETCH_ASSOC);`,
                options: [
                    "Une chaîne de caractères formatée contenant directement les balises <table>, <tr> et <td> prêtes à être affichées.",
                    "Un tableau à 2 dimensions : un tableau indexé où chaque ligne est un tableau associatif (clés = noms des colonnes).",
                    "Un objet de la classe PDOStatement contenant les métadonnées de la table ainsi que le nombre total de clients.",
                    "Un tableau associatif simple à 1 dimension contenant uniquement les clés primaires de tous les clients."
                ],
                correct: 1,
                explanation: "fetchAll(PDO::FETCH_ASSOC) retourne un tableau de tableaux associatifs. Par exemple, $clients[0] contient le premier client sous la forme ['N° Client' => 4, 'NOM' => 'Alizan', 'Prénom' => 'Gaspard']."
            },
            {
                q: "Dans vue/vueClients.php, pourquoi utilise-t-on foreach($clients[0] as $cle => $valeur) avant d'afficher les lignes de données ?",
                code: `echo '<table><tr>';
foreach($clients[0] as $cle => $valeur) {
    echo '<th>'.$cle.'</th>';
}
echo '</tr>';`,
                options: [
                    "Pour extraire et supprimer la première ligne d'en-tête renvoyée automatiquement par le serveur MySQL.",
                    "Pour récupérer les clés du premier client (les alias SQL) et générer les titres de colonnes <th>.",
                    "Pour vérifier que chaque colonne du premier enregistrement contient bien une valeur non nulle avant l'affichage.",
                    "Pour trier dynamiquement les colonnes du tableau HTML par ordre alphabétique avant d'afficher les clients."
                ],
                correct: 1,
                explanation: "Chaque élément de $clients étant un tableau associatif dont les clés correspondent aux noms des colonnes (ou alias AS de la requête SQL), parcourir $clients[0] en récupérant $cle permet de générer automatiquement les titres de colonnes <th>."
            },
            {
                q: "Quelle différence essentielle faut-il retenir entre fetch(PDO::FETCH_ASSOC) et fetchAll(PDO::FETCH_ASSOC) ?",
                options: [
                    "fetch() exécute directement la requête SQL sur le serveur alors que fetchAll() ne fait que la préparer en mémoire.",
                    "fetch() est réservé aux requêtes avec paramètres (prepare), tandis que fetchAll() s'utilise uniquement avec query().",
                    "fetch() récupère une seule ligne (tableau 1D), tandis que fetchAll() récupère toutes les lignes (tableau 2D).",
                    "fetch() renvoie les données sous forme d'objet PHP, alors que fetchAll() renvoie obligatoirement un tableau indexé."
                ],
                correct: 2,
                explanation: "Quand on attend un unique enregistrement (ex. getClient($idClient)), on utilise fetch() qui renvoie directement la ligne sous forme de tableau associatif 1D. Quand on attend une liste (ex. getClients()), on utilise fetchAll()."
            },
            {
                q: "Comment protège-t-on efficacement une requête SQL utilisant un paramètre issu de l'URL contre les injections SQL ?",
                code: `// Objectif : sécuriser la récupération du client $idClient`,
                options: [
                    "En encadrant la variable de guillemets simples dans query(\"SELECT * FROM client WHERE id_client = '$idClient'\").",
                    "En préparant la requête avec prepare('... WHERE id_client = ?') puis en l'exécutant avec execute(array($idClient)).",
                    "En stockant d'abord le paramètre $_GET['idClient'] dans une variable de session avant d'appeler la méthode query().",
                    "En utilisant la fonction strip_tags() sur la requête SQL complète avant de la transmettre à la méthode exec()."
                ],
                correct: 1,
                explanation: "Les requêtes préparées séparent la structure SQL des données : le point d'interrogation (?) sert de marqueur, et les valeurs sont passées sous forme de tableau à la méthode execute(array(...)), neutralisant toute tentative d'injection SQL."
            },
            {
                q: "Dans la fonction getClient($idClient), à quoi sert la vérification if ($reponse->rowCount() == 1) après l'exécution de la requête préparée ?",
                code: `$reponse = $bdd->prepare('SELECT * FROM client WHERE id_client=?');
$reponse->execute(array($idClient));
if ($reponse->rowCount() == 1)
    return $reponse->fetch(PDO::FETCH_ASSOC);
else
    return FALSE;`,
                options: [
                    "À vérifier que la table client ne contient pas de doublons avant d'autoriser la lecture des données.",
                    "À limiter volontairement le nombre de colonnes récupérées par l'instruction SELECT * à un seul champ.",
                    "À vérifier que le client recherché existe bien en base (1 ligne trouvée) et retourner FALSE sinon.",
                    "À compter le nombre de requêtes SQL exécutées depuis l'ouverture de la connexion PDO courante."
                ],
                correct: 2,
                explanation: "rowCount() retourne le nombre de lignes affectées ou renvoyées par la requête. Si l'identifiant demandé n'existe pas en BDD, rowCount() vaut 0 et la fonction renvoie explicitement FALSE."
            },
            {
                q: "Comment fonctionne le mécanisme de gestion des erreurs par exceptions mis en place dans le projet MVC ?",
                options: [
                    "On déclenche une alerte avec catch new Exception('...') dans le modèle et on l'intercepte avec try ($e) dans la vue.",
                    "Dans un bloc try, on lance une erreur avec throw new Exception('...') et on la capture dans catch (Exception $e).",
                    "On configure la fonction native error_reporting() dans gabarit.php pour rediriger les erreurs SQL vers le contrôleur.",
                    "L'objet PDO intercepte lui-même les erreurs d'URL et inclut automatiquement le fichier vue/vueErreur.php."
                ],
                correct: 1,
                explanation: "Le code susceptible d'échouer est placé dans un bloc try. Dès qu'une anomalie est détectée, throw new Exception('...') interrompt le bloc try et passe la main au bloc catch (Exception $e), qui appelle erreur($e->getMessage()) pour afficher la vue d'erreur."
            }
        ]
    },
    {
        id: "poo",
        tag: "Chapitre 2",
        title: "Programmation Orientée Objet (POO) & Modèle",
        description: "Classes, instanciation, constructeur, $this, héritage (extends), visibilité (public, protected, private) et classe abstraite Database.",
        questions: [
            {
                q: "En Programmation Orientée Objet (POO), quelle est la différence entre une classe et un objet ?",
                options: [
                    "La classe est une variable globale temporaire, alors que l'objet est un fichier de configuration stocké sur le serveur.",
                    "La classe est le modèle définissant propriétés et méthodes, et l'objet est une instance créée avec le mot-clé new.",
                    "L'objet contient uniquement la structure HTML d'une page, tandis que la classe regroupe les règles de style CSS.",
                    "Une classe ne peut contenir que des méthodes publiques, alors qu'un objet ne contient que des attributs privés."
                ],
                correct: 1,
                explanation: "La classe définit la structure (attributs/propriétés) et le comportement (méthodes). Un objet est une instance concrète créée à partir de cette classe via l'instruction new NomClasse()."
            },
            {
                q: "Comment s'appelle la méthode spécifique appelée automatiquement lors de l'instanciation d'une classe avec new, et quel est son rôle ?",
                code: `$milou = new Chien("Milou", "fox-terrier");`,
                options: [
                    "public function __init() : elle vérifie que les paramètres transmis respectent le typage de la base de données.",
                    "public function __construct() : c'est le constructeur, utilisé pour initialiser les propriétés de l'objet à sa création.",
                    "public function Chien() : elle importe automatiquement le fichier de classe requis via l'instruction require_once.",
                    "private function __start() : elle réserve l'espace mémoire en démarrant une session dédiée à l'objet créé."
                ],
                correct: 1,
                explanation: "La méthode magique __construct() (avec deux tirets bas) est le constructeur de la classe. Elle s'exécute automatiquement à chaque appel de new et permet d'initialiser l'état de l'objet."
            },
            {
                q: "À l'intérieur d'une classe, à quoi sert la pseudo-variable $this et quel opérateur utilise-t-on ?",
                code: `public function __construct($nc, $r) {
    $this->nomChien = $nc;
    $this->race = $r;
}`,
                options: [
                    "$this désigne l'objet courant et l'opérateur -> permet d'accéder à ses propres propriétés ou méthodes.",
                    "$this désigne la classe parente et l'opérateur => permet de modifier ses attributs privés ou protégés.",
                    "$this permet d'accéder aux variables superglobales du script comme $_POST en utilisant l'opérateur ::.",
                    "$this crée une copie temporaire de l'objet en mémoire à chaque fois que l'opérateur -> est appelé."
                ],
                correct: 0,
                explanation: "Dans les méthodes d'une classe, $this désigne l'objet en cours de manipulation. On accède à ses attributs ou méthodes avec l'opérateur flèche simple -> (sans mettre de $ devant le nom de la propriété : $this->race)."
            },
            {
                q: "Dans le constructeur de la classe Maitre, comment rend-on les paramètres du chien ($nc et $r) optionnels lors de l'instanciation ?",
                code: `// Objectif : permettre new Maitre("Astérix", "guerrier", "Gaules") sans chien`,
                options: [
                    "En déclarant deux méthodes __construct() distinctes dans la classe : l'une avec 3 paramètres et l'autre avec 5.",
                    "En leur donnant une valeur par défaut : public function __construct($n, $m, $p, $nc=null, $r=null)",
                    "En ajoutant le mot-clé réservé optional devant les variables $nc et $r dans la parenthèse du constructeur.",
                    "En passant les propriétés $nomChien et $race en visibilité private au début de la déclaration de classe."
                ],
                correct: 1,
                explanation: "Affecter une valeur par défaut (comme = null) aux derniers paramètres d'une fonction ou d'un constructeur les rend facultatifs lors de l'appel."
            },
            {
                q: "Quel mot-clé permet de faire hériter une classe d'une autre classe, et pourquoi utilise-t-on require_once pour importer la classe parente ?",
                code: `require_once "chien.php";
class Maitre2 extends Chien { ... }`,
                options: [
                    "Le mot-clé inherits ; require_once permet de précharger les requêtes SQL de la classe parente en mémoire cache.",
                    "Le mot-clé implements ; require_once convertit automatiquement les attributs privés de la classe mère en public.",
                    "Le mot-clé extends ; require_once évite d'inclure plusieurs fois le fichier et de redéclarer la même classe.",
                    "Le mot-clé parent ; require_once vérifie que le fichier existe bien dans le dossier avant d'instancier l'objet."
                ],
                correct: 2,
                explanation: "L'héritage s'écrit avec extends. L'instruction require_once est indispensable en POO car déclarer deux fois la même classe au cours de l'exécution d'un script provoque une erreur fatale PHP."
            },
            {
                q: "Quelle est la différence exacte entre les visibilités public, protected et private ?",
                options: [
                    "public : partout | protected : uniquement dans le contrôleur | private : accessible dans la classe et ses classes filles",
                    "public : dans les vues | protected : accessible partout sauf dans les vues | private : réservé aux fichiers de configuration",
                    "public : partout | protected : dans la classe et ses classes filles | private : uniquement dans la classe déclarante",
                    "public : dans tout le dossier modele | protected : uniquement par héritage | private : accessible via l'opérateur ::"
                ],
                correct: 2,
                explanation: "public autorise l'accès partout ; private verrouille l'accès à la seule classe où l'élément est défini (même une classe fille ne peut pas y accéder) ; protected ouvre l'accès à la classe elle-même ainsi qu'aux classes qui en héritent (extends), tout en interdisant l'accès extérieur."
            },
            {
                q: "Dans la classe Database du modèle POO, pourquoi la propriété $bdd et la méthode connexionBDD() sont-elles en private alors que execReq() et execReqPrep() sont en protected ?",
                code: `abstract class Database {
    private $bdd;
    protected function execReq($req) { ... }
    protected function execReqPrep($req, $data) { ... }
    private function connexionBDD() { ... }
}`,
                options: [
                    "Car le contrôleur doit appeler directement connexionBDD() à chaque action, mais ne doit jamais utiliser execReq().",
                    "Car PDO impose que l'instance de connexion soit privée pour autoriser l'utilisation des requêtes préparées.",
                    "Seule Database gère la connexion interne (private), tandis que les classes filles appellent execReq() par héritage (protected).",
                    "Pour permettre aux vues d'exécuter des requêtes via execReq() tout en masquant le mot de passe stocké dans $bdd."
                ],
                correct: 2,
                explanation: "La cuisine interne de connexion PDO ($bdd et connexionBDD()) ne regarde que Database (d'où private). En revanche, les modèles enfants (Article, Client, Commande) héritent de Database et ont besoin d'appeler $this->execReq() et $this->execReqPrep() tout en empêchant un appel direct depuis l'extérieur (d'où protected)."
            },
            {
                q: "Dans la méthode connexionBDD() de la classe Database, à quoi sert le test if (!isset($this->bdd)) ?",
                code: `private function connexionBDD() {
    if (!isset($this->bdd)) {
        // new PDO(...)
    }
    return $this->bdd;
}`,
                options: [
                    "À vérifier que la base de données MySQL contient bien au moins une table avant d'envoyer une requête.",
                    "À n'établir la connexion PDO que si elle n'existe pas encore, évitant ainsi d'ouvrir des connexions multiples.",
                    "À réinitialiser automatiquement la connexion PDO après chaque requête pour libérer la mémoire du serveur.",
                    "À s'assurer que les constantes DBHOST et DBNAME ont bien été définies dans le fichier config/config.php."
                ],
                correct: 1,
                explanation: "Si $this->bdd est déjà initialisé par une première requête, on réutilise directement l'objet PDO existant au lieu de se reconnecter au serveur de base de données à chaque appel."
            },
            {
                q: "Pourquoi la classe Database est-elle déclarée avec le mot-clé abstract (abstract class Database) et pourquoi la classe Article n'a-t-elle pas besoin de constructeur ?",
                options: [
                    "abstract permet de partager une seule connexion entre tous les visiteurs ; Article hérite du constructeur du contrôleur.",
                    "Database n'est jamais instanciée directement (utilisée par héritage), et Article n'a aucun attribut propre à initialiser.",
                    "abstract interdit toute modification des méthodes par les classes filles ; Article n'utilise que des méthodes statiques.",
                    "abstract oblige PHP à charger le fichier en priorité ; Article initialise ses propriétés directement dans la vue."
                ],
                correct: 1,
                explanation: "Aucun objet new Database() n'est jamais créé dans le site : déclarer la classe abstract interdit son instanciation directe tout en permettant d'en hériter. Quant à Article, elle ne possède pas d'attributs à initialiser lors du new Article(), un constructeur __construct() est donc inutile."
            }
        ]
    },
    {
        id: "sessions",
        tag: "Chapitre 3",
        title: "Cookies, Sessions & Authentification",
        description: "Différences cookies/sessions, $_SESSION, $_COOKIE, formulaire de login, contrôle d'accès dans le routeur et redirection HTTP.",
        questions: [
            {
                q: "Quelle est la différence fondamentale entre un cookie et une variable de session en PHP ?",
                options: [
                    "Les cookies sont enregistrés dans la base MySQL, tandis que les sessions sont transmises en clair dans l'URL.",
                    "Les cookies sont stockés côté client (navigateur), tandis que les données de session ($_SESSION) sont stockées côté serveur.",
                    "Les variables de session ne peuvent stocker que des chaînes de caractères, contrairement aux cookies qui stockent des objets.",
                    "Les cookies sont systématiquement détruits à la fermeture de l'onglet, alors qu'une session reste active indéfiniment."
                ],
                correct: 1,
                explanation: "Les variables de session sont conservées sur le serveur (plus sécurisé pour un état d'authentification), alors qu'un cookie est un petit fichier enregistré sur le poste client par le navigateur."
            },
            {
                q: "Quelle fonction PHP est obligatoire au début du script avant toute lecture ou écriture dans le tableau superglobal $_SESSION ?",
                options: [
                    "La fonction open_session(), qui crée le dossier temporaire sur le serveur web.",
                    "La fonction session_start(), qui démarre ou reprend la session existante.",
                    "La fonction init_session_cookie(), qui synchronise le navigateur et la BDD.",
                    "La méthode $_SESSION->start(), appelée directement sur l'objet superglobal."
                ],
                correct: 1,
                explanation: "L'appel à session_start() démarre une nouvelle session ou reprend la session existante de l'utilisateur afin de rendre le tableau $_SESSION disponible."
            },
            {
                q: "Observons la balise <form> de la vue d'authentification vueCtlAcces. Comment le script cible récupère-t-il l'action et les champs saisis ?",
                code: `<form method="post" action="<?= $_SERVER["PHP_SELF"]."?action=login" ?>">
  <input type="text" name="nom" value="">
  <input type="password" name="mdp" value="">
  <input type="submit" name="ok" value="Valider">
</form>`,
                options: [
                    "Le script cible est login.php ; l'action et les deux champs sont tous récupérés dans le tableau $_GET.",
                    "Le script cible est vueCtlAcces.php ; les identifiants saisis sont stockés directement dans $_SESSION.",
                    "Le script cible est index.php ; 'action' est lu via $_GET['action'] et les champs via $_POST['nom'] et $_POST['mdp'].",
                    "Le script cible est controleur.php ; 'action' est lu via $_POST['action'] et le mot de passe via $_COOKIE['mdp']."
                ],
                correct: 2,
                explanation: "$_SERVER['PHP_SELF'] renvoie le nom du script en cours d'exécution (index.php). Comme l'URL d'action contient ?action=login, ce paramètre est dans $_GET['action'], tandis que les inputs du formulaire envoyé en method='post' sont récupérés dans $_POST['nom'] et $_POST['mdp']."
            },
            {
                q: "Dans le système d'authentification du site Web Shop, comment vérifie-t-on si l'utilisateur a le droit d'accéder aux pages du magasin ?",
                options: [
                    "On vérifie à chaque chargement de page si $_COOKIE['mdp'] correspond bien au mot de passe défini dans config.php.",
                    "On teste si $_SESSION['acces'] est défini : si oui, l'accès est autorisé ; sinon, seul le formulaire de login est accessible.",
                    "On interroge la méthode connexionBDD() pour savoir si l'utilisateur courant possède un compte MySQL actif.",
                    "On vérifie la présence du paramètre ?login=ok dans l'URL de chaque lien généré par la constante MENU."
                ],
                correct: 1,
                explanation: "Le contrôle d'accès repose sur $_SESSION['acces'] : tant qu'elle n'est pas définie, le routeur bloque l'accès aux autres actions et affiche la demande d'authentification. Dès que le mot de passe est validé dans login(), $_SESSION['acces'] reçoit le nom de l'utilisateur."
            },
            {
                q: "Lorsqu'un utilisateur clique sur le lien 'Quitter' du menu pour fermer sa session, que doit faire le serveur ?",
                options: [
                    "Appeler la méthode $bdd->close() dans le modèle afin d'interrompre immédiatement les requêtes SQL en cours.",
                    "Supprimer la variable de session (ex. unset($_SESSION['acces']) ou session_destroy()) et réafficher la vue de login.",
                    "Modifier la constante MENU dans le fichier config.php pour masquer les liens Clients, Articles et Commandes.",
                    "Appeler la fonction ob_get_clean() depuis le routeur index.php pour effacer l'historique de navigation du client."
                ],
                correct: 1,
                explanation: "La déconnexion consiste à détruire la variable $_SESSION['acces'] (ou la session complète) pour révoquer l'autorisation d'accès, puis à afficher de nouveau le formulaire d'authentification."
            },
            {
                q: "Quelle fonction PHP permet de créer ou modifier le cookie 'page' pour mémoriser la dernière page visitée par l'utilisateur ?",
                options: [
                    "Affecter directement la nouvelle valeur dans la superglobale avec $_COOKIE['page'] = $action;",
                    "Appeler la fonction native setcookie('page', $action, time() + 3600); avant l'envoi du code HTML.",
                    "Utiliser la fonction session_set_cookie('page', $action); à l'intérieur du fichier gabarit.php.",
                    "Envoyer une requête préparée PDO pour stocker la variable $action dans la table système des cookies."
                ],
                correct: 1,
                explanation: "En PHP, on crée ou met à jour un cookie vers le navigateur client avec la fonction setcookie(nom, valeur, expiration). Le tableau $_COOKIE sert uniquement à lire les cookies renvoyés par le client lors des requêtes suivantes."
            },
            {
                q: "Après une authentification réussie, quelle instruction permet de rediriger automatiquement le navigateur vers la dernière page mémorisée dans le cookie ?",
                options: [
                    "Appeler la fonction PHP redirect_to('index.php?action=' . $_COOKIE['page']); depuis la vue d'accueil.",
                    "Utiliser header('Location: index.php?action=' . $_COOKIE['page']); (avec l'espace obligatoire après Location:).",
                    "Inclure directement l'URL cible avec require_once 'index.php?action=' . $_COOKIE['page']; dans le contrôleur.",
                    "Modifier la variable $_SERVER['PHP_SELF'] en lui affectant la valeur stockée dans $_COOKIE['page']."
                ],
                correct: 1,
                explanation: "La fonction header('Location: votre_URL') envoie un en-tête HTTP de redirection au navigateur. Comme souligné dans le cours, l'espace juste après les deux-points de 'Location: ' est obligatoire."
            },
            {
                q: "Si un utilisateur tente d'accéder directement à index.php?action=commandes alors qu'il n'est pas encore authentifié ($_SESSION['acces'] non défini), que doit-il se passer ?",
                options: [
                    "Le routeur lance une exception fatale qui bloque définitivement l'adresse IP du navigateur client.",
                    "L'accès est refusé et le formulaire de login s'affiche, puis après connexion, il est redirigé vers la page mémorisée.",
                    "La page des commandes s'affiche en mode lecture seule sans permettre de cliquer sur le bouton Afficher.",
                    "Le navigateur affiche une fenêtre système demandant le mot de passe de la base de données Laragon."
                ],
                correct: 1,
                explanation: "Tant que $_SESSION['acces'] n'est pas défini, toute tentative d'accès renvoie vers le formulaire d'authentification. Une fois connecté avec succès, la lecture du cookie 'page' permet de rediriger l'utilisateur vers la section qu'il consultait précédemment."
            }
        ]
    },
    {
        id: "upload",
        tag: "Chapitre 4",
        title: "Téléversement de fichiers & Gestion système",
        description: "Formulaire multipart/form-data, tableau 2D $_FILES, codes d'erreur, SplFileInfo, move_uploaded_file(), php.ini et fonctions fichiers/dossiers.",
        questions: [
            {
                q: "Quels sont les deux attributs obligatoires dans la balise <form> pour permettre le téléversement (upload) d'un fichier vers le serveur ?",
                options: [
                    "method=\"get\" et enctype=\"application/x-www-form-urlencoded\"",
                    "method=\"post\" et enctype=\"multipart/form-data\"",
                    "method=\"post\" et accept=\"image/jpeg, image/png\"",
                    "method=\"files\" et enctype=\"text/plain\""
                ],
                correct: 1,
                explanation: "Un transfert de fichier exige impérativement la méthode HTTP POST (method=\"post\") ainsi que l'encodage spécifique enctype=\"multipart/form-data\" dans la balise <form>."
            },
            {
                q: "Concernant la balise cachée MAX_FILE_SIZE placée dans le formulaire d'upload, quelle affirmation est vraie ?",
                code: `<input type="hidden" name="MAX_FILE_SIZE" value="500000">
<input type="file" name="photo" accept="image/gif, image/jpeg, image/png">`,
                options: [
                    "Elle doit être placée après <input type=\"file\"> et bloque de manière infaillible tout fichier trop lourd.",
                    "Elle se place avant <input type=\"file\">, mais peut être contournée côté client : vérifier côté serveur reste obligatoire.",
                    "Sa valeur est exprimée en kilooctets (Ko) et modifie automatiquement la configuration du fichier php.ini.",
                    "Elle permet de compresser automatiquement les images qui dépassent 500 000 octets avant leur envoi."
                ],
                correct: 1,
                explanation: "La balise cachée MAX_FILE_SIZE se place avant l'input file et indique une taille maximale en octets. Toutefois, un utilisateur pouvant modifier le code HTML dans son navigateur, il est impératif de vérifier $_FILES['...']['size'] côté serveur en PHP."
            },
            {
                q: "Après soumission d'un formulaire contenant <input type=\"file\" name=\"photo\">, quelles sont les 5 clés disponibles dans le sous-tableau $_FILES['photo'] ?",
                options: [
                    "nom, format, chemin_temp, code_erreur, poids",
                    "name, type, tmp_name, error, size",
                    "filename, mime_type, full_path, status,octets",
                    "title, extension, folder, exception, max_size"
                ],
                correct: 1,
                explanation: "Le tableau à 2 dimensions $_FILES['photo'] contient exactement : 'name' (nom d'origine chez le client), 'type' (type MIME), 'tmp_name' (chemin complet du fichier temporaire sur le serveur), 'error' (code d'erreur) et 'size' (taille en octets)."
            },
            {
                q: "Que signifient respectivement les codes 0, 1, 2, 3 et 4 dans $_FILES['photo']['error'] ?",
                options: [
                    "0 : aucun fichier | 1 : transfert réussi | 2 : mauvaise extension | 3 : fichier trop lourd | 4 : erreur serveur",
                    "0 : transfert réussi | 1 : dépasse php.ini | 2 : dépasse MAX_FILE_SIZE | 3 : partiellement chargé | 4 : aucun fichier",
                    "0 : erreur fatale | 1 : image GIF | 2 : image JPEG | 3 : image PNG | 4 : format de fichier non reconnu",
                    "0 : fichier vide | 1 : dossier temporaire plein | 2 : transfert partiel | 3 : dépasse php.ini | 4 : transfert réussi"
                ],
                correct: 1,
                explanation: "Le code 0 indique que le transfert s'est déroulé sans erreur. Les codes 1 et 2 concernent un dépassement de taille (php.ini puis MAX_FILE_SIZE), le 3 un transfert partiel et le 4 l'absence de fichier sélectionné."
            },
            {
                q: "Dans le script de traitement de l'upload, comment vérifie-t-on proprement l'extension du fichier envoyé par le client ?",
                code: `$infosfichier = new SplFileInfo($_FILES['photo']['name']);
$extension_upload = $infosfichier->getExtension();
$extensions_autorisees = array('jpg', 'gif', 'png');`,
                options: [
                    "Avec if (isset($extension_upload == $extensions_autorisees))",
                    "Avec if (in_array($extension_upload, $extensions_autorisees))",
                    "Avec if ($infosfichier->checkExtension($extensions_autorisees))",
                    "Avec if (array_key_exists($extensions_autorisees, $extension_upload))"
                ],
                correct: 1,
                explanation: "On instancie la classe native SplFileInfo avec le nom du fichier pour extraire son extension via getExtension(), puis on vérifie sa présence dans le tableau des extensions permises grâce à in_array()."
            },
            {
                q: "Une fois toutes les vérifications réussies (erreur == 0, taille <= 500000, extension autorisée), comment déplace-t-on le fichier de son dossier temporaire vers son dossier définitif 'uploads/' ?",
                options: [
                    "move_uploaded_file($_FILES['photo']['name'], 'uploads/' . $_FILES['photo']['tmp_name']);",
                    "move_uploaded_file($_FILES['photo']['tmp_name'], 'uploads/' . $_FILES['photo']['name']);",
                    "file_put_contents('uploads/' . $_FILES['photo']['name'], $_FILES['photo']['tmp_name']);",
                    "copy_uploaded_file($_FILES['photo']['tmp_name'], 'uploads/' . $_FILES['photo']['type']);"
                ],
                correct: 1,
                explanation: "La fonction move_uploaded_file() prend en 1er paramètre le chemin actuel du fichier temporaire sur le serveur ($_FILES['photo']['tmp_name']) et en 2nd paramètre le chemin complet de destination définitif."
            },
            {
                q: "Quels paramètres du fichier de configuration serveur php.ini régissent le téléversement de fichiers ?",
                options: [
                    "pdo_upload_enable, tmp_folder_path, max_post_octets et concurrent_file_limit",
                    "file_uploads, upload_tmp_dir, upload_max_filesize et max_file_uploads",
                    "allow_multipart_form, server_upload_dir, max_image_weight et limit_files_count",
                    "enable_file_transfer, php_temp_storage, filesize_max_bytes et max_simultaneous_files"
                ],
                correct: 1,
                explanation: "Ces 4 directives de php.ini contrôlent l'activation de l'upload (file_uploads = On), le répertoire temporaire (upload_tmp_dir), la taille maximale autorisée par fichier (upload_max_filesize) et le nombre maximal d'uploads simultanés (max_file_uploads)."
            },
            {
                q: "Parmi les fonctions PHP de manipulation de fichiers et de dossiers vues en cours, laquelle permet de vérifier si un dossier existe et laquelle permet de le créer ?",
                options: [
                    "is_file() pour vérifier l'existence du dossier et fopen() pour le créer.",
                    "is_dir() pour vérifier si le dossier existe et mkdir() pour créer le dossier.",
                    "scandir() pour vérifier l'existence du dossier et rmdir() pour le créer.",
                    "file_exists_dir() pour vérifier le dossier et create_dir() pour le créer."
                ],
                correct: 1,
                explanation: "is_dir() vérifie l'existence d'un dossier, mkdir() crée un dossier, rmdir() le supprime, et scandir() liste son contenu. Pour les fichiers : is_file() vérifie l'existence et unlink() supprime un fichier."
            },
            {
                q: "Pour rendre un formulaire HTML auto-invoquant (qui appelle le script PHP courant lors de sa validation), quelle valeur donne-t-on à l'attribut action de la balise <form> ?",
                options: [
                    "action=\"<?= $_SERVER['HTTP_HOST'] ?>\"",
                    "action=\"<?= $_SERVER['PHP_SELF'] ?>\"",
                    "action=\"<?= $_SESSION['CURRENT_PAGE'] ?>\"",
                    "action=\"<?= $_FILES['SCRIPT_NAME'] ?>\""
                ],
                correct: 1,
                explanation: "La variable superglobale $_SERVER['PHP_SELF'] contient le nom du fichier script en cours d'exécution, permettant au formulaire de s'envoyer ses propres données."
            },
            {
                q: "Dans le TP 11 (application de l'upload au site MVC Web Shop), comment les photos des articles sont-elles associées à chaque article sans modifier la base de données ?",
                options: [
                    "Le chemin de chaque image téléversée est enregistré dans un cookie permanent stocké sur le navigateur.",
                    "La photo est placée dans le dossier photoArticle et nommée avec le Code (id_article) de l'article.",
                    "Le fichier image est converti en texte base64 et ajouté automatiquement à la fin du fichier config.php.",
                    "Un fichier texte portant le nom de la catégorie d'article liste les correspondances entre photos et prix."
                ],
                correct: 1,
                explanation: "En nommant le fichier image directement avec l'identifiant unique de l'article (id_article / Code) dans le dossier photoArticle, la vue peut vérifier si une image porte ce code et l'afficher, ou afficher defaut.png par défaut, sans aucune colonne supplémentaire en BDD."
            }
        ]
    }
];

// ============================================================================
// GESTION DE L'ÉTAT ET DU LOCALSTORAGE
// ============================================================================
const STORAGE_KEY = "mmi2_back_quiz_progress_v1";

let appState = loadProgress();

let activeQuiz = {
    chapterId: null,
    title: "",
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedOption: null,
    isValidated: false,
    isMix: false
};

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn("Impossible de lire localStorage", e);
    }
    return { chapters: {} };
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
        console.warn("Impossible de sauvegarder dans localStorage", e);
    }
    updateHomeSummary();
}

function resetAllProgress() {
    if (confirm("Voulez-vous vraiment remettre à zéro tous vos scores et votre progression sauvegardée ?")) {
        appState = { chapters: {} };
        saveProgress();
        renderChaptersGrid();
        showHome();
    }
}

// ============================================================================
// NAVIGATION ENTRE LES VUES
// ============================================================================
function switchView(viewId) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById(viewId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
    updateHomeSummary();
    switchView("view-home");
}

function openCourse(courseId) {
    if (courseId === "php-back") {
        renderChaptersGrid();
        switchView("view-chapters");
    }
}

function updateHomeSummary() {
    const totalChapters = QUIZ_DATA.length;
    let completedCount = 0;
    let totalQuestions = 0;

    QUIZ_DATA.forEach(ch => {
        totalQuestions += ch.questions.length;
        const st = appState.chapters[ch.id];
        if (st && st.bestScore !== undefined) {
            completedCount++;
        }
    });

    const statsEl = document.getElementById("course-php-stats");
    const badgeEl = document.getElementById("course-php-badge");

    if (statsEl) statsEl.textContent = `${totalChapters} chapitres • ${totalQuestions} questions`;

    if (badgeEl) {
        if (completedCount === 0) {
            badgeEl.textContent = "Commencer →";
            badgeEl.className = "badge-score";
        } else if (completedCount < totalChapters) {
            badgeEl.textContent = `${completedCount}/${totalChapters} chapitres faits`;
            badgeEl.className = "badge-score in-progress";
        } else {
            badgeEl.textContent = `4/4 complétés ✓`;
            badgeEl.className = "badge-score completed";
        }
    }
}

function renderChaptersGrid() {
    const grid = document.getElementById("chapters-grid");
    if (!grid) return;
    grid.innerHTML = "";

    QUIZ_DATA.forEach(chapter => {
        const st = appState.chapters[chapter.id] || {};
        const qCount = chapter.questions.length;

        let statusHtml = `<span class="badge-score">Non commencé</span>`;
        if (st.inProgress && st.currentIdx > 0 && st.currentIdx < qCount) {
            statusHtml = `<span class="badge-score in-progress">En cours (Q${st.currentIdx + 1}/${qCount})</span>`;
        } else if (st.bestScore !== undefined) {
            statusHtml = `<span class="badge-score completed">Meilleur : ${st.bestScore}/${qCount}</span>`;
        }

        const card = document.createElement("div");
        card.className = "card";
        card.onclick = () => startChapter(chapter.id);

        card.innerHTML = `
            <div>
                <span class="card-tag">${chapter.tag}</span>
                <h2 class="card-title">${chapter.title}</h2>
                <p class="card-desc">${chapter.description}</p>
            </div>
            <div class="card-footer">
                <span>${qCount} questions</span>
                ${statusHtml}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ============================================================================
// LOGIQUE DU QCM
// ============================================================================
function startChapter(chapterId, forceRestart = false) {
    const chapter = QUIZ_DATA.find(c => c.id === chapterId);
    if (!chapter) return;

    const saved = appState.chapters[chapterId] || {};

    let startIdx = 0;
    let startScore = 0;

    if (!forceRestart && saved.inProgress && saved.currentIdx > 0 && saved.currentIdx < chapter.questions.length) {
        startIdx = saved.currentIdx;
        startScore = saved.currentScore || 0;
    } else {
        appState.chapters[chapterId] = {
            ...saved,
            inProgress: true,
            currentIdx: 0,
            currentScore: 0
        };
        saveProgress();
    }

    activeQuiz = {
        chapterId: chapter.id,
        title: `${chapter.tag} — ${chapter.title}`,
        questions: chapter.questions,
        currentIndex: startIdx,
        score: startScore,
        selectedOption: null,
        isValidated: false,
        isMix: false
    };

    renderQuestion();
    switchView("view-quiz");
}

function startExamMix() {
    const allQuestions = [];
    QUIZ_DATA.forEach(ch => {
        ch.questions.forEach(q => {
            allQuestions.push({ ...q, chapterTag: ch.tag });
        });
    });

    const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 20);

    activeQuiz = {
        chapterId: "mix",
        title: "Examen Blanc — Grand Mix (4 chapitres)",
        questions: shuffled,
        currentIndex: 0,
        score: 0,
        selectedOption: null,
        isValidated: false,
        isMix: true
    };

    renderQuestion();
    switchView("view-quiz");
}

function restartCurrentChapter() {
    if (activeQuiz.isMix) {
        startExamMix();
    } else {
        startChapter(activeQuiz.chapterId, true);
    }
}

function renderQuestion() {
    const qObj = activeQuiz.questions[activeQuiz.currentIndex];
    const total = activeQuiz.questions.length;
    const currentNum = activeQuiz.currentIndex + 1;

    activeQuiz.selectedOption = null;
    activeQuiz.isValidated = false;

    document.getElementById("quiz-chapter-title").textContent = activeQuiz.title;
    document.getElementById("quiz-counter").textContent = `Question ${currentNum} / ${total}`;
    document.getElementById("quiz-progress-bar").style.width = `${(currentNum / total) * 100}%`;

    document.getElementById("question-text").textContent = qObj.q;

    const codeEl = document.getElementById("question-code");
    if (qObj.code) {
        codeEl.style.display = "block";
        codeEl.textContent = qObj.code;
    } else {
        codeEl.style.display = "none";
        codeEl.textContent = "";
    }

    const optionsList = document.getElementById("options-list");
    optionsList.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    qObj.options.forEach((optText, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.onclick = () => selectOption(idx);

        const letterSpan = document.createElement("span");
        letterSpan.className = "option-letter";
        letterSpan.textContent = letters[idx];

        const textSpan = document.createElement("span");
        textSpan.textContent = optText;

        btn.appendChild(letterSpan);
        btn.appendChild(textSpan);
        optionsList.appendChild(btn);
    });

    const feedbackBox = document.getElementById("feedback-box");
    feedbackBox.className = "feedback-box";
    document.getElementById("feedback-correct-answer").style.display = "none";

    const btnValidate = document.getElementById("btn-validate");
    const btnNext = document.getElementById("btn-next");
    btnValidate.style.display = "inline-block";
    btnValidate.disabled = true;
    btnNext.style.display = "none";
}

function selectOption(idx) {
    if (activeQuiz.isValidated) return;

    activeQuiz.selectedOption = idx;
    const buttons = document.querySelectorAll("#options-list .option-btn");
    buttons.forEach((btn, i) => {
        btn.classList.toggle("selected", i === idx);
    });

    document.getElementById("btn-validate").disabled = false;
}

function validateAnswer() {
    if (activeQuiz.selectedOption === null || activeQuiz.isValidated) return;

    activeQuiz.isValidated = true;
    const qObj = activeQuiz.questions[activeQuiz.currentIndex];
    const isCorrect = activeQuiz.selectedOption === qObj.correct;

    if (isCorrect) {
        activeQuiz.score++;
    }

    if (!activeQuiz.isMix) {
        const prev = appState.chapters[activeQuiz.chapterId] || {};
        appState.chapters[activeQuiz.chapterId] = {
            ...prev,
            inProgress: true,
            currentIdx: activeQuiz.currentIndex + 1,
            currentScore: activeQuiz.score
        };
        saveProgress();
    }

    const buttons = document.querySelectorAll("#options-list .option-btn");
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        btn.classList.remove("selected");
        if (i === qObj.correct) {
            btn.classList.add("correct");
        } else if (i === activeQuiz.selectedOption && !isCorrect) {
            btn.classList.add("wrong");
        }
    });

    const feedbackBox = document.getElementById("feedback-box");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackCorrectAnswer = document.getElementById("feedback-correct-answer");
    const feedbackExplanation = document.getElementById("feedback-explanation");

    if (isCorrect) {
        feedbackBox.className = "feedback-box visible is-correct";
        feedbackTitle.textContent = "✓ Bonne réponse !";
        feedbackCorrectAnswer.style.display = "none";
    } else {
        feedbackBox.className = "feedback-box visible is-wrong";
        feedbackTitle.textContent = "✗ Réponse incorrecte";
        feedbackCorrectAnswer.style.display = "block";
        feedbackCorrectAnswer.innerHTML = `<strong>Bonne réponse :</strong> ${escapeHtml(qObj.options[qObj.correct])}`;
    }

    feedbackExplanation.textContent = qObj.explanation;

    document.getElementById("btn-validate").style.display = "none";
    const btnNext = document.getElementById("btn-next");
    btnNext.style.display = "inline-block";

    if (activeQuiz.currentIndex + 1 < activeQuiz.questions.length) {
        btnNext.textContent = "Question suivante →";
    } else {
        btnNext.textContent = "Voir mon résultat →";
    }
}

function nextQuestion() {
    if (activeQuiz.currentIndex + 1 < activeQuiz.questions.length) {
        activeQuiz.currentIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const total = activeQuiz.questions.length;
    const score = activeQuiz.score;

    if (!activeQuiz.isMix) {
        const prev = appState.chapters[activeQuiz.chapterId] || {};
        const best = prev.bestScore !== undefined ? Math.max(prev.bestScore, score) : score;
        appState.chapters[activeQuiz.chapterId] = {
            bestScore: best,
            total: total,
            inProgress: false,
            currentIdx: 0,
            currentScore: 0
        };
        saveProgress();
    }

    document.getElementById("result-chapter-tag").textContent = activeQuiz.isMix ? "Examen Blanc terminé" : "Chapitre terminé";
    document.getElementById("result-chapter-name").textContent = activeQuiz.title;
    document.getElementById("result-score-text").textContent = `${score}/${total}`;

    const ratio = score / total;
    const msgEl = document.getElementById("result-message");
    if (ratio === 1) {
        msgEl.textContent = "Score parfait ! Tu maîtrises ce sujet sur le bout des doigts pour le partiel.";
    } else if (ratio >= 0.75) {
        msgEl.textContent = "Très bon score ! Les concepts essentiels du cours sont bien acquis.";
    } else if (ratio >= 0.5) {
        msgEl.textContent = "Pas mal, mais n'hésite pas à refaire une passe sur les questions ratées.";
    } else {
        msgEl.textContent = "Encore un peu d'entraînement nécessaire : relis bien les explications et retente le chapitre !";
    }

    switchView("view-results");
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// Initialisation au chargement
updateHomeSummary();
