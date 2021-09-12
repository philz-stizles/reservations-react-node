import { DataTypes, Model, Optional } from 'sequelize';
import db from '@src/db';

interface TokenAttributes {
  id: number;
  token: string;
}

// Some attributes are optional in `Token.build` and `Token.create` calls
interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

class Token
  extends Model<TokenAttributes, TokenCreationAttributes>
  implements TokenAttributes
{
  public id!: number;
  public token!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: db.sequelize, // We need to pass the connection instance
    timestamps: true,
    modelName: 'Token', // We need to choose the model name
    tableName: 'tokens',
  }
);

export default Token;
