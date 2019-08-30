import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

	constructor() { }

	before$ = false;
	after$ = true;

	ngOnInit() {
		//
	}
	prev(){
		console.log('Prev');
	}
	next(){
		console.log('Next');
	}
	getPrevStatus(){
		return this.before$;
	}
	getNextStatus(){
		return this.after$;
	}
}