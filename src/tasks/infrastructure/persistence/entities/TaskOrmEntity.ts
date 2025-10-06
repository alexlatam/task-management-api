
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import {UserOrmEntity} from "../../../../users/infrastructure/persistence/entities/UserOrmEntity";

@Entity({ name: 'tasks' })
export class TaskOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column('text') // Usar 'text' es mejor para descripciones largas
    description!: string;

    @Column({
        type: 'enum',
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    })
    status!: string;

    @Column({
        type: 'enum',
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    })
    priority!: string;

    @Column({ type: 'timestamp with time zone' }) // Más preciso que un timestamp simple
    dueDate!: Date;

    // --- Relaciones con la tabla de Usuarios ---

    // ID del usuario al que se le asignó la tarea (puede ser nulo)
    @Column({ type: 'uuid', nullable: true })
    assignedToId!: string | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'assignedToId' }) // Especifica la columna de la llave foránea
    assignedTo!: UserOrmEntity | null;


    // ID del usuario que creó la tarea (requerido)
    @Column({ type: 'uuid' })
    createdById!: string;

    @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' }) // Si el usuario se borra, sus tareas también
    @JoinColumn({ name: 'createdById' })
    createdBy!: UserOrmEntity;

    // --- Timestamps Automáticos ---

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}