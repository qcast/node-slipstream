import jenkins from '../jenkins';
import async from 'async';

module.exports = function(app) {
	app.get('/', function(req, res) {
		jenkins.allJobs().then(function(jobs) {
			async.map(jobs, function(job, cb) {
				jenkins.build(job.name, 'latest').then(function(build) {
					var rev = build.actions[2].lastBuiltRevision;
					job.sha = rev.SHA1.substring(0, 6);
					job.branch = rev.branch[0].name;
					job.branch = job.branch.substring(job.branch.lastIndexOf('/') + 1);
					job.date = 'asdf';
					cb(null, job);
				});
			}, function(err, jobs) {
				console.log(jobs);
				res.render('index', { projects: jobs });
			});
		});
	});
};
