import { ElementRef, Renderer2 } from '@angular/core';
import { CustomTooltipDirective } from './custom-tooltip.directive';

describe('CustomTooltipDirective', () => {
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;

  beforeEach(() => {
    elementRefMock = new ElementRef(null);
    rendererMock = jasmine.createSpyObj('Renderer2', [
      'createElement',
      'addClass',
      'setProperty',
      'appendChild',
      'removeChild',
      'setStyle',
    ]);
  });

  it('should create an instance', () => {
    const directive = new CustomTooltipDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
