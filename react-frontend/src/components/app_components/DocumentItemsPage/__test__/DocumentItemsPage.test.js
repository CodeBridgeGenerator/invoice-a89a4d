import React from "react";
import { render, screen } from "@testing-library/react";

import DocumentItemsPage from "../DocumentItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders documentItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <DocumentItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("documentItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("documentItems-add-button")).toBeInTheDocument();
});
