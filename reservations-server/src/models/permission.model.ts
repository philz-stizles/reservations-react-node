import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '@src/db/config';

class Role extends Model {}

Role.init(
  {
    // Model attributes are defined here
    // status: RoleStatus,
    hourly_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expected_checkin_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    expected_checkout_time: {
      type: DataTypes.DATE,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weekday_percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weekend_percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    timestamps: true,
    modelName: 'Role', // We need to choose the model name
    tableName: 'Roles',
  }
);

export default Role;
