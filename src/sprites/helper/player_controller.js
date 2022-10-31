
function player_controller(event, player, deltaTime) {

    let move_left;
    let move_right;
    let move_forward;
    let move_backward;
    let jump;
    //console.log(event.key)

    switch (event.key) {
        case "a":
            console.log(event.key)
            move_left = true;
            move_right = false;
            move_forward = false;
            move_backward = false;
            jump = false;
            break
        case "d":
            console.log(event.key)
            move_left = false;
            move_right = true;
            move_forward = false;
            move_backward = false;
            jump = false;
            break
        case "w":
            console.log(event.key)
            move_left = false;
            move_right = false;
            move_forward = true;
            move_backward = false;
            jump = false;
            break
        case "s":
            console.log(event.key)
            move_left = false;
            move_right = false;
            move_forward = false;
            move_backward = true;
            jump = false;
            break
        case "stop":
            console.log(event.key)
            move_left = false;
            move_right = false;
            move_forward = false;
            move_backward = false;
            jump = true;
            break

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

    if (move_forward === true) {
        player.position.z -= 0.09 * deltaTime;
    }
    
    if(move_backward === true) {
        player.position.z += 0.09 * deltaTime
    } 
    else {
        player.position.x += 0 * deltaTime
        player.position.y += 0 * deltaTime
        player.position.z += 0 * deltaTime    
    }
    //console.log(move_left, move_right, move_forward, move_backward)

    // if (player.position.y > 0) { 
    // // console.log(player.position.y)
    //     applyGravity = true;
    // } else {
    // // console.log(player.position.y )
    //     applyGravity = false;
    // }
}

export default player_controller

