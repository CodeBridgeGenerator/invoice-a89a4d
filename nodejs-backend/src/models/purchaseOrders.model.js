
    module.exports = function (app) {
        const modelName = 'purchase_orders';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationID: { type: Schema.Types.ObjectId, ref: "quotations" },
PODate: { type: Date, required: false },
status: { type:  String , required: true },
remarks: { type:  String , required: true },
POAmount: { type:  String , required: true },

            
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