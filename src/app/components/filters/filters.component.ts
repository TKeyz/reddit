import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

	constructor(public FeedService: FeedService) { }

	comments$: any;
	keyword$: string;
	limit$: number;

	ngOnInit() {
		this.FeedService._keyword.subscribe(keyword$ => this.keyword$ = keyword$);
		this.FeedService._limit.subscribe(limit$ => {
			this.limit$ = limit$;
		});
	}
	private getComments(ref: string, limit: number) {
		this.FeedService.setLimit(limit);
		this.FeedService.getComments(ref, limit).subscribe(res => {
			this.comments$ = res['data'];
		});
	}

	onFiltrerLimit(limit){
		this.getComments(this.keyword$, limit);
	}

}
