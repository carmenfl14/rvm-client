import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../organisations.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FiltersService, CitiesCountiesService } from '@app/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
	selector: 'app-ngodashboard',
	templateUrl: './ngodashboard.component.html',
	styleUrls: ['./ngodashboard.component.scss']
})
export class NgodashboardComponent implements OnInit {
	ngosData: any = [];
	pager: any = {};
	displayBlock = true;
	multiselectconfig = {
		displayKey: 'name', // if objects array passed which key to be displayed defaults to description
		search: true, // true/false for the search functionlity defaults to false,
		height: '100', // height of the list so that if there are more no of items it can show a scroll defaults to auto
		limitTo: 10, // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
		// customComparator: ()=>{}
		moreText: 'altele', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
		noResultsFound: 'Niciun rezultat!', // text to be displayed when no items are found while searching
		searchPlaceholder: 'Cauta', // label thats displayed in search input,
		searchOnKey: 'name', // key on which search should be performed this will be selective search.
							// if undefined this will be extensive search on all keys
		};
		locationconfig = {...{placeholder: 'Judet'}, ...this.multiselectconfig};
		typeconfig = {...{placeholder: 'Tip'}, ...this.multiselectconfig};
		categoryconfig = {...{placeholder: 'Category'}, ...this.multiselectconfig};
		specializationconfig = {...{placeholder: 'Specializare'}, ...this.multiselectconfig};
	categoryFilterValues: any[];
	typeFilterValues: any[];
	specializationFilterValues: any[];
	locationFilterValues: any[];

	constructor(
		private organisationService: OrganisationService,
		public breakpointObserver: BreakpointObserver,
		private filterService: FiltersService,
		private citiesandcounties: CitiesCountiesService,
		private router: Router
	) {}
	/**
	 * subscribe to screen size in order to use list instead of grid for display
	 */

	ngOnInit() {
		this.citiesandcounties.getCounties('', true).subscribe((response: {data: any[], pager: any}) => {
			this.locationFilterValues = response.data;
		});

		// this.filterService.getTypeFilters().subscribe((data) => {
		// 	this.typeFilterValues = data.map((elem: any) => {
		// 		return {id: elem.type_name, name: elem.type_name};
		// 		});
		// });

		// TODO WHEN BACKEND FINISHED
		// this.filterService.getSpecializationFilters().subscribe((data) => {
		// 	this.specializationFilterValues = data.map((elem: any) => {
		// 		return {id: elem.name, name: elem.name};
		// 	});
		// });
		this.pager = this.organisationService.getPager();

		this.getData();

		this.breakpointObserver
			.observe(['(max-width: 768px)'])
			.subscribe(result => {
				if (result.matches) {
					this.switchtoblock();
				}
			});
	}

	sortChanged(pager: any) {
		this.pager = pager;
		this.getData();
	}
	searchChanged(pager: any) {
		if (pager.search !== '') {
			this.ngosData = this.ngosData.filter((elem: any) => {
				return elem.name.toLowerCase().indexOf(pager.search) > -1;
			});
		} else {
			this.getData();
		}
	}

	getData() {
		this.organisationService.getorganisations(this.pager).subscribe(element => {
			this.ngosData = element.data.map((elem: any) => {
				elem.nr_vol = 0;
				elem.nr_res = 0;
				return elem;
			});
			this.pager.total = element.pager.total;
		});
	}

	filterChanged = (data?: any, id?: string) => {
		this.pager.filters[id] =  data.value.map((elem: any) => elem._id).join(',');
		this.getData();
	}

	/**
	 * set class of display element with list view
	 */
	switchtolist() {
		this.displayBlock = false;
	}

	/**
	 * set class of display element with grid view
	 */
	switchtoblock() {
		this.displayBlock = true;
	}

	showOrganisationDetails(id: string, property: string, e: any) {
		e.preventDefault();
		const navigationExtras: NavigationExtras = {
			state: {
				tabName: property
			}
		};
		this.router.navigateByUrl('/organisations/id/' + id, navigationExtras);
	}
}
