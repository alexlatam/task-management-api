export class Address {
    readonly addressLine1: string;
    readonly addressLine2?: string|undefined; // La línea 2 es opcional
    readonly city: string;
    readonly stateOrProvince: string;
    readonly postalCode: string;
    readonly country: string;

    constructor(props: {
        addressLine1: string;
        city: string;
        stateOrProvince: string;
        postalCode: string;
        country: string;
        addressLine2?: string; // La línea 2 es opcional
    }) {
        this.addressLine1 = props.addressLine1;
        this.addressLine2 = props.addressLine2;
        this.city = props.city;
        this.stateOrProvince = props.stateOrProvince;
        this.postalCode = props.postalCode;
        this.country = props.country;
    }
}