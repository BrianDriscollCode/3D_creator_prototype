import * as THREE from "three"
import simple_shape from "../object_generation/simple_shape"
import main_camera from "../view_creator/main_camera"
import sprite from "../sprites/sprite"

//***** This is a level (scene) *****//
// Handles: declaring scene, generating objects/player, lighting, generating camera
// Returns: (scene, initial_shapes, camera) -> scene_initializer.js

function initial_test_1_copy(sizes) {

    // Scene
    const scene = new THREE.Scene()

    // Player 
    const player = new sprite;
    console.log(player)
    scene.add(player.body)
    

    // Testing ui
    let title = document.querySelector('.level_title')
    title.innerHTML = "x - Copy Scene"

    // create objects
    const shapeFactory = new simple_shape
    const box1 = shapeFactory.box_instance(20,20,20, '#a3e635', 40, 0, 0)
    const box2 = shapeFactory.box_instance(20,20,20, '#ea580c', 0, 0, 0)
    scene.add(box1, box2)

    // declare array and store meshes for export
    const initial_shapes = [box1, box2]

    // light
    const light = new THREE.AmbientLight( 0x404040 )
    scene.add( light )
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
    scene.add( directionalLight )

    // Camera
    const cameraFactory = new main_camera(0, 0 , 175)
    const camera = cameraFactory.createCamera(sizes)

    const level_animation = () => {

    }

    const player_animation = () => {

        player.body.position.x -= 0.1

    }



    return {scene, initial_shapes, camera, player_animation}

}

export default initial_test_1_copy
