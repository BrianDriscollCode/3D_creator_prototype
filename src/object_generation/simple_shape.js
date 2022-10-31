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
        this.cylinder_geometry = (radiusTop, radiusBottom, height, radialSegments) => {
            return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
        }
    }

    box_instance = (width, height, depth, color, x, y, z) => {
        
        const box = new THREE.Mesh(
            this.box_geometry(width, height, depth), this.lambert_material(color)
        );
        box.position.x = x;
        box.position.y = y;
        box.position.z = z;
        box.name = "cube"

        return box

    }

    sphere_instance = (radius, width, height, color, x, y, z) => {

        const sphere = new THREE.Mesh(
            this.circle_geometry(radius, width, height), this.regular_material(color)
        )
        const spawnHeight = height - 2;
        sphere.position.x = x
        sphere.position.y = y
        sphere.position.z = z

        return sphere

    }

    cylinder_instance = (radiusTop, radiusBottom, height, radialSegments, color, x, y, z, textureObject) => {

        let cylinder = "";

        if (textureObject === undefined) {
            console.log('undefined texture object')
            cylinder = new THREE.Mesh(
                this.cylinder_geometry(radiusTop, radiusBottom, height, radialSegments), this.lambert_material(color)
            )
        } else {
            console.log('texture object found!', textureObject)
            cylinder = new THREE.Mesh(
                this.cylinder_geometry(radiusTop, radiusBottom, height, radialSegments), textureObject
            )
        }
        
        const spawnHeight = height + 2;
        cylinder.position.x = x;
        cylinder.position.y = y;
        cylinder.position.z = z;
        cylinder.name = "cylinder"

        return cylinder
    }
}

export default simple_shape