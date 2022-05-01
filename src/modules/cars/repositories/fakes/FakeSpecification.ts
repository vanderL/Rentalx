import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreationSpecificationDTO, ISpecificationsRepository } from '../ISpecificationRepository';

class FakeSpecificationRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ description, name }: ICreationSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name);
  }
  async findByids(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(
      (specification) => ids.includes(specification.id),
    );

    return allSpecifications;
  }
}
export { FakeSpecificationRepository };
