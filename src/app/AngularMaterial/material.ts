import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule,MatTreeModule,MatExpansionModule,MatIconModule,MatToolbarModule, ],
  exports: [MatButtonModule, MatCheckboxModule,MatTreeModule,MatExpansionModule,MatIconModule,MatToolbarModule, ],
})
export class MisMateriales { }