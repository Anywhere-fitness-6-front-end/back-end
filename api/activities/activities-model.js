const db = require('../../data/db-config');

const activities = new Map();

async function getActivityName(activity_id) {
	if (!activities.has(activity_id)) {
		await loadActivityNames();
	}

	return activities.get(activity_id) || "unknown";
}

async function loadActivityNames() {
	const result = await db('activities').select();

	result.forEach(activity => {
		activities.set(activity.activity_id, activity.activity_name);
	});
}

async function resolveActivity(data) {

	const inner = async (obj) => {
		if (Object.hasOwnProperty.call(obj, 'activity_id')) {
			obj.activity = await getActivityName(obj.activity_id);
			delete obj.activity_id;
		}
	}

	if (Array.isArray(data)) {
		data.forEach(item => inner(item));
	}
	else {
		inner(data);
	}
}

module.exports = { getActivityName, resolveActivity };
