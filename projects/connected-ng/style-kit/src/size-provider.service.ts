import { inject, Injectable, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class SizeProviderService {

  private readonly _media = inject(MediaMatcher);
  private readonly _breakpointOberver = inject(BreakpointObserver);

  //todo cache and reuse listeners
  public getBreakpointWatcher(breakpoint: number) {
    let query = this._media.matchMedia(`(max-width: ${breakpoint}px)`);

    let changeSignal = signal<boolean>(query.matches);

    let handler = (e: MediaQueryListEvent) => changeSignal.set(e.matches);
    query.addEventListener('change', handler);

    let dispose = () => query.removeEventListener('change', handler);

    return {
      query,
      dispose,
      changeSignal
    };
  }

  public getSizeChangeSignal() {
    var breakpointSignal = signal(SizeBreakpoints.Small);

    this._breakpointOberver.observe([Breakpoints.XSmall]).subscribe((e) => {
      if (e.matches)
        breakpointSignal.set(SizeBreakpoints.XSmall);
    });

    this._breakpointOberver.observe([Breakpoints.Small]).subscribe((e) => {
      if (e.matches)
        breakpointSignal.set(SizeBreakpoints.Small);
    });

    this._breakpointOberver.observe([Breakpoints.Medium]).subscribe((e) => {
      if (e.matches)
        breakpointSignal.set(SizeBreakpoints.Medium);
    });

    this._breakpointOberver.observe([Breakpoints.Large]).subscribe((e) => {
      if (e.matches)
        breakpointSignal.set(SizeBreakpoints.Large);
    });

    this._breakpointOberver.observe([Breakpoints.XLarge]).subscribe((e) => {
      if (e.matches)
        breakpointSignal.set(SizeBreakpoints.XLarge);
    });

    return breakpointSignal;
  }
}

export enum SizeBreakpoints {
  XSmall = 'xsmall',
  Small= 'small',
  Medium= 'medium',
  Large= 'large',
  XLarge= 'xlarge'
}
