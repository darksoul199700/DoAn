import { Repository, EntityRepository } from "typeorm";
import { UsersNotification } from "./users-notification.entity";


@EntityRepository(UsersNotification)
export class UsersNotificationRepository extends Repository<UsersNotification>{}