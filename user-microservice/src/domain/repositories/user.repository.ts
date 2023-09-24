import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user-entity.model';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Add custom query methods for user management if needed
}