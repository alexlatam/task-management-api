import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Definimos una clase para la dirección para mantener el código limpio y tipado.
export class AddressOrmEntity {
  @Column()
  addressLine1!: string;

  @Column({ nullable: true }) // Hacemos la línea 2 opcional
  addressLine2!: string;

  @Column()
  city!: string;

  @Column()
  stateOrProvince!: string;

  @Column()
  postalCode!: string;

  @Column()
  country!: string;
}

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phoneNumber!: string;

  // Usamos @Column con tipo 'jsonb' para guardar el objeto de dirección.
  // La propiedad 'transformer' no es estrictamente necesaria aquí pero es útil para lógicas complejas.
  // Por simplicidad, la almacenaremos como un objeto simple.
  @Column(() => AddressOrmEntity)
  address!: AddressOrmEntity;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user'
  })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}