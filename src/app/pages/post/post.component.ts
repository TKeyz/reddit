import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

	constructor(public FeedService: FeedService, private route: ActivatedRoute, private router: Router) { }

	private comments$: any = [];
	private keyword$: string;
	private limit$: number;
	before$: string;
	after$: string;
	post: number;

	ngOnInit(): void {
		this.FeedService._keyword.subscribe(keyword$ => this.keyword$ = keyword$);
		this.FeedService._limit.subscribe(limit$ => this.limit$ = limit$);
		this.FeedService._before.subscribe(res => this.before$ = res);
		this.FeedService._after.subscribe(res => this.after$ = res);
		this.FeedService.getComments(this.keyword$, this.limit$, this.before$, this.after$).subscribe(res => {
			this.comments$ = res['data'];
			let id = +this.route.snapshot.paramMap.get('id');
			this.comments$.children.forEach((index, i) => {

			});
		});
	}

	goBack(): void {
		this.router.navigate(['/feed']);
	}

}
