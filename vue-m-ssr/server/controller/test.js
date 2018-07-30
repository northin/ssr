

module.exports = {
	async testPage (ctx) {
		var title = "title"
		await ctx.render('test',{
			title
		})
	}
}

