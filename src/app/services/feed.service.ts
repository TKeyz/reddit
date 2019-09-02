import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Comments } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})

export class FeedService {

	constructor(private http: HttpClient) { }

	protected url = 'https://www.reddit.com';

	private keyword$ = new BehaviorSubject<string>('Paris');
	private limit$ = new BehaviorSubject<number>(10);
	private before$ = new BehaviorSubject<string>(null);
	private after$ = new BehaviorSubject<string>(null);
	private comments$ = new BehaviorSubject<Array<any>>([]);

	private log(log: string){
		console.info(log);
	}
	private handleError<T>(operation = 'operation', result?: T){
		return (error: any): Observable<T> => {
			console.log(error);
			console.log(`${operation} failed ${error.message}`);

			return of(result as T);
		}
	}
	statusCheck = new EventEmitter<number>();

	_limit = this.limit$.asObservable();
	_keyword = this.keyword$.asObservable();
	_comments = this.comments$.asObservable();
	_before = this.before$.asObservable();
	_after = this.after$.asObservable();

	setLimit(limit) {
		this.limit$.next(limit)
	}
	setKeyword(keyword) {
		this.keyword$.next(keyword)
	}
	setPagination(before, after) {
		this.before$.next(before);
		this.after$.next(after);
	}
	updateFeed(data: any, limit: number, before){
		const feedData = this.formatedArrayData(data, limit, before);
		this.setPagination(feedData[0], feedData[1]);
		data['data'].children = feedData[2];
		this.comments$.next(data['data']);
		this.setLimit(limit);
		return data['data'];
	}
	formatedArrayData(array: any, limit: number, before: string){
		let result = [];
		let lastEntry = array['data'].children.length - 2;
		const count = (before === null) ? limit : array['data'].dist;
		let arrangeData = [];
		for(let i = 0; i < count; i++){
			arrangeData.push(array['data'].children[i]);
			if(i === 4)	result.push(array['data'].children[i].data.name);
		}
		result.push(array['data'].children[lastEntry].data.name);
		result.push(arrangeData);
		return result;
	}
	prepareUrlQuery(ref: string, limit: number, before: string, after: string){
		let keyword = (ref.indexOf('/r/') !== -1) ? ref : '/r/' + ref;
		let params;
		if(before !== null && after !== null){
			params = '&before=' + before + '&after=' + after;
		} else if(after !== null && before === null){
			params = 'limit=' + limit + '&after=' + after;
		} else if(after === null && before === null){
			params = 'limit=' + limit;
		} else {
			params = 'limit=' + limit;
		}
		return `${this.url}` + keyword + '.json?' + params;
	}
	getComments(ref: string, limit: number, before: string, after: string): Observable<any> {
		const query = this.prepareUrlQuery(ref, limit, before, after);
        return this.http.get<any>(query).pipe(
			tap(_ => this.log('Fetched')),
			catchError(this.handleError('Comments Oups', []))
		);
    }

	getPost(id: number): Observable<any> {
		let query = `${this.url}` + id +'.json';
		return this.http.get<Comment[]>(query).pipe(
			map(res => res)
		);
	}
}

