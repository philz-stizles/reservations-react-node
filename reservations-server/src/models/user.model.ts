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

// Define all the attributes in the User model
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  confirmPassword?: string;
  passwordChangedAt?: Date;
  passwordResetToken: string | null;
  passwordResetTokenExpiresAt?: number | null;
  isActive: boolean;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public fullName!: string;
  public username!: string;
  public email!: string;
  public avatar!: string | undefined;
  public password!: string | undefined;
  public confirmPassword!: string | undefined;
  public passwordChangedAt!: Date | undefined;
  public passwordResetTokenExpiresAt!: number | null | undefined;
  public passwordResetToken!: string | null;
  public isActive!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getAddresses!: HasManyGetAssociationsMixin<Address>; // Note the null assertions!
  public addAddress!: HasManyAddAssociationMixin<Address, number>;
  public hasAddress!: HasManyHasAssociationMixin<Address, number>;
  public countAddresses!: HasManyCountAssociationsMixin;
  public createAddress!: HasManyCreateAssociationMixin<Address>;

  public getTokens!: HasManyGetAssociationsMixin<Token>; // Note the null assertions!
  public addToken!: HasManyAddAssociationMixin<Token, number>;
  public hasToken!: HasManyHasAssociationMixin<Token, number>;
  public countTokens!: HasManyCountAssociationsMixin;
  public createToken!: HasManyCreateAssociationMixin<Token>;

  public getRoles!: HasManyGetAssociationsMixin<Role>; // Note the null assertions!
  public addRole!: HasManyAddAssociationMixin<Role, number>;
  public hasRole!: HasManyHasAssociationMixin<Role, number>;
  public countRoles!: HasManyCountAssociationsMixin;
  public createRole!: HasManyCreateAssociationMixin<Role>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly addresses?: Address[]; // Note this is optional since it's only populated when explicitly requested in code
  public readonly tokens?: Token[]; // Note this is optional
  public readonly roles?: Address[]; // Note this is optional

  public static associations: {
    addresses: Association<User, Address>;
    tokens: Association<User, Token>;
    roles: Association<User, Role>;
  };
}

// Validations are checks performed in the Sequelize level, in pure JavaScript.
// They can be arbitrarily complex if you provide a custom validator function, or can be one of the built -in
// validators offered by Sequelize.If a validation fails, no SQL query will be sent to the database at all.
//
// Constraints are rules defined at SQL level. The most basic example of constraint is an Unique Constraint.
// If a constraint check fails, an error will be thrown by the database and Sequelize will forward this error
// to JavaScript(in this example, throwing a SequelizeUniqueConstraintError).Note that in this case,
// the SQL query was performed, unlike the case for validations.
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, // Constraint - SequelizeUniqueConstraintError
      set(value: string) {
        this.setDataValue('username', value.trim());
      },
    },
    // Creating two objects with the same value will throw an error. The unique property can be either a
    // boolean, or a string. If you provide the same string for multiple columns, they will form a
    // composite unique key.
    // uniqueOne: { type: DataTypes.STRING, unique: 'compositeIndex' },
    // uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Both a Validator & Constraint
      unique: true, // Constraint
      validate: {
        isEmail: true,
      },
      set(value: string) {
        this.setDataValue('email', value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [6, 50],
      },
      // async set(value) {
      //   /// Generate salt
      //   const salt = await bcrypt.genSalt(12);

      //   // Encrypt password
      //   const hashedPassword = await bcrypt.hash(value + this.username, salt);
      //   this.setDataValue('password', hashedPassword);

      //   // Delete confirmPassword field
      //   // this.setDataValue('confirmPassword', undefined);
      // },
    },
    passwordChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'password_changed_at',
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'password_reset_token',
    },
    passwordResetTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'password_reset_token_expires_at',
      // // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
      comment: 'This is a column name that has a comment',
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'default.jpg',
    },
    // tokens: [{ token: { type: String, required: true } }],
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    sequelize, // We need to pass the connection instance
    tableName: 'users',
    createdAt: true,
    updatedAt: true,
    // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
    // indexes: [{ unique: true, fields: ['someUnique'] }],
    // Model-wide validation
    // validate: {
    // bothCoordsOrNone() {
    //   if ((this.latitude === null) !== (this.longitude === null)) {
    //     throw new Error('Either both latitude and longitude, or neither!');
    //   }
    // },
    // },
  }
);

User.beforeCreate(async (user, options) => {
  /// Generate salt
  const salt = await bcrypt.genSalt(12);

  // Encrypt password
  const hashedPassword = await bcrypt.hash(user.password + user.username, salt);
  user.password = hashedPassword;
});

// Here we associate which actually populates out pre-declared `association` static and other methods.
User.hasMany(Address, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'addresses', // this determines the name in `associations`!
});
Address.belongsTo(User, { targetKey: 'id' });

User.hasMany(Token, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'tokens', // this determines the name in `associations`!
});
Token.belongsTo(User, { targetKey: 'id' });

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

export default User;
