import * as THREE from 'three';
import main_camera from "../view_creator/main_camera"
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import simple_shape from "../object_generation/simple_shape"
import model_builder from "../sprites/model_builder"

let camera, scene, renderer2

let initial_shapes, player

let truck_object, cylinder

const frustumSize = 500 

function standard_object_creation_file(sizes) {

    init();

    function init() {

        truck_object = new THREE.Group()

        const aspect = window.innerWidth / window.innerHeight
        const shapeFactory = new simple_shape

        // Camera
        const cameraFactory = new main_camera(0, 0 , 175)
        camera = cameraFactory.createPerspectiveCamera(sizes)
        camera.position.y += 80
        scene = new THREE.Scene()

        // Scene title
        let title = document.querySelector('.level_title')
        title.innerHTML = "7 - Car"

        //Spawn Item using modeler
        let model_factory = new model_builder;
        truck_object = model_factory.build_truck();
        truck_object.position.y -= 72
        scene.add(truck_object)

        // const image = new Image();
        // image.onload = () => {
        //     console.log('image loaded')
        // }
        // image.src = '/textures/wheel_face.jpg';

        const image = new Image()
        const texture = new THREE.Texture(image)
        image.addEventListener('load', () => {
            texture.needsUpdate = true
        })
        image.src = "/textures/wheel_face_4.jpg"
        //horizontal size
        texture.repeat.set(0.92, 1.92)
        // vertical size
        texture.repeat.set(1.92, 0.92)
        //proportional
        texture.repeat.set(0.92, 0.92)
        //offset x OR u, y OR v 
        //BUT image spawns in with top facing right ----> 
        //So these are changes accordingly
        texture.rotation += 1.575
        texture.offset.set(0.04, 0.95)

        const image_2 = new Image()
        const texture_2 = new THREE.Texture(image_2)
        image_2.addEventListener('load', () => {
            texture_2.needsUpdate = true
        })
        image_2.src = "/textures/wheel_rubber.jpg"
        

        // ** Add Cylinders
        const cylinder_geometry = new THREE.CylinderGeometry(10, 10, 10, 32);
        // Make material for wheel
        const cylinder_material = new THREE.MeshBasicMaterial( {map: texture} )
       
 
    
        
        const cylinder_material_2 = new THREE.MeshBasicMaterial( {map: texture_2} )
        const cylinder_material_package = [
            cylinder_material_2,
            cylinder_material,
            cylinder_material
        ]

        
        cylinder = new THREE.Mesh( cylinder_geometry, cylinder_material_package )
        scene.add(cylinder)

        // Move Cylinder
        cylinder.rotation.x += 1.57
        cylinder.position.y += 10

        // Establish first shapes and grid helper
        initial_shapes = {}

        const size = 1000
        const divisions = 100

        const gridHelper = new THREE.GridHelper( size, divisions )
        scene.add( gridHelper )
        
        // light
        const light = new THREE.AmbientLight( 0x404040 )
        scene.add( light )
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
        scene.add( directionalLight )

        window.addEventListener( 'resize', onWindowResize )
    }

    function onWindowResize() {

        const aspect = window.innerWidth / window.innerHeight

        camera.left = - frustumSize * aspect / 2
        camera.right = frustumSize * aspect / 2
        camera.top = frustumSize / 2
        camera.bottom = - frustumSize / 2

        camera.updateProjectionMatrix()

        renderer2.setSize( window.innerWidth, window.innerHeight )

    }

    const level_animation = () => {
    }

    const player_animation = (delta) => {
        cylinder.rotation.y += 0.04 * delta;
    }

    //Renderer for orbit controls (secondary renderer)
    //Main renderer is in scene_initializer.js
    renderer2 = new CSS3DRenderer()
    renderer2.setSize( window.innerWidth, window.innerHeight )
    renderer2.domElement.style.position = 'absolute'
    renderer2.domElement.style.top = 0
    document.body.appendChild( renderer2.domElement )

    const controls = new OrbitControls( camera, renderer2.domElement )
    controls.minZoom = 0.5
	controls.maxZoom = 2

    return {scene, initial_shapes, camera, player_animation, player}
}

export default standard_object_creation_file