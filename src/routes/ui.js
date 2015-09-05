import jenkins from '../jenkins';
import async from 'async';

module.exports = function(app) {
	app.get('/', function(req, res) {
		jenkins.allJobs().then(function(jobs) {
			async.map(jobs, function(job, cb) {
				jenkins.build(job.name, 'latest').then(function(build) {
					job.sha = build.sha;
					job.branch = build.branch;
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
				build.date = 'asdf';

				var builds = async.map(job.builds.slice(1), function(build, cb) {
					jenkins.build(job.name, build.number).then(cb.bind(null, null)).fail(cb.bind(null));
				}, function(err, allBuilds) {
					res.render('project', {project: job, build: build, builds: allBuilds});
				});
			}).fail(function(err) {
				res.status(500);
			});
		}).fail(function(err) {
			res.status(500);
		});
	});
};
