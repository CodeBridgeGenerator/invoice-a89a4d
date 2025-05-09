import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const PaymentsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            paymentID: _entity?.paymentID,
receiptID: _entity?.receiptID,
dateIssued: _entity?.dateIssued,
receiptDetails: _entity?.receiptDetails,
        };

        setLoading(true);
        try {
            
        const result = await client.service("payments").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info payments updated successfully" });
        props.onEditResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
        <Dialog header="Edit Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentID">Payment ID:</label>
                <InputText id="paymentID" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentID} onChange={(e) => setValByKey("paymentID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentID"]) && (
              <p className="m-0" key="error-paymentID">
                {error["paymentID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptID">Receipt ID:</label>
                <InputText id="receiptID" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptID} onChange={(e) => setValByKey("receiptID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptID"]) && (
              <p className="m-0" key="error-receiptID">
                {error["receiptID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dateIssued">Date Issued:</label>
                <InputText id="dateIssued" className="w-full mb-3 p-inputtext-sm" value={_entity?.dateIssued} onChange={(e) => setValByKey("dateIssued", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dateIssued"]) && (
              <p className="m-0" key="error-dateIssued">
                {error["dateIssued"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptDetails">Receipt Details:</label>
                <InputText id="receiptDetails" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptDetails} onChange={(e) => setValByKey("receiptDetails", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptDetails"]) && (
              <p className="m-0" key="error-receiptDetails">
                {error["receiptDetails"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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
