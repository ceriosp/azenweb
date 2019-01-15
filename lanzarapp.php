<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <title>Azen PHP Client</title>

    
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
    
</head>

<style type="text/css">

    *{
        box-sizing: border-box;
    }

    .container {

    }

    .left {
        float:left;
        width:20%;
    }

    .azen {
        float:left;
        margin:5px;
        width: calc(60% - 10px);
        border:1px solid black;
        height:500px;
    }

    .right {
        float:left;
        width:20%;
    }

    .iframe-azen{
        width:99.8%;        
    }

    .bottom{
        top:10px;
        position:relative;
        clear:both;
    }

</style>

<script>

    $(lanzarLoteria);


	function lanzarLoteria(){			
        $.ajax({ //Login
            url: encodeURI('http://52.42.49.101:8080/azen/Sesion?cmd=-3&buffer=<cm>LOGIN</cm><usr>azen</usr><vc>azen</vc>&dominio=http://localhost'),
            credentials: 'include',
            dataType: "text",
            method: 'GET',            
        }).then(
            function(response){
				//window.location.replace("http://localhost/azenweb/?idApl=azenctb&nomApl=Contabilidad&lanzarMenu=1");
				//window.open(encodeURI("http://localhost/azenweb/?idApl=azenctb&nomApl=Contabilidad&lanzarMenu=1"));
				console.log("window: open: 2");
            },
            function(err1, err2, err3){
                console.error( "error login", err1, err2, err3 );
            },
        );	
	}
</script>

<body>
	<a href="http://localhost/azenweb?idApl=azenctb&nomApl=Contabilidad&lanzarMenu=1">Lanzar app</a>
</body>

</html>