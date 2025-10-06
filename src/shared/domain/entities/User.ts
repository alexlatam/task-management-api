import {Address} from './Address';

export class User {
    public readonly id: string;
    private name: string;
    private email: string;
    private phoneNumber: string;
    private address: Address;
    private role: 'admin' | 'user'; // Usamos un tipo literal para mayor seguridad
    private createdAt: Date | undefined;
    private updatedAt: Date | undefined;

    constructor(props: {
        id: string,
        name: string;
        email: string;
        phoneNumber: string;
        address: Address;
        role: 'admin' | 'user';
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.phoneNumber = props.phoneNumber;
        this.address = props.address;
        this.role = props.role;
        // Asignar valores generados si se proporcionan
        if (props.createdAt) this.createdAt = props.createdAt;
        if (props.updatedAt) this.updatedAt = props.updatedAt;
    }

    // getters
    public getName(): string {
        return this.name;
    }

    public getEmail() {
        return this.email;
    }

    public getPhoneNumber() {
        return this.phoneNumber;
    }

    public getAddress(): Address {
        return this.address;
    }

    public getRole(): 'admin' | 'user' {
        return this.role;
    }

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }
}