import * as THREE from 'three';

class simple_shape {

    constructor() {
        this.material = new THREE.MeshLambertMaterial({
            color: '#F1B21F'
        })
        this.box_geometry = (width, height, depth) => {
            return new THREE.BoxGeometry(width, height, depth);
        } 
    }

    box_instance = (width, height, depth) => {
        console.log('box instance called', width, height, depth)
        const box = new THREE.Mesh(
            this.box_geometry(width, height, depth), this.material
        );
        return box;

    }
}

export default simple_shape;