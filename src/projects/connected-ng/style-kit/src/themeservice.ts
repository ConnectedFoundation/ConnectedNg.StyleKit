import { Injectable, signal, effect } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    Themes: ThemeInfo[] = [];
    isDarkMode = signal<boolean>(false);

    constructor() {
        this.registerTheme({ class: '', displayName: 'Default' });
        this.registerTheme({ class: 'connected-theme', displayName: 'Connected' });
        this.selectTheme(this.Themes[0]);
    }

    applyColorSchemeEffect = effect(() => {
        const darkMode = this.isDarkMode();

        this.applyColorScheme();
    });

    applyColorScheme() {
        const darkMode = this.isDarkMode();
        const themeElement = document.querySelector('.connected-theme');
        if (themeElement) {
            if (darkMode) {
                themeElement.classList.add('dark-mode');
                document.documentElement.style.colorScheme = 'dark';
            } else {
                themeElement.classList.remove('dark-mode');
                document.documentElement.style.colorScheme = 'light dark';
            }
        }
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

    public toggleDarkMode() {
        this.isDarkMode.set(!this.isDarkMode());
    }

    public setDarkMode(enabled: boolean) {
        this.isDarkMode.set(enabled);
    }
}

export class ThemeInfo {
    public class!: string;
    public displayName!: string;
}