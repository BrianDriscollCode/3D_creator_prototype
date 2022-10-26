import * as THREE from 'three';
import main_camera from "../view_creator/main_camera"
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import sprite from "../sprites/sprite"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import simple_shape from "../object_generation/simple_shape"

let camera, scene, renderer;

let scene2, renderer2;

let initial_shapes, player;

const frustumSize = 500;// import * as THREE from "three"

function truck(sizes) {

    init();

    function init() {

        const aspect = window.innerWidth / window.innerHeight;
        //camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.01, 10000 );
        
        //
        const shapeFactory = new simple_shape

        //camera.position.set( -66, 108, 89 );
        // camera.position.set(-85.8, 210.4, 115.7)
        // camera.rotation.set( -0.78, -0.48, -0.43);
        // Camera
        const cameraFactory = new main_camera(0, 0 , 175)
        camera = cameraFactory.createPerspectiveCamera(sizes)

        

        scene = new THREE.Scene();
        scene2 = new THREE.Scene();

        const material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );

        // left
        // createPlane(
        //     100, 100,
        //     'chocolate',
        //     new THREE.Vector3( - 50, 0, 0 ),
        //     new THREE.Euler( 0, - 90 * THREE.MathUtils.DEG2RAD, 0 )
        // );

        let title = document.querySelector('.level_title')
        title.innerHTML = "5 - Truck";

        const box1 = shapeFactory.box_instance(20, 20, 20, '#16a34a', 100, 10, 0)
        const box2 = shapeFactory.box_instance(95, 95, 20, '#16a34a', 150, 47.5, 0)
        scene.add(box1, box2)

        initial_shapes = {box1}
        // Player 
        const player_creator = new sprite;
        player = player_creator.body
        console.log(player)
        scene.add(player)
        

        const size = 1000;
        const divisions = 100;

        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );
        

        // light
        const light = new THREE.AmbientLight( 0x404040 )
        scene.add( light )
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
        scene.add( directionalLight )



        function createPlane( width, height, cssColor, pos, rot ) {

            const element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = 0.75;
            element.style.background = cssColor;

            const object = new CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            scene2.add( object );

            const geometry = new THREE.PlaneGeometry( width, height );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.copy( object.position );
            mesh.rotation.copy( object.rotation );
            scene.add( mesh );

        }

        window.addEventListener( 'resize', onWindowResize );

    }

    function onWindowResize() {

        const aspect = window.innerWidth / window.innerHeight;

        camera.left = - frustumSize * aspect / 2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = - frustumSize / 2;

        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer2.setSize( window.innerWidth, window.innerHeight );

    }

    const level_animation = () => {
    }

    const player_animation = () => {

    }
    renderer2 = new CSS3DRenderer();
    renderer2.setSize( window.innerWidth, window.innerHeight );
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild( renderer2.domElement ); 
    console.log("2nd renderer covering button");

    const controls = new OrbitControls( camera, renderer2.domElement );
    controls.minZoom = 0.5;
	controls.maxZoom = 2;

    return {scene, initial_shapes, camera, player_animation, player}
}

export default truck