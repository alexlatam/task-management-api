"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
class Address {
    constructor(props) {
        this.addressLine1 = props.addressLine1;
        this.addressLine2 = props.addressLine2;
        this.city = props.city;
        this.stateOrProvince = props.stateOrProvince;
        this.postalCode = props.postalCode;
        this.country = props.country;
    }
}
exports.Address = Address;
