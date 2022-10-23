import * as THREE from "three"
import simple_shape from "../object_generation/simple_shape"
import main_camera from "../view_creator/main_camera"

//***** This is a level (scene) *****//
// Handles: declaring scene, generating objects/player, lighting, generating camera
// Returns: (scene, initial_shapes, camera) -> scene_initializer.js

function initial_test_1(sizes) {

    // Scene
    const scene = new THREE.Scene()

    // create objects
    const shapeFactory = new simple_shape

    let title = document.querySelector('.level_title')
    title.innerHTML = "1 - Testing";

    // box params (width, depth, height, color, x position, y position, z position)
    const box1 = shapeFactory.box_instance(1,1,1, '#f9a8d4', 3, 0, 0)
    const box2 = shapeFactory.box_instance(1,1,1, '#0891b2', 0, 0, 0)
    scene.add(box1, box2)

    // declare array and store meshes for export
    const initial_shapes = [box1, box2]; 

    // light
    const light = new THREE.AmbientLight( 0x404040 )
    scene.add( light )
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
    scene.add( directionalLight )

    // Camera
    const cameraFactory = new main_camera(0, 0 , 6)
    const camera = cameraFactory.createCamera(sizes)

    return {scene, initial_shapes, camera}

}

export default initial_test_1
