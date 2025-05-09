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

const PaymentsCreateDialogComponent = (props) => {
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
          
            if (_.isEmpty(_entity?.paymentID)) {
                error["paymentID"] = `Payment ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.receiptID)) {
                error["receiptID"] = `Receipt ID field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.dateIssued)) {
                error["dateIssued"] = `Date Issued field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.receiptDetails)) {
                error["receiptDetails"] = `Receipt Details field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            paymentID: _entity?.paymentID,receiptID: _entity?.receiptID,dateIssued: _entity?.dateIssued,receiptDetails: _entity?.receiptDetails,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("payments").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Payments created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Payments" });
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
        <Dialog header="Create Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentID">Payment ID:</label>
                <InputText id="paymentID" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentID} onChange={(e) => setValByKey("paymentID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentID"]) ? (
              <p className="m-0" key="error-paymentID">
                {error["paymentID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptID">Receipt ID:</label>
                <InputText id="receiptID" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptID} onChange={(e) => setValByKey("receiptID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptID"]) ? (
              <p className="m-0" key="error-receiptID">
                {error["receiptID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateIssued">Date Issued:</label>
                <InputText id="dateIssued" className="w-full mb-3 p-inputtext-sm" value={_entity?.dateIssued} onChange={(e) => setValByKey("dateIssued", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateIssued"]) ? (
              <p className="m-0" key="error-dateIssued">
                {error["dateIssued"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptDetails">Receipt Details:</label>
                <InputText id="receiptDetails" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptDetails} onChange={(e) => setValByKey("receiptDetails", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptDetails"]) ? (
              <p className="m-0" key="error-receiptDetails">
                {error["receiptDetails"]}
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

export default connect(mapState, mapDispatch)(PaymentsCreateDialogComponent);
