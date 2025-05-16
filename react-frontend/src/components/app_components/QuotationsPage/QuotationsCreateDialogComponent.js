import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
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

const QuotationsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [customerID, setCustomerID] = useState([])
const [quotationItems, setQuotationItems] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [customerID,quotationItems], setError);
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
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            quotationID: _entity?.quotationID,customerID: _entity?.customerID?._id,quotationDate: _entity?.quotationDate,status: _entity?.status,totalAmount: _entity?.totalAmount,quotationItems: _entity?.quotationItems?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("quotations").create(_data);
        const eagerResult = await client
            .service("quotations")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "customerID",
                    service : "companies",
                    select:["name"]},{
                    path : "quotationItems",
                    service : "services",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Quotations updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Quotations" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount companies
                    client
                        .service("companies")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleCompaniesId } })
                        .then((res) => {
                            setCustomerID(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Companies", type: "error", message: error.message || "Failed get companies" });
                        });
                }, []);

useEffect(() => {
                    // on mount services
                    client
                        .service("services")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleServicesId } })
                        .then((res) => {
                            setQuotationItems(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Services", type: "error", message: error.message || "Failed get services" });
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

    const customerIDOptions = customerID.map((elem) => ({ name: elem.name, value: elem.value }));
const quotationItemsOptions = quotationItems.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Quotations" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="quotations-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotationID">Quotation ID:</label>
                <InputNumber id="quotationID" className="w-full mb-3 p-inputtext-sm" value={_entity?.quotationID} onChange={(e) => setValByKey("quotationID", e.value)}  />
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
                <label htmlFor="customerID">Customer ID:</label>
                <Dropdown id="customerID" value={_entity?.customerID?._id} optionLabel="name" optionValue="value" options={customerIDOptions} onChange={(e) => setValByKey("customerID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["customerID"]) ? (
              <p className="m-0" key="error-customerID">
                {error["customerID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotationDate">Quotation Date:</label>
                <Calendar id="quotationDate"  value={_entity?.quotationDate ? new Date(_entity?.quotationDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("quotationDate", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotationDate"]) ? (
              <p className="m-0" key="error-quotationDate">
                {error["quotationDate"]}
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
                <label htmlFor="totalAmount">Total Amount:</label>
                <InputNumber id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) ? (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quotationItems">Quotation Items:</label>
                <Dropdown id="quotationItems" value={_entity?.quotationItems?._id} optionLabel="name" optionValue="value" options={quotationItemsOptions} onChange={(e) => setValByKey("quotationItems", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quotationItems"]) ? (
              <p className="m-0" key="error-quotationItems">
                {error["quotationItems"]}
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

export default connect(mapState, mapDispatch)(QuotationsCreateDialogComponent);
