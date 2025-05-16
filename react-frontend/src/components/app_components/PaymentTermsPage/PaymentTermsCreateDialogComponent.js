import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const PaymentTermsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.name)) {
                error["name"] = `Name field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.description)) {
                error["description"] = `Description field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.dueDays)) {
                error["dueDays"] = `Due Days field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.earlyPaymentDiscount)) {
                error["earlyPaymentDiscount"] = `Early Payment Discount field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.latePenalty)) {
                error["latePenalty"] = `Late Penalty field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            name: _entity?.name,description: _entity?.description,dueDays: _entity?.dueDays,paymentTermID: _entity?.paymentTermID,earlyPaymentDiscount: _entity?.earlyPaymentDiscount,latePenalty: _entity?.latePenalty,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("paymentTerms").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info PaymentTerms created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in PaymentTerms" });
        }
        setLoading(false);
    };

    

    

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create PaymentTerms" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="paymentTerms-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <InputText id="name" className="w-full mb-3 p-inputtext-sm" value={_entity?.name} onChange={(e) => setValByKey("name", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dueDays">Due Days:</label>
                <InputText id="dueDays" className="w-full mb-3 p-inputtext-sm" value={_entity?.dueDays} onChange={(e) => setValByKey("dueDays", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dueDays"]) ? (
              <p className="m-0" key="error-dueDays">
                {error["dueDays"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTermID">Payment Term ID:</label>
                <InputText id="paymentTermID" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTermID} onChange={(e) => setValByKey("paymentTermID", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTermID"]) ? (
              <p className="m-0" key="error-paymentTermID">
                {error["paymentTermID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="earlyPaymentDiscount">Early Payment Discount:</label>
                <InputText id="earlyPaymentDiscount" className="w-full mb-3 p-inputtext-sm" value={_entity?.earlyPaymentDiscount} onChange={(e) => setValByKey("earlyPaymentDiscount", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["earlyPaymentDiscount"]) ? (
              <p className="m-0" key="error-earlyPaymentDiscount">
                {error["earlyPaymentDiscount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="latePenalty">Late Penalty:</label>
                <InputText id="latePenalty" className="w-full mb-3 p-inputtext-sm" value={_entity?.latePenalty} onChange={(e) => setValByKey("latePenalty", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["latePenalty"]) ? (
              <p className="m-0" key="error-latePenalty">
                {error["latePenalty"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(PaymentTermsCreateDialogComponent);
