import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const components: ReadonlyArray<any> = [];
const modules: ReadonlyArray<any> = [
	CommonModule,
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatInputModule,
	FormsModule,
	ReactiveFormsModule,
];

@NgModule({
	declarations: [...components],
	imports: [...modules],
	exports: [...components, ...modules],
})
export class SharedModule {}
