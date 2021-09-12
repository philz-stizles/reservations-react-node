import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
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
import db from '@src/db';
import Address from './address.model';
import Token from './token.model';
import Role from './role.model';
import Transaction from './transaction.model';
import Reservation from './reservation.model';

// Define all the attributes in the User model
interface UserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  confirmPassword?: string;
  passwordChangedAt: Date | undefined;
  passwordResetToken?: string | undefined;
  passwordResetTokenExpiresAt?: number | undefined;
  primaryAddress?: number;
  isActive?: boolean;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'passwordChangedAt'> {}

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
  public passwordResetTokenExpiresAt!: number | undefined;
  public passwordResetToken!: string | undefined;
  public primaryAddress?: number;
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

  public getReservations!: HasManyGetAssociationsMixin<Reservation>; // Note the null assertions!
  public addReservation!: HasManyAddAssociationMixin<Reservation, number>;
  public hasReservation!: HasManyHasAssociationMixin<Reservation, number>;
  public countReservations!: HasManyCountAssociationsMixin;
  public createReservation!: HasManyCreateAssociationMixin<Reservation>;

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
  public readonly addresses?: Address[];
  public readonly reservations?: Reservation[]; // Note this is optional since it's only populated when explicitly requested in code
  public readonly tokens?: Token[]; // Note this is optional
  public readonly roles?: Role[]; // Note this is optional

  public static associations: {
    addresses: Association<User, Address>;
    reservations: Association<User, Reservation>;
    tokens: Association<User, Token>;
    roles: Association<User, Role>;
  };

  static async findByAuthentication(
    email: string,
    password: string
  ): Promise<void | any> {
    // You can use arrow functions here as we will not be requiring
    // the 'this' reference
    // eslint-disable-next-line no-use-before-define
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await user.comparePassword(password);
    // console.log(isMatch)
    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }

    return user;
  }

  async comparePassword(password: string) {
    try {
      const isMatch = await bcrypt.compare(password, this.password as string);
      return isMatch;
    } catch (error: any | unknown) {
      console.log(error.message);
      return false;
    }
  }

  isPasswordChangedAfterTokenGen(jwtTimestamp: number): boolean {
    if (!this.passwordChangedAt) return false;
    const passwordChangedAtInMilliseconds = this.passwordChangedAt.getTime();
    const passwordChangedAtInSeconds = parseInt(
      `${passwordChangedAtInMilliseconds / 1000}`,
      10
    );

    return passwordChangedAtInSeconds > jwtTimestamp;
  }

  createPasswordResetToken(): string {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;

    return resetToken;
  }

  async generateAuthToken() {
    const token = jwt.sign(
      { id: this.id },
      process.env.JWT_SECRET as string,
      { expiresIn: +(process.env.JWT_SECRET_EXPIRES_IN as string) } // This has been defined in
      // env variables in seconds 1800 => 30mins
      // + is added to convert it from string to an integer as it will assume milliseconds
      // if string is detected
    );

    // Store current login in DB, this strategy enable a user to login from multiple devices and stay logged unless
    // the user logs out which will logout the current requesting device
    // user.tokens = user.tokens.concat({ token });
    // await user.save();

    // Return generated token
    return token;
  }
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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
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
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true, // Constraint - SequelizeUniqueConstraintError
      set(value: string) {
        // this.setDataValue('username', value.trim());
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
      type: DataTypes.STRING(120),
      allowNull: false,
      // is: /^[0-9a-f]{64}$/i,
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
      allowNull: false,
      defaultValue: 'default.jpg',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    primaryAddress: {
      type: DataTypes.INTEGER,
      field: 'primary_address',
    },
  },
  {
    sequelize: db.sequelize, // We need to pass the connection instance
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
  const hashedPassword = await bcrypt.hash(user.password as string, salt);
  user.password = hashedPassword;
});

// Here we associate which actually populates out pre-declared `association` static and other methods.
// Addresses - one-to-many.
User.hasMany(Address, {
  foreignKey: 'user_id', // this determines the name in `associations`!
  as: 'addresses',
});
Address.belongsTo(User, { foreignKey: 'user_id' });

// Tokens - one-to-many.
User.hasMany(Token, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'tokens', // this determines the name in `associations`!
});
Token.belongsTo(User, { targetKey: 'id', foreignKey: 'user_id' });

// Reservations - one-to-many.
User.hasMany(Reservation, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'reservations', // this determines the name in `associations`!
});
Reservation.belongsTo(User, { targetKey: 'id', foreignKey: 'user_id' });

// Transactions - one-to-many.
User.hasMany(Transaction, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'transactions', // this determines the name in `associations`!
});
Transaction.belongsTo(User, { targetKey: 'id', foreignKey: 'user_id' });

User.belongsToMany(Role, { through: 'userRoles' });
Role.belongsToMany(User, { through: 'userRoles' });

export default User;

// schema.pre('save', async function (next) {
//   const user = this as IUserDocument;
//   // If password was not modified, do not encrypt
//   if (!user.isModified('password') || user.isNew) return next(); // When you change password or create a new user,
//   // set passwordChange date

//   user.passwordChangedAt = new Date(Date.now() - 1000);

//   return next();
// });

// schema.pre(/^find/, async next => {
//   const user = this as IUserDocument;

//   // this points to the current query
//   user.find({ isActive: { $ne: false } }); // Not equal to false is different from is equal to true
//   next();
// });

// schema.methods.toJSON = function () {
//   const user = this as IUserDocument;

//   // Create a JSON representation of the user
//   const userObject = user.toObject();

//   // Remove private data
//   delete userObject.password;
//   delete userObject.tokens;
//   delete userObject.avatar; // Remove avatar here coz the data is large for JSON requests

//   // Return public profile
//   return userObject;
// };
