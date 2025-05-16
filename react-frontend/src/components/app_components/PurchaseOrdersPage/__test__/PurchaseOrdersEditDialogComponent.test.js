import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseOrdersEditDialogComponent from "../PurchaseOrdersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseOrders edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseOrdersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseOrders-edit-dialog-component")).toBeInTheDocument();
});
