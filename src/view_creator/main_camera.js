import * as THREE from 'three';


class main_camera {

    constructor(positionX, positionY, positionZ) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;
    }

    createCamera = (sizes) => {
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
        camera.position.x = this.positionX
        camera.position.y = this.positionY
        camera.position.z = this.positionZ
        return camera
    }
}

export default main_camera