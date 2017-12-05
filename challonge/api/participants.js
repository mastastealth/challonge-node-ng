'use strict'

let _api = new WeakMap();

export default class Participants {

	constructor(parent) {
		_api = parent;
	}

	index(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments/'+tid+'/participants.json', params)
			.then(function (response) {
				//remove 1st layer "participant"
				resolve(response.map(function(obj) {
					return obj.participant;
				}));
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	create(tid, nameOrParams) {
		let params = (nameOrParams.hasOwnProperty('participant')) ? nameOrParams : {
			name: nameOrParams
		};

		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/participants.json', params)
			.then(function (response) {
				resolve(response.participant);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	show(tid, pid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('GET', 'tournaments/'+tid+'/participants/'+pid+'.json', params)
			.then(function (response) {
				resolve(response.participant);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	//http://api.challonge.com/v1/documents/participants/update
	update(tid, pid, params) {
		return new Promise((resolve, reject) => {
			_api.request('PUT', 'tournaments/'+tid+'/participants/'+pid+'.json', params)
			.then(function (response) {
				resolve(response.participant);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	delete(tid, pid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('DELETE', 'tournaments/'+tid+'/participants/'+pid+'.json', params)
			.then(function (response) {
				resolve(response.participant);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	//https://api.challonge.com/v1/documents/participants/check_in
	checkin(tid, pid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/participants/'+pid+'/check_in.json', params)
			.then(function (response) {
				resolve(response.participant);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	//https://api.challonge.com/v1/documents/participants/undo_check_in
	checkout(tid, pid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/participants/'+pid+'/undo_check_in.json', params)
			.then(function (response) {
				resolve(response.participant);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}

	randomize(tid, params = {}) {
		return new Promise((resolve, reject) => {
			_api.request('POST', 'tournaments/'+tid+'/participants/randomize.json', params)
			.then(function (response) {
				resolve(response);
			})
			.catch(function (err) {
				reject(err.message);
			});
		});
	}
}
