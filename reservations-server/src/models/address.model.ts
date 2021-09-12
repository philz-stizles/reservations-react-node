import { DataTypes, Model, Optional } from 'sequelize';
import db from '@src/db';

interface AddressAttributes {
  id: number;
  userId: number;
  address: string;
  city: string;
  state: string;
  code: string;
  country: string;
  isPrimary: boolean;
}

// Some attributes are optional in `Address.build` and `Address.create` calls
interface AddressCreationAttributes extends Optional<AddressAttributes, 'id'> {}

class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public userId!: number;
  public address!: string;
  public city!: string;
  public state!: string;
  public code!: string;
  public country!: string;
  public isPrimary!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    createdAt: true,
    updatedAt: false,
    modelName: 'Address', // We need to choose the model name
    tableName: 'addresses',
  }
);

export default Address;
