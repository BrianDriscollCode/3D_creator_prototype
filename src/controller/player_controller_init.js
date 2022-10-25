
class player_controller_init {
    
    constructor() {
        this.simple_controller = (player_input, player_body, delta) => {

            switch (player_input) {
                case 'a':
                    console.log('a', delta)
                    player_body.position.x -= 0.01;
                    break
                case 'd':
                    console.log('d')
                    player_body.position.x += 0.01;
                    break
                case 'w':
                    console.log('w')
                    player_body.position.y += 0.01;
                    break
                case 's':
                    console.log('s')
                    player_body.position.y -= 0.01;
                    break
                default: 
                    break
            }
    
        }

    }

}

export default player_controller_init;