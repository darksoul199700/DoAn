import { Component, OnInit } from '@angular/core';
import { ThemeVariables, ThemeRef, lyl, StyleRenderer } from '@alyle/ui';

const STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
  const __ = ref.selectorsOf(STYLES);
  return {
    $global: lyl `{
      body {
        background-color: ${theme.background.default}
        color: ${theme.text.default}
        font-family: ${theme.typography.fontFamily}
        margin: 0
        direction: ${theme.direction}
      }
    }`,
    root: lyl `{
      display: block
    }`
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app-component.component.html',
  styleUrls: ['./app-component.component.css'],
  providers: [StyleRenderer]
})
export class AppComponentComponent implements OnInit {
  readonly classes = this.sRenderer.renderSheet(STYLES, true);


  constructor(readonly sRenderer: StyleRenderer) { }

  ngOnInit(): void {
  }

}
