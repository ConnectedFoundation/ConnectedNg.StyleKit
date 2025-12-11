import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    Themes: ThemeInfo[] = [];

    constructor() {
        this.registerTheme({ class: '', displayName: 'Default' });
        this.registerTheme({ class: 'connected-theme', displayName: 'Connected' });
        this.selectTheme(this.Themes[0]);
    }

    public query(): ThemeInfo[] {
        return this.Themes;
    }

    public registerTheme(theme: ThemeInfo) {
        if (this.Themes.find(e => e.class === theme.class)) {
            return;
        }

        this.Themes.push(theme);
    }

    public selectedTheme = signal<ThemeInfo | null>(null);

    public selectTheme(theme: ThemeInfo) {
        this.selectedTheme.set(theme);
    }
}

export class ThemeInfo {
    public class!: string;
    public displayName!: string;
}