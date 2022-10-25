import * as THREE from 'three';

//What makes a sprite? 
//Body
// - animations (Secondary)
// - collision (later)
//Controller
// - move (Primary)
// - interaction (later)

import simple_shape from '../object_generation/simple_shape';

class sprite {

    constructor() {
        //temporary way to create body
        this.createBody = () => {

            const simple_shape_factory = new simple_shape
        
            let character_body = simple_shape_factory.sphere_instance(15, 32, 16, '#f43f5e', -40, 0, 0)
        
            return character_body;
        }

        this.body = this.createBody()
    }

    
    


}

export default sprite;