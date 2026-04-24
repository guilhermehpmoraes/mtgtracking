import { render, screen } from "@testing-library/angular";
import { HomeShellComponent } from "./app";

describe("HomeShellComponent", () => {
    it("renders the MTG Tracking shell content", async () => {
        await render(HomeShellComponent);

        expect(screen.getByRole("heading", { name: "MTG Tracking" })).toBeTruthy();
        expect(screen.getByText(/The frontend surface is online\./i)).toBeTruthy();
        expect(screen.getByRole("region", { name: /Future navigation and metrics/i })).toBeTruthy();
    });
});
