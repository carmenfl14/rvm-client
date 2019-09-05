import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { UserDashboardComponent } from './users/components/user-dashboard/user-dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { SelectDropDownModule } from 'custom-select-dropdown';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';

@NgModule({
	declarations: [
		AddUserComponent,
		UserDashboardComponent,
		UsersComponent,
		UserDetailsComponent
	],
	imports: [
		NgxMultiselectModule,
		SelectDropDownModule,
		SharedModule,
		CommonModule,
		UsersRoutingModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule
	]
})
export class UsersModule { }
