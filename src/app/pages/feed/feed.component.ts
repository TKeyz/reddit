import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-root',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

	constructor(public FeedService: FeedService, private router: Router) {}

	comments$: any = [];
	keyword$: string;
	limit$: number;
	before$: string;
	after$: string;
	post: number;

	ngOnInit() {
		this.FeedService._keyword.subscribe(res => this.keyword$ = res);
		this.FeedService._limit.subscribe(res => this.limit$ = res);
		this.FeedService._comments.subscribe(res => this.comments$ = res);
		this.FeedService._before.subscribe(res => this.before$ = res);
		this.FeedService._after.subscribe(res => this.after$ = res);

		this.FeedService.getComments(this.keyword$, this.limit$, this.before$, this.after$).subscribe(res => {
			this.comments$ = this.FeedService.updateFeed(res, this.limit$, this.before$);
		});
	}
	selectPost(post: any): void {
		let link = ['/post', post.data.id];
		this.router.navigate(link);
	}
}
