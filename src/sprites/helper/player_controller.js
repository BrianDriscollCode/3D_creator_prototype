
function player_controller(event, player, deltaTime) {

    let move_left;
    let move_right;
    let move_forward;
    let move_backward;
    let jump;

    switch (event.key) {
        case "a":
            move_left = true;
            move_right = false;
            move_forward = false;
            move_backward = false;
            jump = false;
            console.log('move_left_state')
            break
        case "d":
            move_left = false;
            move_right = true;
            move_forward = false;
            move_backward = false;
            jump = false;
            console.log('move_right_state')
            break
        case "w":
            move_left = false;
            move_right = false;
            move_forward = true;
            move_backward = false;
            jump = false;
            console.log('move_forward_state')
            break
        case "s":
            move_left = false;
            move_right = false;
            move_forward = false;
            move_backward = true;
            jump = false;
            console.log('move_backward_state')
            break
        case " ":
            move_left = false;
            move_right = false;
            move_forward = false;
            move_backward = false;
            jump = true;
            console.log('jump_state')
        default:
            move_left = false;
            move_right = false;
            move_forward = false;
            move_backward = false;
            jump = false;
            console.log("no state")
    }

    if (move_left === true && jump === true) {
        player.position.x -= 0.09 * deltaTime
        player.position.y += 0.9 * deltaTime
    } 
    if (move_right === true && jump === true) {
        player.position.x += 0.09 * deltaTime
        player.position.y += 0.9 * deltaTime
    } 
    if (move_left === true) {
        player.position.x -= 0.09 * deltaTime
    } 
    if (move_right === true) {
        player.position.x += 0.09 * deltaTime
    }

    if (move_forward === true && player.position.z < 62) {
        player.position.z -= 0.09 * deltaTime;
    }
    
    if(move_backward === true && player.position.z > -10) {
        player.position.z += 0.09 * deltaTime
    } 
    else {
        player.position.x += 0 * deltaTime
        player.position.y += 0 * deltaTime
        player.position.z += 0 * deltaTime    
    }

    // if (player.position.y > 0) { 
    // // console.log(player.position.y)
    //     applyGravity = true;
    // } else {
    // // console.log(player.position.y )
    //     applyGravity = false;
    // }
}

export default player_controller

