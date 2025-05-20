
    module.exports = function (app) {
        const modelName = 'invoice_items';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceID: { type: Schema.Types.ObjectId, ref: "invoices" },
invoiceItems: { type: Schema.Types.ObjectId, ref: "services" },
units: { type:  String , required: true, minLength: null, maxLength: null },
unitPrice: { type:  String , required: true, minLength: null, maxLength: null },
totalAmount: { type:  String , required: true, minLength: null, maxLength: null },

            
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