
    module.exports = function (app) {
        const modelName = 'document_items';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            documentType: { type:  String , minLength: null, maxLength: 150, index: true, trim: true },
documentID: { type:  String , required: true, minLength: null, maxLength: null },
documentItems: { type: Schema.Types.ObjectId, ref: "services" },
units: { type:  String , required: true, minLength: null, maxLength: null },
itemType: { type:  String , required: true, minLength: null, maxLength: null },
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