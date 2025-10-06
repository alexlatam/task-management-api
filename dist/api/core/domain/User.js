"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.phoneNumber = props.phoneNumber;
        this.address = props.address;
        this.role = props.role;
        // Asignar valores generados si se proporcionan
        if (props.createdAt)
            this.createdAt = props.createdAt;
        if (props.updatedAt)
            this.updatedAt = props.updatedAt;
    }
    // getters
    getName() {
        return this.name;
    }
}
exports.User = User;
