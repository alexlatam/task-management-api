export class Task {
    public readonly id: string;
    public title: string;
    public description: string;
    public status: 'pending' | 'in_progress' | 'completed';
    public priority: 'low' | 'medium' | 'high';
    public dueDate: Date;
    public assignedTo: string | null; // Puede ser un string (UUID) o null
    public createdBy: string; // UUID del usuario creador
    public readonly createdAt: Date;
    public updatedAt: Date;

    constructor(props: {
        id: string;
        title: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
        createdBy: string;
        dueDate: Date;
        status?: 'pending' | 'in_progress' | 'completed';
        assignedTo?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.status = props.status ?? 'pending';
        this.priority = props.priority;
        this.dueDate = props.dueDate;
        this.createdBy = props.createdBy;
        this.assignedTo = props.assignedTo ?? null;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
    }
}