import * as THREE from 'three'



class simple_shape {

    constructor() {
        this.regular_material = (color) => {
            return new THREE.MeshBasicMaterial( { color: color })
        }
        this.lambert_material = (color) => { 
            return new THREE.MeshLambertMaterial({ color: color })
        }
        this.box_geometry = (width, height, depth) => {
            return new THREE.BoxGeometry(width, height, depth)
        } 
        this.circle_geometry = (radius, width, height) => {
            return new THREE.SphereGeometry(radius, width, height)
        }
    }

    box_instance = (width, height, depth, color, x, y, z) => {
        
        const box = new THREE.Mesh(
            this.box_geometry(width, height, depth), this.lambert_material(color)
        );
        box.position.x = x;
        box.position.y = y;
        box.position.z = z;

        return box

    }

    sphere_instance = (radius, width, height, color, x, y, z) => {

        const sphere = new THREE.Mesh(
            this.circle_geometry(radius, width, height), this.regular_material(color)
        )
        sphere.position.x = x
        sphere.position.y = y
        sphere.position.z = z

        return sphere

    }
}

export default simple_shape