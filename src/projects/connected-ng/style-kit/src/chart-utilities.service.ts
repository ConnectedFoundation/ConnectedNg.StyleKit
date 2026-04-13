import { computed, inject, Injectable } from '@angular/core';
import { ThemeService } from './themeservice';

@Injectable({
  providedIn: 'root',
})
export class ChartUtilitiesService {
  private static _el: HTMLElement | null = null;

  private static get el(): HTMLElement {
    if (!this._el) {
      this._el = document.createElement('div');
      this._el.style.display = 'none';
      document.body.appendChild(this._el);
    }
    return this._el;
  }

  static getCSSVariable(varName: string): string {
    this.el.style.color = `var(${varName})`;
    return getComputedStyle(this.el).color;
  }

  private themeService = inject(ThemeService);

  readonly colors = computed(() => {
    this.themeService.selectedTheme();
    this.themeService.isDarkMode();
    const css = (v: string) => ChartUtilitiesService.getCSSVariable(v);

    const red = css('--chart-red');
    const orange = css('--chart-orange');
    const green = css('--chart-green');
    const blue = css('--chart-blue');
    const violet = css('--chart-violet');
    const area = css('--chart-area');

    return {
      red,
      orange,
      green,
      blue,
      violet,
      area,
      colorIndex: [red, orange, green, blue, violet],
    };
  });

  readonly styles = computed(() => {
    this.themeService.selectedTheme();
    this.themeService.isDarkMode();
    const css = (v: string) => ChartUtilitiesService.getCSSVariable(v);

    const axisLine = css('--axis-line');
    const axisLabel = css('--axis-label');
    const splitLine = css('--split-line');
    const gridBg = css('--chart-grid-background');
    const gridBorder = css('--chart-grid-border');
    const tooltipBg = css('--chart-tooltip-background');
    const tooltipText = css('--chart-tooltip-text');
    const tooltipBorder = css('--chart-tooltip-border');
    const legendText = css('--chart-legend-text');
    const seriesLine = css('--chart-series-line');
    const area = css('--chart-area');

    return {
      xAxis: {
        line: { color: axisLine },
        label: { color: axisLabel },
        splitLine: { color: splitLine },
      },
      yAxis: {
        line: { color: axisLine },
        label: { color: axisLabel },
        splitLine: { color: splitLine },
      },
      grid: {
        background: { color: gridBg },
        border: { color: gridBorder },
      },
      tooltip: {
        background: { color: tooltipBg },
        text: { color: tooltipText },
        border: { color: tooltipBorder },
      },
      legend: {
        text: { color: legendText },
      },
      series: {
        line: { color: seriesLine },
        area: {
          color: area,
          opacity: 0.5,
          origin: 'start' as const,
        },
      },
    };
  });
}