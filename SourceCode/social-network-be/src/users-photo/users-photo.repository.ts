import { Repository, EntityRepository } from "typeorm";

import { UsersPhoto } from "./users-photo.entity";

@EntityRepository(UsersPhoto)
export class UsersPhotoRepository extends Repository<UsersPhoto>{}