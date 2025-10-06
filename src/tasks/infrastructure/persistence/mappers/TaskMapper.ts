import {Task} from '../../../domain/Task';
import {TaskOrmEntity} from '../entities/TaskOrmEntity';

export class TaskMapper {
  public static toDomain(entity: TaskOrmEntity): Task {
      return new Task({
          id: entity.id,
          title: entity.title,
          description: entity.description,
          status: entity.status as 'pending' | 'in_progress' | 'completed', // Pasa el status
          priority: entity.priority as 'low' | 'medium' | 'high',
          dueDate: entity.dueDate,
          createdBy: entity.createdById, // Usa el ID del creador
          assignedTo: entity.assignedToId, // Usa el ID de la persona asignada
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
      });
  }

  public static toEntity(domain: Task): TaskOrmEntity {

    const ormEntity = new TaskOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.title = domain.title;
    ormEntity.description = domain.description;
    ormEntity.status = domain.status;
    ormEntity.priority = domain.priority;
    ormEntity.dueDate = domain.dueDate;
    ormEntity.createdById = domain.createdBy;
    ormEntity.assignedToId = domain.assignedTo; // Puede ser null
    ormEntity.createdAt = domain.createdAt || new Date();
    ormEntity.updatedAt = domain.updatedAt || new Date();

    return ormEntity;
  }
}