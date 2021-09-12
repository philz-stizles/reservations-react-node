import { DataTypes, Model, Optional } from 'sequelize';
import db from '@src/db';

interface CouponAttributes {
  id: number;
  name: string;
  expiresAt: Date;
  discount: number;
  isArchived: boolean;
}

// Some attributes are optional in `Coupon.build` and `Coupon.create` calls
interface CouponCreationAttributes extends Optional<CouponAttributes, 'id'> {}

class Coupon
  extends Model<CouponAttributes, CouponCreationAttributes>
  implements CouponAttributes
{
  public id!: number;
  public name!: string;
  public expiresAt!: Date;
  public discount!: number;
  public isArchived!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true, // Constraint - SequelizeUniqueConstraintError
      set(value: string) {
        this.setDataValue('name', value.trim());
      },
      validate: {
        len: [6, 10],
      },
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notInThePast(value: Date) {
          if (value.getTime() < new Date().getTime()) {
            throw new Error('expiration time cannot be in the past');
          }
        },
      },
      field: 'expires_at',
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_archived',
    },
  },
  {
    sequelize: db.sequelize, // We need to pass the connection instance
    tableName: 'coupons',
    createdAt: true,
    updatedAt: true,
  }
);

export default Coupon;
