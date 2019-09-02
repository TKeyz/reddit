import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

	constructor(public FeedService: FeedService) {
		this.FeedService.statusCheck.subscribe((res: number) => alert('Here '+res));
	}

	comments$: any = [];
	keyword$: string;
	limit$: number;
	before$: string;
	after$: string;

	ngOnInit() {
		this.FeedService._keyword.subscribe(res => this.keyword$ = res);
		this.FeedService._comments.subscribe(res => this.comments$ = res);
		this.FeedService._limit.subscribe(res => this.limit$ = res);
		this.FeedService._before.subscribe(res => this.before$ = res);
		this.FeedService._after.subscribe(res => this.after$ = res);
	}

	onFiltrerLimit(limit: number){
		this.FeedService.getComments(this.keyword$, limit, null, this.after$).subscribe(res => {
			this.FeedService.updateFeed(res, limit, this.before$);
		});
	}

}
