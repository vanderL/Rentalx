import { getRepository, Repository } from 'typeorm';

import { AppError } from '@errors/AppError';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICreationSpecificationDTO, ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Repository<Specification>;

  constructor() {
    this.specifications = getRepository(Specification);
  }

  async create({ description, name }: ICreationSpecificationDTO): Promise<Specification> {
    const specification = this.specifications.create({
      name,
      description,
    });

    await this.specifications.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.findOne(
      {
        name,
      },
    );
    return specification;
  }

  async findByids(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specifications.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository };
