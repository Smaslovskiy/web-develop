var FLOOR = -250;

var container, stats;

var camera, scene, renderer;

var mesh, zmesh, geometry;

var loader;

var group, textMesh1, textMesh2, textGeo, materials;

var directionalLight;

var mouseX = 0, mouseY = 0;

var textureCube;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

console.log(isMobile);
// once everything is loaded, we run our Three.js stuff.




var font = undefined;

var text = "NORTHSBEST",
    hover = 30,
    height = 120,
    size = 500,
    curveSegments = 36,
    bevelThickness = 40,
    bevelSize = 12,
    bevelSegments = 100,
    bevelEnabled = true;


// once everything is loaded, we run our Three.js stuff.
function init() {
    if ( WEBGL.isWebGLAvailable() === false ) {
        document.body.appendChild( WEBGL.getWebGLErrorMessage() );
    }



    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.z =  -4000;

    if (isMobile) {
        camera.position.y =  -2000;
    }

    // Cube

    var r = "res/";

    // var urls = [
    //     r + "bg2.jpg", r + "bg2.jpg",
    //     r + "bg2.jpg", r + "bg2.jpg",
    //     r + "bg2.jpg", r + "bg2.jpg"
    // ];

    var urls = [
        r + "bg3.jpg", r + "bg3.jpg",
        r + "bg3.jpg", r + "bg3.jpg",
        r + "bg3.jpg", r + "bg3.jpg"
    ];

    textureCube = new THREE.CubeTextureLoader().load( urls );
    textureCube.mapping = THREE.CubeRefractionMapping;

    scene = new THREE.Scene();


    group = new THREE.Group();
    group.position.y = 100;

    scene.add( group );

    if (isMobile) {
        controls = new THREE.DeviceOrientationControls( group );
        group.scale.set(0.5,0.5,0.5);
    }
    loadFont();

    // LIGHTS

    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );

    // material samples

    var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0xccddff, envMap: textureCube, refractionRatio: 0.98, reflectivity: 0.9 } );
    var cubeMaterial2 = new THREE.MeshPhongMaterial( { color: 0xccfffd, envMap: textureCube, refractionRatio: 0.985 } );
    var cubeMaterial1 = new THREE.MeshPhongMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 0.98 } );

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x000000, 0 );

    container.appendChild( renderer.domElement );

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener( 'resize', onWindowResize, false );

    var size = 200;
    var transparent = true;
    var opacity = 0.7;
    var color = 0xffffff;
    var sizeAttenuation = true;
    createPointClouds(size, transparent, opacity, sizeAttenuation, color);


    // stats = new Stats();
    // container.appendChild( stats.dom );

    animate();
};

function createPointClouds(size, transparent, opacity, sizeAttenuation, color) {

    var texture1 = new THREE.TextureLoader().load( 'res/snow1.png' );

    scene.add(createPointCloud("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
}

function createPointCloud(name, texture, size, transparent, opacity, sizeAttenuation, color) {
    var geom = new THREE.Geometry();
    var color = new THREE.Color(color);
    var HLSColor = {};
    color.getHSL(HLSColor);
    color.setHSL(   HLSColor.h,
        HLSColor.s,
        (Math.random()) * HLSColor.l);
    var material = new THREE.PointsMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: sizeAttenuation,
        color: color
    });

    range = 32000;
    for (var i = 0; i < 4000; i++) {
        var particle = new THREE.Vector3(
            Math.random() * range - range/2,
            Math.random() * range/2 - range/4,
            Math.random() * range - range/2
        );
        particle.velocityY = - (10 + Math.random() * 20);
        particle.velocityX = (Math.random() - 0.5) * 10;
        particle.velocityZ = (Math.random() - 0.5) * 10;
        geom.vertices.push(particle);
    }
    var system = new THREE.Points(geom, material);
    system.name = name;
    system.sortParticles = true;
    return system;
}

function loadFont() {

    var loader = new THREE.TTFLoader();

    loader.load( 'res/bb.ttf', function ( json ) {
        font = new THREE.Font( json );
        createText();
    } );

}

function createText() {
    textGeo = new THREE.TextGeometry( text, {

        font: font,

        size: size,
        height: height,
        curveSegments: curveSegments,

        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled

    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

    textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );

    textMesh1 = new THREE.Mesh( textGeo, new THREE.MeshPhongMaterial(
        {
            color: 0xeeeeee,
            envMap: textureCube,
            refractionRatio: 0.985

            // transparent: true,
            // opacity: 0.6
        } ) );

    textMesh1.position.x = -centerOffset;
    textMesh1.position.y = hover;
    textMesh1.position.z = 0;

    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI;

    group.add( textMesh1 );
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

    mouseX = ( event.clientX - windowHalfX ) * 4;
    mouseY = ( event.clientY - windowHalfY ) * 4;

}

function animate() {

    requestAnimationFrame( animate );

    render();
    // stats.update();

    if (isMobile) {
        controls.update();
        
    }

}

function render() {

    var timer = -0.0002 * Date.now();

    camera.position.x += ( 2*mouseX - camera.position.x ) * .05;
    camera.position.y += ( - 2*mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    scene.children.forEach(function (child) {
        if (child instanceof THREE.Points) {
            var vertices = child.geometry.vertices;
            vertices.forEach(function (v) {

                v.y = v.y + v.velocityY;
                v.x = v.x - (v.velocityX);
                v.z = v.z - (v.velocityZ);
                if (v.y <= -range/4) {v.y = range/4};
                if (v.x <= -range/2 || v.x >= range/2) v.velocityX = v.velocityX * -1;
                if (v.z <= -range/2 || v.z >= range/2) v.velocityZ = v.velocityZ * -1;
            });
            child.geometry.verticesNeedUpdate = true;
        }
    });

    renderer.render( scene, camera );

}

window.onload = init;

// $("#click").click(function() {


// https://umusic.digital/atfvhw/

// });
