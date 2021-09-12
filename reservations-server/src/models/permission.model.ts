import { DataTypes, Model, Optional } from 'sequelize';
import db from '@src/db';

interface PermissionAttributes {
  id: number;
  name: string;
  description: string;
}

// Some attributes are optional in `Permission.build` and `Permission.create` calls
interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'id'> {}

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(70),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    createdAt: true,
    updatedAt: false,
    modelName: 'Permission', // We need to choose the model name
    tableName: 'permissions',
  }
);

export default Permission;
