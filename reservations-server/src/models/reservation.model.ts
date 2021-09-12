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
  Sequelize,
} from 'sequelize';
import db from '@src/db';
import Room from './room.model';

export enum ReservationStatus {
  // When the order has been created, but the
  // ticket it is trying to order has not been reserved
  Created = 'created',

  // The ticket the order is trying to reserve has already
  // been reserved, or when the user has cancelled the order.
  // The order expires before payment
  Cancelled = 'cancelled',

  // The order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // The order has reserved the ticket and the user has
  // provided payment successfully
  Complete = 'complete',
}

// We recommend you declare an interface for the attributes, for stricter typechecking
interface ReservationAttributes {
  id: number;
  status?: ReservationStatus;
  expectedCheckInTime: Date;
  expectedCheckOutTime: Date;
}

interface ReservationCreationAttributes
  extends Optional<ReservationAttributes, 'id' | 'status'> {}

class Reservation
  extends Model<ReservationAttributes, ReservationCreationAttributes>
  implements ReservationAttributes
{
  public id!: number;
  public status!: ReservationStatus;
  public expectedCheckInTime!: Date;
  public expectedCheckOutTime!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRooms!: HasManyGetAssociationsMixin<Room>; // Note the null assertions!
  public addRoom!: HasManyAddAssociationMixin<Room, number>;
  public hasRoom!: HasManyHasAssociationMixin<Room, number>;
  public countRooms!: HasManyCountAssociationsMixin;
  public createRoom!: HasManyCreateAssociationMixin<Room>;

  public readonly rooms?: Room[];

  public static associations: {
    rooms: Association<Reservation, Room>;
  };
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [Object.values(ReservationStatus)],
      },
      defaultValue: ReservationStatus.Created,
    },
    expectedCheckInTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expected_check_in_time',
      validate: {
        isAfter: new Date().toISOString(),
      },
    },
    expectedCheckOutTime: {
      type: DataTypes.DATE,
      field: 'expected_check_out_time',
    },
  },
  {
    // Other model options go here
    timestamps: true,
    sequelize: db.sequelize,
    modelName: 'Reservation', // We need to choose the model name
    tableName: 'reservations',
  }
);

Reservation.belongsToMany(Room, {
  through: 'reservationRooms',
  foreignKey: 'reservation_id',
});
Room.belongsToMany(Reservation, {
  through: 'reservationRooms',
  foreignKey: 'room_id',
});

export default Reservation;
