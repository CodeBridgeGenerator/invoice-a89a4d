import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";


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

const ReceiptsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [paymentID, setPaymentID] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [paymentID], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.receiptDetails)) {
                error["receiptDetails"] = `Receipt Details field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.discount)) {
                error["discount"] = `Discount field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.totalAmount)) {
                error["totalAmount"] = `TotalAmount field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            receiptID: _entity?.receiptID,paymentID: _entity?.paymentID?._id,dateIssued: _entity?.dateIssued,receiptDetails: _entity?.receiptDetails,discount: _entity?.discount,totalAmount: _entity?.totalAmount,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("receipts").create(_data);
        const eagerResult = await client
            .service("receipts")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "paymentID",
                    service : "payments",
                    select:["paymentID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Receipts updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Receipts" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount payments
                    client
                        .service("payments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePaymentsId } })
                        .then((res) => {
                            setPaymentID(res.data.map((e) => { return { name: e['paymentID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Payments", type: "error", message: error.message || "Failed get payments" });
                        });
                }, []);

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

    const paymentIDOptions = paymentID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Receipts" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="receipts-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptID">Receipt ID:</label>
                <InputText id="receiptID" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptID} onChange={(e) => setValByKey("receiptID", e.target.value)}  />
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
                <label htmlFor="paymentID">Payment ID:</label>
                <Dropdown id="paymentID" value={_entity?.paymentID?._id} optionLabel="name" optionValue="value" options={paymentIDOptions} onChange={(e) => setValByKey("paymentID", {_id : e.value})}  />
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
                <label htmlFor="dateIssued">Date Issued:</label>
                <Calendar id="dateIssued"  value={_entity?.dateIssued ? new Date(_entity?.dateIssued) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dateIssued", new Date(e.target.value))} showIcon showButtonBar  />
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discount">Discount:</label>
                <InputText id="discount" className="w-full mb-3 p-inputtext-sm" value={_entity?.discount} onChange={(e) => setValByKey("discount", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discount"]) ? (
              <p className="m-0" key="error-discount">
                {error["discount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalAmount">TotalAmount:</label>
                <InputText id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) ? (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
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

export default connect(mapState, mapDispatch)(ReceiptsCreateDialogComponent);
