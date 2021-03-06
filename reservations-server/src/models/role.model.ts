import { DataTypes, Model, Optional } from 'sequelize';
import db from '@src/db';
import Permission from './permission.model';

interface RoleAttributes {
  id: number;
  name: string;
  description: string;
  isArchived: boolean;
}

// Some attributes are optional in `Role.build` and `Role.create` calls
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public isArchived!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
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
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    timestamps: true,
    modelName: 'Role', // We need to choose the model name
    tableName: 'roles',
  }
);

Role.belongsToMany(Permission, {
  through: 'rolePermissions',
  foreignKey: 'role_id',
});
Permission.belongsToMany(Role, {
  through: 'rolePermissions',
  foreignKey: 'permissions_id',
});

export default Role;
