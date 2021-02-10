import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipePipe} from "./pipes/truncate-pipe.pipe";

@NgModule({
  declarations: [
    TruncatePipePipe,
  ],
  exports: [
    TruncatePipePipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
}
