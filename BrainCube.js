"use strict";

/* banner creado por Josep Antoni Bover para devildrey33.es.
 *  Creado el 30/10/2021
 *  Ultima modificación el 30/10/2021
 * inspirado en  https://twitter.com/adamswaab/status/1454304337849585664
 * */

/*

*/

var BrainCube = function() {
    // Llamo al constructor del ObjetoBanner
    if (ObjetoCanvas.call(this, { 
        Tipo                : 'THREE',
        Ancho                   : 'Auto',
        Alto                    : 'Auto',
        Entorno                 : 'Normal',
        Idioma                  : 'es',             // Puede ser 'es', 'en', y 'cat'   
        MostrarFPS              : true,
        BotonesPosicion         : "derecha",        // Puede ser 'derecha' o 'izquierda'
        BotonPantallaCompleta   : true,
        BotonLogo               : true,
        BotonExtraHTML          : "",               // Contenido extra para los botones del lateral inferior izquierdo (solo se usa en el ejemplo sinusoidal y cyberparasit)
        ElementoRaiz            : "",
        Pausar                  : false,            // Pausar si el canvas está en segundo plano
        ColorFondo              : 0x312E35,         // Color del fondo por defecto (solo si usas THREE.js)
        CapturaEjemplo          : "",
        ForzarLandscape         : false             // Fuerza al dispositivo movil para que se muestre solo apaisado        
    }) === false) { return false; }
     
};

BrainCube.prototype = Object.assign( Object.create(ObjetoCanvas.prototype) , {
    constructor     : BrainCube, 
    // Función que se llama al redimensionar el documento
    Redimensionar   : function() {    },
    // Función que se llama al hacer scroll en el documento    
    Scroll          : function() {    },
    // Función que se llama al mover el mouse por el canvas
    MouseMove       : function(Evento) { },
    // Función que se llama al presionar un botón del mouse por el canvas
    MousePresionado : function(Evento) { },
    // Función que se llama al soltar un botón del mouse por el canvas
    MouseSoltado    : function(Evento) { },
    // Función que se llama al entrar con el mouse en el canvas
    MouseEnter      : function(Evento) { },
    // Función que se llama al salir con el mouse del canvas
    MouseLeave      : function(Evento) { },
    // Función que se llama al presionar una tecla
    TeclaPresionada : function(Evento) { },
    // Función que se llama al soltar una tecla
    TeclaSoltada    : function(Evento) { },
    // Función que se llama al presionar la pantalla
    TouchStart      : function(Evento) { },
    // Función que se llama al mover la presión sobre la pantalla
    TouchMove      : function(Evento) { },
    // Función que se llama al soltar el dedo de la pantalla
    TouchEnd        : function(Evento) { },   
    // Número de iteraciones de cubos
    Iteraciones     : 3,

    // Función que inicia el ejemplo
    Iniciar         : function() {
        // Instancia para el objeto encargado de las animaciones de tiempo http://devildrey33.es/Ejemplos/Utils/ObjetoAnimacion.js
        this.Animaciones = new ObjetoAnimacion;

        this.IniciarEscena();
        this.IniciarLuces();
//        this.IniciarCubos();
        this.Cubo = new this.ObjetoGrupoCubos(25, 0);
        this.Escena.add(this.Cubo.Grupo);
        this.Cargando(false);
    },

    IniciarEscena   : function() {
        // Mapeado de sombras
//        this.Context.shadowMap.enabled = true;
        // Inicio la escena del THREE
        this.Escena = new THREE.Scene();
        // Three.js inspector plugin for chrome
        window.scene = this.Escena; 
        // Inicio la Cámara
        this.Camara = new THREE.PerspectiveCamera(75, this.Ancho / this.Alto, 0.7, 3000);
        this.Camara.Rotacion = { Grados : 90 * this.Constantes.Radiant, Avance : this.Constantes.Radiant / 4, Distancia : 80, MirarHacia : new THREE.Vector3(0, 0, 0) };
        this.Camara.position.set(0, 10, 80);
        /*        this.Camara.position.set(this.Camara.Rotacion.Distancia * Math.cos(this.Camara.Rotacion.Grados), 
                                 30, 
                                 this.Camara.Rotacion.Distancia * Math.sin(this.Camara.Rotacion.Grados));        */
        // Función para que la cámara rote alrededor de la escena
        this.Camara.Rotar = function() {
//            if (this.Rotacion.Animacion === true) {
                this.Rotacion.Grados -= this.Rotacion.Avance;
                this.position.x = this.Rotacion.Distancia * Math.cos(this.Rotacion.Grados);
                this.position.z = this.Rotacion.Distancia * Math.sin(this.Rotacion.Grados);
                this.lookAt(this.Rotacion.MirarHacia); 
  //          }
        };
        this.Escena.add(this.Camara);
        this.Camara.lookAt(this.Camara.Rotacion.MirarHacia);

        // Creo el suelo 
/*        this.Suelo = new THREE.Mesh(new THREE.BoxGeometry(160, 40, 130), new THREE.MeshPhongMaterial({ color: 0xcccccc, specular : 0xeeeeee }) );
        this.Suelo.position.y = -60;
        this.Suelo.castShadow = false;
        this.Suelo.receiveShadow = true;
        this.Escena.add(this.Suelo);*/
    },

    IniciarLuces    : function() {
        this.Context.setClearColor("#333333");
        
        this.SpotLight = new THREE.SpotLight( 0xffdddd, 0.5);
        this.SpotLight.position.set(0,160,0);
//        this.SpotLight.target.position.set(0, 15, -70); // = this.Pantalla;
        this.Escena.add(this.SpotLight);

        this.SpotLight2 = new THREE.SpotLight( 0xffdddd, 0.5);
        this.SpotLight2.position.set(-160,0,0);
//        this.SpotLight2.target.position.set(0, 15, -70); // = this.Pantalla;
        this.Escena.add(this.SpotLight2);

        this.SpotLight3 = new THREE.SpotLight( 0xffdddd, 0.5);
        this.SpotLight3.position.set(160,0,0);
//        this.SpotLight3.target.position.set(0, 15, -70); // = this.Pantalla;
        this.Escena.add(this.SpotLight3);

        this.SpotLight4 = new THREE.SpotLight( 0xffdddd, 0.5);
        this.SpotLight4.position.set(0,0,160);
//        this.SpotLight4.target.position.set(0, 15, -70); // = this.Pantalla;
        this.Escena.add(this.SpotLight4);

        this.SpotLight5 = new THREE.SpotLight( 0xffdddd, 0.5);
        this.SpotLight5.position.set(0,0,-160);
//        this.SpotLight5.target.position.set(0, 15, -70); // = this.Pantalla;
        this.Escena.add(this.SpotLight5);

        // HemisphereLight  
        this.HemiLight = new THREE.HemisphereLight( 0xeeeeee, 0xffffff, 0.4 );
        this.HemiLight.color.setHSL( 0.6, 0.6, 0.6 );
        this.HemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        this.HemiLight.position.set( 0, 0, 0 );
        this.Escena.add( this.HemiLight );             


    },


    ObjetoGrupoCubos : function(Escala, Iteracion) {

        // Busca el cubo en la posición especificada por la funcion BrainCube.ObtenerPosCubo
        this.BuscarCubo = function(Pos) {
            for(var i = 0; i < this._Tam; i++) {
                if (this.Grupo.children[i].Pos === Pos) return this.Grupo.children[i];
            }
            // NO DEBERIA LLEGAR AQUI PERO SI PASA... PARA QUE NO PETE LE DEVUELVO EL CUBO 0
            console.log("Cagada pastoret, no sabem quin cubo es...");
            return this.Grupo.children[0];
        };


        this.AnimarHuecoLibre = function(HL) {
            var VPos = this.HuecoLibre;
            var Pos2 = Canvas.ObtenerPosCubo(this.HuecoLibre, this.Escala);
            if (this.HuecoLibre < this._Tam)    this.HuecoLibre ++;
            else                                this.HuecoLibre = 0;
            var Pos = Canvas.ObtenerPosCubo(this.HuecoLibre, this.Escala);
            this.Animacion = Canvas.Animaciones.CrearAnimacion(
                [
                    { Paso : { x : Pos.x,   y : Pos.y,    z : Pos.z }},
                    { Paso : { x : Pos2.x,  y : Pos2.y,   z : Pos2.z}, Tiempo : 300, FuncionTiempo : FuncionesTiempo.SinInOut} 
                ], 
                {
                    // Al actualizar la animación
                    FuncionActualizar : function(Valores) { 
                        Valores.Const.Cubo.position.set(Valores.x, Valores.y, Valores.z);
                    }.bind(this), 
                    // Al terminar la animación
                    FuncionTerminado  : function(Valores) { 
                        var c = this.BuscarCubo(this.HuecoLibre);
//                        console.log(c.Pos + " -> " + Valores.Const.NuevaPosCubo);
                        c.Pos = Valores.Const.NuevaPosCubo;
                        this.AnimarHuecoLibre(); 
                    }.bind(this), 
                    Const             : { Cubo : this.BuscarCubo(this.HuecoLibre), NuevaPosCubo : VPos }
                }
            ).Iniciar();
        };

        this.CrearCubo = function(TamCubo, Pos) {
            var Cubo = new THREE.Mesh( new THREE.BoxGeometry(TamCubo, TamCubo, TamCubo),  new THREE.MeshPhongMaterial({ color: 0xaaeeaa, specular : 0x77bb77,  shininess : 30, transparent : false, opacity : 0.95  }));
/*            Cubo.castShadow = true;
            Cubo.receiveShadow = true;*/
            Cubo.Pos = Pos;
            Cubo.name = "Cubo" + Pos;
            var Pos = Canvas.ObtenerPosCubo(Pos, this.Escala);
            Cubo.position.set(Pos.x, Pos.y, Pos.z);
//            this.Grupo.add(Cubo);
            return Cubo;
        };

        this.CrearGrupo = function(TamCubo, Pos, Iteracion) {
            var Cubo = new Canvas.ObjetoGrupoCubos(TamCubo /2, Iteracion + 1);
            var cPos = Canvas.ObtenerPosCubo(Pos, this.Escala);
            Cubo.Grupo.position.set(cPos.x, cPos.y, cPos.z);
            Cubo.Grupo.Pos = Pos;
            Cubo.Grupo.name = "Grupo" + Pos;
//            Cubo.AnimarHuecoLibre(Cubo.HuecoLibre);
            return Cubo.Grupo;
        };

        // Constructor
        this._Tam = 7; // constante con el total de cubos
        this.Grupo = new THREE.Group();
        this.Escala = Escala;
        this.Margen = Escala / (Escala * 2);
        this.HuecoLibre = RandInt(0, 7); // El espacio libre puede ser de 0 a 7 (es un cubo dividido en 8 partes al que le falta una parte)
        var TamCubo = this.Escala - this.Margen;
        // Ordeno las posiciones de los cubos segun el hueco libre aleatorio
        var ArrPos = [];
        var h = this.HuecoLibre;
        for (var i = 0; i < 7; i++) {
            h++;
            if (h > 7) h = 0;
            if (this.HuecoLibre === h) h++;
            ArrPos.push(h);
        }

        if (Iteracion < 2) {
            for(var i = 0; i < this._Tam; i++) {
//                var c = this.HuecoLibre + i;
//                if (c > 7) c -=8;
                this.Grupo.add(this.CrearGrupo(this.Escala, ArrPos[i], Iteracion));
            }
        }
        else{
            for(var i = 0; i < this._Tam; i++) {
//                var c = this.HuecoLibre + i;
//                if (c > 7) c -=8;
                var R = RandInt((ObjetoNavegador.EsMovil() === true) ? 4 : 5, 0);
                if (R > 3 && Iteracion <= Canvas.Iteraciones)     this.Grupo.add(this.CrearGrupo(this.Escala, ArrPos[i], Iteracion));
                else                                              this.Grupo.add(this.CrearCubo(TamCubo, ArrPos[i]));
            }
        }
//        Canvas.Escena.add(this.Grupo);
        this.AnimarHuecoLibre(this.HuecoLibre);
        return this;
    },

    ObtenerPosCubo  : function(nNumPos, nEscala) {
        var Escala = nEscala / 2; // Divido la escala por 2 para desplazarme
        var Ret = { x : 0, y : 0, z : 0 };
        switch (nNumPos) {
            case 0 : // arriba izquierda, en frente
                return { x : -Escala, y : Escala, z : Escala };
            case 1 : // arriba derecha, en frente
                return { x : Escala, y : Escala, z : Escala };
            case 2 : // abajo derecha, en frente
                return { x : Escala, y : -Escala, z : Escala };
            case 3 : // abajo izquierda, en frente
                return { x : -Escala, y : -Escala, z : Escala };
            case 4 : // abajo izquierda, detras
                return { x : -Escala, y : -Escala, z : -Escala };
            case 5 : // abajo derecha, detras
                return { x : Escala, y : -Escala, z : -Escala };
            case 6 : // arriba derecha, detras
                return { x : Escala, y : Escala, z : -Escala };
            case 7 : // arriba izquierda, detras
                return { x : -Escala, y : Escala, z : -Escala };
        }

        return { x : 0, y : 0, z : 0 };
    },

    // Función que pinta cada frame de la animación
    Pintar          : function() {     
        // Actualizo las animaciones de tiempo
        this.Animaciones.Actualizar(this.Tick);
        this.Camara.Rotar();
        this.Context.render(this.Escena, this.Camara);  
    }
});


var Canvas = new BrainCube;