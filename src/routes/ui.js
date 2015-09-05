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
				res.render('index', { projects: jobs });
			});
		});
	});

	app.get('/project/:app', function(req, res) {
		jenkins.job(req.params.app).then(function(job) {
			jenkins.build(job.name, 'latest').then(function(build) {
				var rev = build.actions[2].lastBuiltRevision;
				build.sha = rev.SHA1.substring(0, 6);
				build.branch = rev.branch[0].name;
				build.branch = rev.branch[0].name;
				build.branch = build.branch.substring(build.branch.lastIndexOf('/') + 1);
				build.date = 'asdf';
				res.render('project', {project: job, build: build});
			}).fail(function(err) {
				res.status(500);
			});
		}).fail(function(err) {
			res.status(500);
		});
	});
};
