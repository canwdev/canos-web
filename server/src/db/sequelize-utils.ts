import {Op} from 'sequelize'

/**
 * 生成 Sequelize where 查询
 * Model.findAll({ where: {...searchGenerator(fields)} })
 * @param fields=[{label: 'title', value: title}]
 */
export function searchGenerator(fields): any {
  const ret = []
  fields.forEach((item) => {
    ret.push({
      [item.label]: {
        [Op.like]: `%${item.value}%`,
      },
    })
  })
  return {[Op.and]: ret}
}

export function createOrUpdate(Model, update, where) {
  return Model.findOne({where: where}).then(function (obj) {
    // update
    if (obj) return obj.update(update)
    // insert
    return Model.create({
      ...where,
      ...update,
    })
  })
}
