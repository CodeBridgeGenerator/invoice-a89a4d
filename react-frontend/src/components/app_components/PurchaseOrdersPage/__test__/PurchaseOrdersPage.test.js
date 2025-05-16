import React from "react";
import { render, screen } from "@testing-library/react";

import PurchaseOrdersPage from "../PurchaseOrdersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders purchaseOrders page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PurchaseOrdersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("purchaseOrders-datatable")).toBeInTheDocument();
    expect(screen.getByRole("purchaseOrders-add-button")).toBeInTheDocument();
});
