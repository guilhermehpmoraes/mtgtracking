import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    imports: [RouterOutlet],
    selector: "app-root",
    template: "<router-outlet />",
})
export class App {}

@Component({
    selector: "app-home-shell",
    templateUrl: "./app.html",
    styleUrl: "./app.css",
})
export class HomeShellComponent {}
