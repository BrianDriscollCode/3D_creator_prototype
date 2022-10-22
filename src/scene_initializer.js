import './style.css'
import * as THREE from 'three'

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

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Declare current_scene (the THREE.js scene file)
// const scene = new THREE.Scene() is created elsewhere 
// then passed here with configuration and objects
let current_scene = initial_test_1(sizes)


//Current Level
const levels = [0, 1]
let current_level = 1
const change_level_button = document.querySelector('.change_level_button')

change_level_button.addEventListener('click', () => {
    console.log('change level')

    switch (current_level) {
        case 0: 
            current_scene = initial_test_1(sizes)
            current_level = 1
            break
        case 1:
            current_scene = initial_test_1_copy(sizes)
            current_level = 0
            levels
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
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

function animate() {
    requestAnimationFrame( animate )

    // Call all shapes in scene
    for (let i = 0; i < current_scene.initial_shapes.length; i++) {
        current_scene.initial_shapes[i].rotation.x += 0.01
    }

    //scene and camera passed in from current_scene
    renderer.render(current_scene.scene, current_scene.camera)
}

animate();