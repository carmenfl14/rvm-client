import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources/resources.component';
import { ResourcesRoutingModule } from './resources.routing';
import { ResourcesdashboardComponent } from './resources/components/resources-dashboard/resources-dashboard.component';
import { ResourcedetailsComponent } from './resources/components/resource-details/resource-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourcesService } from './resources.service';
import { SharedModule } from '../../shared/shared.module';
import { SelectDropDownModule } from 'custom-select-dropdown';
import { AddResourceComponent } from './resources/components/add-resource/add-resource.component';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';
@NgModule({
		declarations: [
			ResourcesComponent,
			ResourcesdashboardComponent,
			ResourcedetailsComponent,
			AddResourceComponent,
		],
		imports: [
			NgxMultiselectModule,
			SelectDropDownModule,
			NgbModule,
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			ResourcesRoutingModule,
			SharedModule,

		],
		entryComponents: [
		],
		providers: [
			ResourcesService,
		]
	})
export class ResourcesModule {

}
