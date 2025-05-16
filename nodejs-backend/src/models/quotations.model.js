
    module.exports = function (app) {
        const modelName = 'quotations';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationID: { type: Number, required: false, max: 10000000 },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
quotationDate: { type: Date, required: false },
status: { type:  String , required: true },
totalAmount: { type: Number, required: false, max: 10000000 },
quotationItems: { type: Schema.Types.ObjectId, ref: "services" },

            
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