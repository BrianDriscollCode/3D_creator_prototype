import './style.css'
import * as THREE from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from "three";

//************* Information ************//

// scene_initializer.js
//
// Handle all foundational tasks of scene creation.
// Other files are used to instantiate details from
// shapes, sprites, controllers, and more. This file
// takes those "level files (scenes)" and implements 
// and initializes them for the frontend. This is the 
// "window" level file. This is the motherfile/main parent 
// to run the program.


// scenes
import initial_test_1 from './scenes/initial_test_1'
import initial_test_1_copy from './scenes/initial_test_1 copy'
import ortho_view_test_1 from "./scenes/ortho_view_test_1"
import perspective_view_test from './scenes/perspective_view_test'
import truck from './scenes/truck'
//player controller 
import player_controller_init from './controller/player_controller_init'
import { OrthographicCamera } from 'three'

//Scene Information
let calls_display = document.querySelector(".calls")
let frame_display = document.querySelector(".frame")
let lines_display = document.querySelector(".lines")
let points_display = document.querySelector(".points")
let triangles_display = document.querySelector(".triangles")

//Camera Information
let camera_type_display = document.querySelector(".camera_type")
let camera_aspect_display = document.querySelector(".camera_aspect")
let camera_fov_display = document.querySelector(".camera_fov")
let camera_POSITION_x_display = document.querySelector(".camera_position_x")
let camera_POSITION_y_display = document.querySelector(".camera_position_y")
let camera_POSITION_z_display = document.querySelector(".camera_position_z")
let camera_ROTATION_x_display = document.querySelector(".camera_rotation_x")
let camera_ROTATION_y_display = document.querySelector(".camera_rotation_y")
let camera_ROTATION_z_display = document.querySelector(".camera_rotation_z")
let camera_QUATERNION = document.querySelector(".camera_quaternion")
let player_POSITION_x_display = document.querySelector(".player_position_x")
let player_POSITION_y_display = document.querySelector(".player_position_y")
let player_POSITION_z_display = document.querySelector(".player_position_z")

//helper for scene function
function load_scene_info(rendererInfo, camera) {
    calls_display.innerHTML = "calls: " + rendererInfo.calls;
    frame_display.innerHTML = "frames: " + rendererInfo.frame;
    lines_display.innerHTML = "lines: " + rendererInfo.lines;
    points_display.innerHTML = "points: " + rendererInfo.points;
    triangles_display.innerHTML = "triangles: " + rendererInfo.triangles;
    camera_type_display.innerHTML = "Type: " + current_scene.camera.type;
    camera_aspect_display.innerHTML = "Aspect: " + current_scene.camera.aspect;
    camera_fov_display.innerHTML = "fov: " + current_scene.camera.fov
    camera_POSITION_x_display.innerHTML = "position_x: " + current_scene.camera.position.x;
    camera_POSITION_y_display.innerHTML = "position_y: " + current_scene.camera.position.y;
    camera_POSITION_z_display.innerHTML = "position_z: " + current_scene.camera.position.z;
    camera_ROTATION_x_display.innerHTML = "rotation_x: " + current_scene.camera.rotation.x;
    camera_ROTATION_y_display.innerHTML = "rotation_y: " + current_scene.camera.rotation.y;
    camera_ROTATION_z_display.innerHTML = "rotation_z: " + current_scene.camera.rotation.z;
    camera_QUATERNION.innerHTML = 
        "Quaternion (w, x, y, z): " + 
        current_scene.camera.quaternion.w + ", " +
        current_scene.camera.quaternion.x + ", " + 
        current_scene.camera.quaternion.y + ", " + 
        current_scene.camera.quaternion.z + ", ";
    player_POSITION_x_display.innerHTML = "position_x: " + current_scene.player.position.x
    player_POSITION_y_display.innerHTML = "position_y: " + current_scene.player.position.y
    player_POSITION_z_display.innerHTML = "position_z: " + current_scene.player.position.z
}

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Declare current_scene (the THREE.js scene file)
// const scene = new THREE.Scene() is created elsewhere 
// then passed here with configuration and objects
let current_scene = initial_test_1(sizes);

//Current Level
const levels = [0, 1]
let current_level = 1

//Change Level
const change_level_button = document.querySelector('.change_level_button')

change_level_button.addEventListener('click', () => {
    console.log('change level')

    switch (current_level) {
        case 0: 
            current_scene = initial_test_1(sizes)
            current_level += 1
            break
        case 1:
            current_scene = initial_test_1_copy(sizes)
            current_level += 1
            break
        case 2:
            current_scene = ortho_view_test_1(sizes)
            current_level += 1
            break
        case 3:
            current_scene = perspective_view_test(sizes)
            current_level += 1
            break
        case 4:
            current_scene = truck(sizes)
            current_level = 0
            break

    }

    //When more levels, write a level check
    

})

// Dynamically Resize window
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    current_scene.camera.aspect = sizes.width / sizes.height
    current_scene.camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Track cursor position on screen
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX
    cursor.y = event.clientY
})

// Get canvas from index.html
const canvas = document.querySelector('canvas.webgl')

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true 
})
renderer.setSize(sizes.width, sizes.height)

render()

const velocity = new THREE.Vector3();

let time = Date.now();
let move_left = false;
let move_right = false;
let move_forward = false;
let move_back = false;
let jump = false;
let no_move = true;

const stats = Stats()
document.body.appendChild(stats.dom)

let applyGravity = false;

//character_physics ** need to put somewhere else
let playerVelocity = 0;

//Configure 'state' for player move direction and speed
function playerMovementState(deltaTime, current_scene, move_left, move_right, jump) {
    
    
    if (move_left === true && jump === true) {
        current_scene.player.position.x -= 0.09 * deltaTime
        current_scene.player.position.y += 0.9 * deltaTime
    } 
    if (move_right === true && jump === true) {
        current_scene.player.position.x += 0.09 * deltaTime
        current_scene.player.position.y += 0.9 * deltaTime
    } 
    if (move_left === true) {
        current_scene.player.position.x -= 0.09 * deltaTime
    } 
    if (move_right === true) {
        current_scene.player.position.x += 0.09 * deltaTime
    }

    if (move_forward === true && current_scene.player.position.z < 62) {
        current_scene.player.position.z += 0.09 * deltaTime;
    }
    
    if(move_back === true && current_scene.player.position.z > -10) {
        current_scene.player.position.z -= 0.09 * deltaTime
    } 
    else {
        current_scene.player.position.x += 0 * deltaTime
        current_scene.player.position.y += 0 * deltaTime
        current_scene.player.position.z += 0 * deltaTime
    }

    if (current_scene.player.position.y > 0) { 
        // console.log(current_scene.player.position.y)
         applyGravity = true;
     } else {
        // console.log(current_scene.player.position.y )
         applyGravity = false;
     }
 
     if (applyGravity === true) {
         playerVelocity += 0.03
         current_scene.player.position.y -= playerVelocity * deltaTime
     } else {
         playerVelocity = 0;
         current_scene.player.position.y = 0 * deltaTime
     }

}

// Animation - prop animations from scene files go here
function animate() {

    let currentTime = Date.now();
    const deltaTime = currentTime - time
    time = currentTime;


    // console.log("move left:", move_left)
    // console.log("move right:", move_right)
    // console.log("jump:", jump)
    playerMovementState(deltaTime, current_scene, move_left, move_right, jump);
    
    // Call all shapes in scene
    for (let i = 0; i < current_scene.initial_shapes.length; i++) {
        current_scene.initial_shapes[i].rotation.x += 0.001 * deltaTime
    }

    if (current_scene.player_animation !== undefined) {
        current_scene.player_animation()
    }

    requestAnimationFrame( animate )
    render();

    stats.update();
}

animate();

function render() {

    load_scene_info(renderer.info.render, current_scene.camera)

    addEventListener('keydown', (event) => {
        if ( event.key === "a") {
            move_forward = false
            move_back = false
            move_left = true
            move_right = false
            jump = false;
            no_move = false
        } else if (event.key === "d") {
            move_forward = false
            move_back = false
            move_left = false
            move_right = true
            jump = false
            no_move = false
        } else if (event.key === "w") {
            move_forward = true
            move_back = false
            move_left = false
            move_right = false
            jump = false;
            no_move = false
        } else if (event.key === "s") {
            move_forward = false
            move_back = true
            move_left = false
            move_right = false
            jump = false;
            no_move = false
        }
        else if (event.key === " ") {
            move_forward = false
            move_back = false
            move_left = false
            move_right = false
            jump = true
            no_move = false
        }
        else {
            move_forward = false
            move_back = false
            move_left = false
            move_right = false
            jump = false
            no_move = true
        }
        //player_controller.simple_controller(event.key, current_scene.player, deltaTime)
    })

    addEventListener('keyup', () => {
        move_left = false
        move_right = false
        no_move = true
        jump = false;
    })


    renderer.render(current_scene.scene, current_scene.camera)

}

