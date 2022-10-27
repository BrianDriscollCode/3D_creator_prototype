import simple_shape from "../object_generation/simple_shape";
import * as THREE from "three";

class model_builder {

    build_truck = () => {

        const shapeFactory = new simple_shape
        let truck_group = new THREE.Group()

        //Start building parts
        const truck_front = shapeFactory.box_instance(28, 40, 36, '#fbbf24', 100, 0, 0)
        truck_front.position.y += (8 * 8) - 5.2 ;
        truck_front.position.x -= 12
        
        const truck_container= shapeFactory.box_instance(95, 35, 45, '#16a34a', 150, 0, 0)
        truck_container.position.y += 8 * 8;

        //row 1
        const wheel_1 = shapeFactory.cylinder_instance(12, 12, 10, 40, '#4b5563', 40, 0, 0)
        const wheel_2 = shapeFactory.cylinder_instance(12, 12, 10, 40, '#4b5563', 40, 0, 0)
        
        //row 2 
        const wheel_3 = shapeFactory.cylinder_instance(12, 12, 10, 40, '#4b5563', 40, 0, 0)
        const wheel_4 = shapeFactory.cylinder_instance(12, 12, 10, 40, '#4b5563', 40, 0, 0)
        
        //row 3
        const wheel_5 = shapeFactory.cylinder_instance(12, 12, 10, 40, '#4b5563', 40, 0, 0)
        const wheel_6 = shapeFactory.cylinder_instance(12, 12, 10, 40, '#4b5563', 40, 0, 0)
    

        const wheel_height = 8 * 3 + 10 
        const rotate_world_orientation = 1.57
        const row1_wheel_position = 74;
        const row2_wheel_position = 74 + 35;
        const row3_wheel_position = 74 + 70;

        wheel_1.rotation.x += rotate_world_orientation
        wheel_1.position.y += wheel_height
        wheel_1.position.x += row1_wheel_position
        wheel_1.position.z += 15

        wheel_2.rotation.x += rotate_world_orientation
        wheel_2.position.y += wheel_height
        wheel_2.position.x += row1_wheel_position
        wheel_2.position.z += -15

        wheel_3.rotation.x += rotate_world_orientation
        wheel_3.position.y += wheel_height
        wheel_3.position.x += row2_wheel_position
        wheel_3.position.z += 15

        wheel_4.rotation.x += rotate_world_orientation
        wheel_4.position.y += wheel_height
        wheel_4.position.x += row2_wheel_position
        wheel_4.position.z += -15
        
        wheel_5.rotation.x += rotate_world_orientation
        wheel_5.position.y += wheel_height
        wheel_5.position.x += row3_wheel_position
        wheel_5.position.z += 15

        wheel_6.rotation.x += rotate_world_orientation
        wheel_6.position.y += wheel_height
        wheel_6.position.x += row3_wheel_position
        wheel_6.position.z += -15

        truck_group.add(truck_front)
        truck_group.add(truck_container)
        truck_group.add(wheel_1)
        truck_group.add(wheel_2)
        truck_group.add(wheel_3)
        truck_group.add(wheel_4)
        truck_group.add(wheel_5)
        truck_group.add(wheel_6)
        truck_group.position.y += 50

        return truck_group;

    }

}

export default model_builder;