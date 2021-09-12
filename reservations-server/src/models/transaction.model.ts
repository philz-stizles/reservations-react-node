import { DataTypes, Model, Optional } from 'sequelize';
import db from '@src/db';

interface TransactionAttributes {
  id: number;
  name: string;
  description: string;
  isArchived: boolean;
}

// Some attributes are optional in `Transaction.build` and `Transaction.create` calls
interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, 'id'> {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public isArchived!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
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
    modelName: 'Transaction', // We need to choose the model name
    tableName: 'transactions',
  }
);

export default Transaction;
