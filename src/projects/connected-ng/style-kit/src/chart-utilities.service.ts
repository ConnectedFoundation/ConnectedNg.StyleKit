import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartUtilitiesService {
  static getCSSVariable(varName: string): string {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return value;
  }

  colors = Colors;
  styles = Styles;
}

class Colors {
  static red = ChartUtilitiesService.getCSSVariable('--chart-red');
  static orange = ChartUtilitiesService.getCSSVariable('--chart-orange');
  static green = ChartUtilitiesService.getCSSVariable('--chart-green');
  static blue = ChartUtilitiesService.getCSSVariable('--chart-blue');
  static violet = ChartUtilitiesService.getCSSVariable('--chart-violet');
  static area = ChartUtilitiesService.getCSSVariable('--chart-area');
}

class XAxis {
  static line = { color: ChartUtilitiesService.getCSSVariable('--axis-line') };
  static label = { color: ChartUtilitiesService.getCSSVariable('--axis-label') };
  static splitLine = { color: ChartUtilitiesService.getCSSVariable('--split-line') };
}

class YAxis {
  static line = { color: ChartUtilitiesService.getCSSVariable('--axis-line') };
  static label = { color: ChartUtilitiesService.getCSSVariable('--axis-label') };
  static splitLine = { color: ChartUtilitiesService.getCSSVariable('--split-line') };
}

class Grid {
  static background = { color: ChartUtilitiesService.getCSSVariable('--chart-grid-background') };
  static border = { color: ChartUtilitiesService.getCSSVariable('--chart-grid-border') };
}

class Tooltip {
  static background = { color: ChartUtilitiesService.getCSSVariable('--chart-tooltip-background') };
  static text = { color: ChartUtilitiesService.getCSSVariable('--chart-tooltip-text') };
  static border = { color: ChartUtilitiesService.getCSSVariable('--chart-tooltip-border') };
}

class Legend {
  static text = { color: ChartUtilitiesService.getCSSVariable('--chart-legend-text') };
}

class Series {
  static line = { color: ChartUtilitiesService.getCSSVariable('--chart-series-line') };
  static area = {
    color: ChartUtilitiesService.getCSSVariable('--chart-area'),
    opacity: 0.5,
    origin: 'start' as const,
  };
}

class Styles {
  static xAxis = XAxis;
  static yAxis = YAxis;
  static grid = Grid;
  static tooltip = Tooltip;
  static legend = Legend;
  static series = Series;
}