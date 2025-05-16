
    module.exports = function (app) {
        const modelName = 'invoices';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceID: { type:  String , required: true, minLength: null, maxLength: null },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
invoiceDate: { type:  String , required: true, maxLength: null },
dueDate: { type:  String , required: true },
totalAmount: { type:  String , required: true, maxLength: null },
status: { type:  String , required: true, maxLength: null },
invoiceItems: { type: Schema.Types.ObjectId, ref: "services" },
paymentTermsID: { type: Schema.Types.ObjectId, ref: "payment_terms" },
remarks: { type:  String , required: true },

            
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