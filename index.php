<!DOCTYPE html>
<html>
<?php
// copy file content into a string var
$json_file = file_get_contents('./jeux.json');
// convert the string to a json object
$jfo = json_decode($json_file);
?>
<head>
    <meta charset="utf-8"/>

    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">
    <!-- Compiled and minified CSS -->
    <!--Import materialize.css-->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link rel="stylesheet"
          href="./css/styles.css"

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>


    <link rel="icon" type="image/png" href="./images/logo.png"/>
    <title>Projet</title>
</head>

<body>
<header>
    <div class="navbar-fixed ">
        <nav>
            <div class="nav-wrapper blue darken-3">
                <a href="#!" class="brand-logo center ">Projet</a>
            </div>
        </nav>
    </div>
</header>
<main>
    <div class="container">
        <div class="row">
            <?php
            foreach ($jfo->games as $game) {
                ?>
                <div class="col s12 m6 l4">
                    <div class="card blue">
                        <div class="card-content white-text ">
                            <span class="card-title"><?php echo $game->name ?></span>
                            <p><?php echo $game->description ?></p>
                        </div>
                        <div class="card-action">
                            <a class="btn" href=<?php echo $game->link ?>>Play</a>
                        </div>
                    </div>
                </div>
                <?php
            }
            ?>

        </div>
    </div>
</main>
<footer>

</footer>
<!--Import jQuery before materialize.js-->
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
</body>
</html>