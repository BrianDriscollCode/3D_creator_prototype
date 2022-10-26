import * as THREE from "three"
import simple_shape from "../object_generation/simple_shape"
import main_camera from "../view_creator/main_camera"

// Player 
import sprite from "../sprites/sprite"
//***** This is a level (scene) *****//
// Handles: declaring scene, generating objects/player, lighting, generating camera
// Returns: (scene, initial_shapes, camera) -> scene_initializer.js

function initial_test_1(sizes) {

    // Scene
    const scene = new THREE.Scene()

    // create objects
    const shapeFactory = new simple_shape

    // Player 
    const player_creator = new sprite;
    const player = player_creator.body
    console.log(player)
    scene.add(player)

    let title = document.querySelector('.level_title')
    title.innerHTML = "1 - Testing";

    // box params (width, depth, height, color, x position, y position, z position)
    const box1 = shapeFactory.box_instance(20, 20, 20, '#f9a8d4', 80, 0, 0)
    const box2 = shapeFactory.box_instance(20,20, 20, '#0891b2', 0, 0, 0)
    scene.add(box1, box2)

    // declare array and store meshes for export
    const initial_shapes = [box1, box2]; 

    // light
    const light = new THREE.AmbientLight( 0x404040 )
    scene.add( light )
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
    scene.add( directionalLight )

    // Camera
    const cameraFactory = new main_camera(0, 0 , 175)
    const camera = cameraFactory.createPerspectiveCamera(sizes)

    const level_animation = () => {
    }

    const player_animation = () => {

    }

    return {scene, initial_shapes, camera, player_animation, player}

}

export default initial_test_1
