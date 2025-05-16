
    module.exports = function (app) {
        const modelName = 'receipts';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            receiptID: { type:  String , maxLength: 150, index: true, trim: true },
paymentID: { type: Schema.Types.ObjectId, ref: "payments" },
dateIssued: { type: Date, required: false },
receiptDetails: { type:  String , required: true },
discount: { type:  String , required: true },
totalAmount: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };