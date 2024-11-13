import { User } from './user';
import { Dog } from './dog';

export class AdoptionRequest {
  id: number = 0;
  user: User|undefined;
  dog: Dog|undefined;
  status: string = '';
  message: string = '';
}
