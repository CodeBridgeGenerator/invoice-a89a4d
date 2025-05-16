
    module.exports = function (app) {
        const modelName = 'payments';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            paymentID: { type:  String , required: true },
paymentMethod: { type:  String , required: true, maxLength: null },
dateIssued: { type:  String , required: true },
totalAmount: { type:  String , required: true, maxLength: null },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices" },
paymentStatus: { type:  String , required: true, minLength: null, maxLength: null },

            
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