mokit.require.add(
    /* Other Function */
    { name: 'tools.tabs', url: 'js/jquery.tools.min.js' },
    { name: 'jq.pager', url: 'js/jquery.pagination.js', requires: ['/js/jQueryAjaxPager/pagination.css'] },
    { name: 'jq.ajaxform', url: 'js/jquery.form.js' },
    { name: 'jq.query', url: 'js/jquery.query.js' },
    { name: 'datetimepicker', url: 'js/zh-cn.js', requires: ['js/datetimepicker/bootstrap-datetimepicker.min.js', 'js/datetimepicker/datetimepicker.css'] },
    /* Mokit Base */
	{ name: 'mk.event', url: 'js/mokit.event.js' },
	/* Mokit Tools */
	{ name: 'mk.localStorage', url: 'js/mokit.localStorage.js?v=20130801' },
	{ name: 'mk.razor', url: 'js/kino.razor.js' },
	/* Mokit Plugin */
	{ name: 'mk.dialog', url: 'js/mokit.ui.dialog.js', requires: ['mk.event', 'mk.mask', 'css/style.css?v=20120926'] },
	{ name: 'mk.mask', url: 'js/mokit.ui.mask.js' },
	{ name: 'mk.lazyload', url: 'js/lazyload/mokit.ui.lazyload.js' },
	{ name: 'mk.tags', url: 'js/mokit.ui.tags.js', requires: ['css/mokit-ui-tags.css', 'mk.event'] },
	{ name: 'mk.vote', url: 'js/mokit.ui.vote.js', requires: ['css/vote.css', 'mk.event'] },
    { name: "mk.tpl", url: "js/mokit.tpl.js" },
    { name: "jq.pager", url: "js/jquery.pagination.js", requires: ["css/pagination.css"] }

);
mokit.baseURI = 'http://' + location.host;