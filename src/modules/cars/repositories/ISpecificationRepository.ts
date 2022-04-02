import { Specification } from '../entities/Specification';

interface ICreationSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreationSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;

}

export { ISpecificationsRepository, ICreationSpecificationDTO };
