const {
	gulp,
	download,
	decompress,
	rename,
	clean
}  = themeplify.packages;

const argv = themeplify.args;

const create = gulp.series(
	function downloadTemplate(){
		return download(argv.archive)
			.pipe(rename("theme.zip"))
			.pipe(gulp.dest("./downloads"));
	},
	function unzipTemplate() {
		return gulp.src("./downloads/theme.zip")
			.pipe(decompress({
				strip: 1
			}))
			.pipe(gulp.dest("./"))
	},
	function deleteSource() {
		return gulp.src("./downloads")
			.pipe(clean({
				force: true,
				read: false,
				allowEmpty: true,
			}));
	}
);

create.displayName = "create";

module.exports  = create;
