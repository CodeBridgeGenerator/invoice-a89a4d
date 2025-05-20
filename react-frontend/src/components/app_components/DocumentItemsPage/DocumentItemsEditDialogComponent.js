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
import { Dropdown } from 'primereact/dropdown';


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

const DocumentItemsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [documentItems, setDocumentItems] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount services
                    client
                        .service("services")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleServicesId } })
                        .then((res) => {
                            setDocumentItems(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Services", type: "error", message: error.message || "Failed get services" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            documentType: _entity?.documentType,
documentID: _entity?.documentID,
documentItems: _entity?.documentItems?._id,
units: _entity?.units,
itemType: _entity?.itemType,
totalAmount: _entity?.totalAmount,
        };

        setLoading(true);
        try {
            
        await client.service("documentItems").patch(_entity._id, _data);
        const eagerResult = await client
            .service("documentItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "documentItems",
                    service : "services",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info documentItems updated successfully" });
        props.onEditResult(eagerResult.data[0]);
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

    const documentItemsOptions = documentItems.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Document Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="documentItems-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="documentType">Document Type:</label>
                <InputText id="documentType" className="w-full mb-3 p-inputtext-sm" value={_entity?.documentType} onChange={(e) => setValByKey("documentType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["documentType"]) && (
              <p className="m-0" key="error-documentType">
                {error["documentType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="documentID">Document ID:</label>
                <InputText id="documentID" className="w-full mb-3 p-inputtext-sm" value={_entity?.documentID} onChange={(e) => setValByKey("documentID", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["documentID"]) && (
              <p className="m-0" key="error-documentID">
                {error["documentID"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="documentItems">Document Items:</label>
                <Dropdown id="documentItems" value={_entity?.documentItems?._id} optionLabel="name" optionValue="value" options={documentItemsOptions} onChange={(e) => setValByKey("documentItems", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["documentItems"]) && (
              <p className="m-0" key="error-documentItems">
                {error["documentItems"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="units">Units:</label>
                <InputText id="units" className="w-full mb-3 p-inputtext-sm" value={_entity?.units} onChange={(e) => setValByKey("units", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["units"]) && (
              <p className="m-0" key="error-units">
                {error["units"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itemType">Item Type:</label>
                <InputText id="itemType" className="w-full mb-3 p-inputtext-sm" value={_entity?.itemType} onChange={(e) => setValByKey("itemType", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itemType"]) && (
              <p className="m-0" key="error-itemType">
                {error["itemType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="totalAmount">Total Amount:</label>
                <InputText id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) && (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
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

export default connect(mapState, mapDispatch)(DocumentItemsCreateDialogComponent);
