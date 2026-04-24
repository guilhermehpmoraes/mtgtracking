import { expect, test } from "@playwright/test";

test("loads the root shell without runtime errors", async ({ page }) => {
    const runtimeErrors: string[] = [];

    page.on("console", (message) => {
        if (message.type() === "error") {
            runtimeErrors.push(message.text());
        }
    });

    page.on("pageerror", (error) => {
        runtimeErrors.push(error.message);
    });

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "MTG Tracking" })).toBeVisible();
    await expect(page.getByText(/The frontend surface is online\./i)).toBeVisible();

    expect(runtimeErrors).toEqual([]);
});
