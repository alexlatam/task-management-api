export class CreateTaskDto {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly priority: 'low' | 'medium' | 'high';
    readonly createdBy: string;
    readonly dueDate: Date;

    constructor(props: {
        id: string;
        title: string;
        description: string;
        priority: 'low' | 'medium' | 'high';
        createdBy: string;
        dueDate: Date;
    }) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.priority = props.priority;
        this.createdBy = props.createdBy;
        this.dueDate = props.dueDate;
    }
}