import * as THREE from 'three'



class simple_shape {

    constructor() {
        this.material = (color) => { 
            return new THREE.MeshLambertMaterial({ color: color })
        }
        this.box_geometry = (width, height, depth) => {
            return new THREE.BoxGeometry(width, height, depth)
        } 
    }

    box_instance = (width, height, depth, color, x, y, z) => {
        
        const box = new THREE.Mesh(
            this.box_geometry(width, height, depth), this.material(color)
        );
        box.position.x = x;
        box.position.y = y;
        box.position.z = z;
        
        return box

    }
}

export default simple_shape