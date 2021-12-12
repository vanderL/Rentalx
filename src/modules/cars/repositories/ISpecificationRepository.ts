import { Specification } from '../model/Specification';

interface ICreationSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreationSpecificationDTO): void;
  findByName(name: string): Specification;

}

export { ISpecificationsRepository, ICreationSpecificationDTO };
