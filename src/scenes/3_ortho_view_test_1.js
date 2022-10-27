import * as THREE from 'three';

import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import sprite from "../sprites/sprite"
import simple_shape from "../object_generation/simple_shape"

let camera, scene, renderer;

let scene2, renderer2;

let initial_shapes, player;

const frustumSize = 500;// import * as THREE from "three"

function ortho_view_test_1() {

    init();

    function init() {

        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.01, 10000 );
        const shapeFactory = new simple_shape

        //camera.position.set( -66, 108, 89 );
        camera.position.set(-85.8, 210.4, 115.7)
        camera.rotation.set( -0.78, -0.48, -0.43);

        scene = new THREE.Scene();
        scene2 = new THREE.Scene();

        const material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 1, side: THREE.DoubleSide } );

        // left
        createPlane(
            100, 100,
            'chocolate',
            new THREE.Vector3( - 50, 0, 0 ),
            new THREE.Euler( 0, - 90 * THREE.MathUtils.DEG2RAD, 0 )
        );

        let title = document.querySelector('.level_title')
        title.innerHTML = "3 - Orthoview";

        const box1 = shapeFactory.box_instance(20, 20, 20, '#16a34a', 100, 0, 0)
        const box2 = shapeFactory.box_instance(20, 20, 20, '#0891b2', 0, 0, 0)
        const box3 = shapeFactory.box_instance(20, 20, 20, '#0891b2', -120, 0, 0)
        const box4 = shapeFactory.box_instance(1400, 250, 20, '#ecfccb', 40, -65, -22)    
        const box5 = shapeFactory.box_instance(3000, 3000, 20, '#2dd4bf', 40, -155, -22)  
        scene.add(box1, box2, box3, box4, box5)
        box4.rotation.x += 1.57
        box5.rotation.x += 1.57

        initial_shapes = {box1, box2, box3}
        // Player 
        const player_creator = new sprite;
        player = player_creator.create_player_body()
        console.log(player)
        scene.add(player)
        

        const size = 1000;
        const divisions = 100;

        // const gridHelper = new THREE.GridHelper( size, divisions );
        // scene.add( gridHelper );
        
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

    return {scene, initial_shapes, camera, player_animation, player}
}

export default ortho_view_test_1