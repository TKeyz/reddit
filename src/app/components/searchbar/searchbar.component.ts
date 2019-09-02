import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

	constructor(public FeedService: FeedService) { }

	private comments$: Comments[] = [];
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
	onSubmit(form: NgForm){
		this.FeedService.setKeyword(this.keyword$);
		this.FeedService.getComments(this.keyword$, this.limit$, null, null).subscribe(res => {
			this.FeedService.updateFeed(res, this.limit$, this.before$);
		});
	}

}