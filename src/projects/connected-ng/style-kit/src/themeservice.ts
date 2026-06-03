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
        // Track both signals so the scheme is re-applied when theme changes too.
        this.isDarkMode();
        this.selectedTheme();

        // Defer to the next microtask so Angular has a chance to apply the new
        // theme class on the wrapper element before we query for it.
        queueMicrotask(() => this.applyColorScheme());
    });

    applyColorScheme() {
        const darkMode = this.isDarkMode();
        const selected = this.selectedTheme();
        const themeClass = selected?.class?.trim();
        const themeElement: Element | null = themeClass
            ? document.querySelector('.' + themeClass)
            : document.documentElement;

        // Clear dark-mode from any previously themed element (and from
        // documentElement when a non-default theme is active) so it doesn't
        // linger when switching themes.
        document.querySelectorAll('.dark-mode').forEach(el => {
            if (el !== themeElement) {
                el.classList.remove('dark-mode');
            }
        });
        if (themeClass) {
            document.documentElement.classList.remove('dark-mode');
        }

        if (!themeElement) {
            return;
        }

        if (darkMode) {
            themeElement.classList.add('dark-mode');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            themeElement.classList.remove('dark-mode');
            document.documentElement.style.colorScheme = 'light dark';
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