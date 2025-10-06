export class CreateUserDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: string;
    readonly role: 'admin' | 'user';
    readonly address: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        stateOrProvince: string;
        postalCode: string;
        country: string;
    };

    constructor(props: {
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        role: 'admin' | 'user';
        address: {
            addressLine1: string;
            addressLine2?: string;
            city: string;
            stateOrProvince: string;
            postalCode: string;
            country: string;
        };
    }) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.phoneNumber = props.phoneNumber;
        this.role = props.role;
        this.address = props.address;
    }
}