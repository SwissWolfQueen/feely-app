export class BehaviourModel {
	mood: string = '';
	reason: string = '';
	note: string = '';
	date : Date;


	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
