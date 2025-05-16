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

const PurchaseOrdersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [quotationID, setQuotationID] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [quotationID], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.status)) {
                error["status"] = `Status field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.remarks)) {
                error["remarks"] = `Remarks field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.POAmount)) {
                error["POAmount"] = `POAmount field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            quotationID: _entity?.quotationID?._id,PODate: _entity?.PODate,status: _entity?.status,remarks: _entity?.remarks,POAmount: _entity?.POAmount,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("purchaseOrders").create(_data);
        const eagerResult = await client
            .service("purchaseOrders")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "quotationID",
                    service : "quotations",
                    select:["quotationID"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Purchase Orders updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Purchase Orders" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount quotations
                    client
                        .service("quotations")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleQuotationsId } })
                        .then((res) => {
                            setQuotationID(res.data.map((e) => { return { name: e['quotationID'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Quotations", type: "error", message: error.message || "Failed get quotations" });
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

    const quotationIDOptions = quotationID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Purchase Orders" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="purchaseOrders-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotationID">Quotation ID:</label>
                <Dropdown id="quotationID" value={_entity?.quotationID?._id} optionLabel="name" optionValue="value" options={quotationIDOptions} onChange={(e) => setValByKey("quotationID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotationID"]) ? (
              <p className="m-0" key="error-quotationID">
                {error["quotationID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="PODate">PODate:</label>
                <Calendar id="PODate"  value={_entity?.PODate ? new Date(_entity?.PODate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("PODate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["PODate"]) ? (
              <p className="m-0" key="error-PODate">
                {error["PODate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="remarks">Remarks:</label>
                <InputText id="remarks" className="w-full mb-3 p-inputtext-sm" value={_entity?.remarks} onChange={(e) => setValByKey("remarks", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["remarks"]) ? (
              <p className="m-0" key="error-remarks">
                {error["remarks"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="POAmount">POAmount:</label>
                <InputText id="POAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.POAmount} onChange={(e) => setValByKey("POAmount", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["POAmount"]) ? (
              <p className="m-0" key="error-POAmount">
                {error["POAmount"]}
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

export default connect(mapState, mapDispatch)(PurchaseOrdersCreateDialogComponent);
