'use strict'

let _api = new WeakMap();

export default class Matches {

	constructor(parent) {
		_api = parent;
	}

	index(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments/'+tid+'/matches.json', params)
			.then(function (response) {
				//remove 1st layer "matches"
				resolve(response.map(function(obj) {
					return obj.match;
				}));
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	show(tid, mid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments/'+tid+'/matches/'+mid+'.json', params)
			.then(function (response) {
				resolve(response.match);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	//http://api.challonge.com/v1/documents/matches/update
	update(tid, mid, params) {
		return new Promise((resolve, reject) => {
			_api.request('PUT', 'tournaments/'+tid+'/matches/'+mid+'.json', params)
			.then(function (response) {
				resolve(response.match);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	index_attach(tid, mid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments/'+tid+'/matches/'+mid+'/attachments.json', params)
			.then(function (response) {
				resolve(response.map(function(obj) {
					return obj.match_attachment;
				}));
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	add_attach(tid, mid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/matches/'+mid+'/attachments.json', params)
			.then(function (response) {
				resolve(response.match_attachment);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	remove_attach(tid, mid, aid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('DELETE', 'tournaments/'+tid+'/matches/'+mid+'/attachments/'+aid+'.json', params)
			.then(function (response) {
				resolve(response.match_attachment);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}
}
