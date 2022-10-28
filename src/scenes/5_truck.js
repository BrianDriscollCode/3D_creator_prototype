import * as THREE from 'three';
import main_camera from "../view_creator/main_camera"
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import simple_shape from "../object_generation/simple_shape"
import model_builder from "../sprites/model_builder"

let camera, scene, renderer2

let initial_shapes, player

let truck_object

let array_of_trucks = []

const frustumSize = 500 // import * as THREE from "three"

function truck(sizes) {

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
        title.innerHTML = "5 - Truck"

        // Declare model builder and create first truck object
        let model_factory = new model_builder
        truck_object = model_factory.build_truck()
        truck_object.position.y -= 72
        truck_object.position.x += 100
        scene.add(truck_object)

        // Store truck in group
        let interval_amount = 0
        array_of_trucks[interval_amount] = truck_object;
        interval_amount += 1

        // Truck quantity variables
        let max_number_trucks = 5
        let current_number_trucks = 0

        // Interval to create new trucks using model builder
        setInterval(() => {
            if (current_number_trucks < max_number_trucks - 1) {

                // Add model
                let new_truck_object = model_factory.build_truck()
                new_truck_object.position.y -= 72
                new_truck_object.position.x += 100
                scene.add(new_truck_object)

                // Store in array
                array_of_trucks[interval_amount] = new_truck_object
                interval_amount += 1
                
                // Tracking how many until max
                current_number_trucks += 1
            }

        }, 4500)
    
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
        //Grabs trucks from array they are stored in and moves them
        for (let i = 0; i < array_of_trucks.length; i++) {
            array_of_trucks[i].position.x -= 0.1 * delta
            //console.log("truck" + i + " " + "x: " + array_of_trucks[i])
            console.log(array_of_trucks[i])
            
            let children = array_of_trucks[i].children
            children.forEach(shape => {
                if (shape.name === "cylinder") {
                    shape.rotation.y += 0.1 * delta
                }
            })
        }
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

export default truck