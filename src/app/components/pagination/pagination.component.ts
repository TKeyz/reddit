import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

	constructor(public FeedService: FeedService) { }

	comments$: any = [];
	keyword$: string;
	limit$: number;
	start$: string;
	before$: string = null;
	after$: string;

	ngOnInit() {
		this.FeedService._keyword.subscribe(res => this.keyword$ = res);
		this.FeedService._comments.subscribe(res => this.comments$ = res);
		this.FeedService._limit.subscribe(res => this.limit$ = res);
		this.FeedService._before.subscribe(res => this.start$ = res);
		this.FeedService._after.subscribe(res => this.after$ = res);
	}
	prev(){
		this.FeedService.getComments(this.keyword$, this.limit$, this.before$, this.after$).subscribe(res => {
			this.FeedService.updateFeed(res, this.limit$, this.before$);
		});
	}
	next(){
		let paginationStart = (this.before$ !== null) ? this.before$ : this.start$;
		this.FeedService.getComments(this.keyword$, this.limit$, paginationStart, this.after$).subscribe(res => {
			this.FeedService.updateFeed(res, this.limit$, paginationStart);
		});
	}
	getPrevStatus(){
		return this.before$;
	}
	getNextStatus(){
		return this.after$;
	}
}