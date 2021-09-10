import bcrypt from 'bcrypt';
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
} from 'sequelize';
import sequelize from '@src/db/config';
import Address from '@src/models/address.model';
import Token from '@src/models/token.model';
import Role from '@src/models/role.model';

interface RoomAttributes {
  id: number;
  roomType: string;
  hourlyRate: number;
  weekdayPercent: number;
  weekendPercent: number;
  quantity: number;
  available: number;
  isArchived: boolean;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface RoomCreationAttributes extends Optional<RoomAttributes, 'id'> {}

class Room
  extends Model<RoomAttributes, RoomCreationAttributes>
  implements RoomAttributes
{
  public id!: number;
  public roomType!: string;
  public hourlyRate!: number;
  public weekdayPercent!: number;
  public weekendPercent!: number;
  public quantity!: number;
  public available!: number;
  public isArchived!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Constraint - SequelizeUniqueConstraintError
      set(value: string) {
        this.setDataValue('roomType', value.trim());
      },
      field: 'room_type',
    },
    hourlyRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'hourly_rate',
    },
    weekdayPercent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'weekday_percent',
      validate: {
        max: 20,
      },
    },
    weekendPercent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'weekend_percent',
      validate: {
        max: 20,
      },
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 1,
    },
    available: {
      type: DataTypes.NUMBER,
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_archived',
    },
  },
  {
    sequelize, // We need to pass the connection instance
    tableName: 'rooms',
    createdAt: true,
    updatedAt: true,
  }
);

Room.beforeCreate((room, options) => {
  room.available = room.quantity;
});

export default Room;
