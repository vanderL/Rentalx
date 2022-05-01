import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreationSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: ICreationSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  findByids(ids: string[]): Promise<Specification[]>;

}

export { ISpecificationsRepository, ICreationSpecificationDTO };
