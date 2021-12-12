import { Specification } from '../../model/Specification';
import {
  ICreationSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ICreationSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification;
  }
}

export { SpecificationsRepository };
