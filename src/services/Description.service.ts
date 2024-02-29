import { AppDataSource } from "../db/DataSource";
import { Description } from "../entities/Description.entity";

const repo = AppDataSource.getRepository(Description);

const save = async (d: Omit<Description, "id">) => {
  const savedEntity = await repo.findOneBy({
    name: d.name,
    release: d.release,
  });
  if (savedEntity) {
    return savedEntity;
  }

  return await repo.save({
    name: d.name,
    release: d.release,
    value: d.value,
  });
};

const find = async (name: string, year: number) => {
  return repo.findOneBy({ name, release: year });
};

export default { save, find };
