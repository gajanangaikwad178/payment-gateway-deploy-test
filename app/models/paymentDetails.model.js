const PaymentDetailsModel = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define(
    "payment_details",
    {
      payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mercid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderid: {  
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ru: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clientid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentTimestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      paymentStatus: {
        type: DataTypes.ENUM('pending', 'failed', 'success'),
        defaultValue: 'pending',
        allowNull: false,
      },
     
      orderIdGenerateStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      jwsFunResponse: {
        type: DataTypes.TEXT,  // Use TEXT for potentially long responses
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "payment_details",
      timestamps: false,
    }
  );

  return PaymentDetails;
};

export default PaymentDetailsModel;
