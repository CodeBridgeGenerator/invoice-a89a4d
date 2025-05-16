
    module.exports = function (app) {
        const modelName = 'payment_terms';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true },
description: { type:  String , required: true },
dueDays: { type:  String , required: true },
paymentTermID: { type:  String , maxLength: 150, index: true, trim: true },
earlyPaymentDiscount: { type:  String , required: true },
latePenalty: { type:  String , required: true },

            
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