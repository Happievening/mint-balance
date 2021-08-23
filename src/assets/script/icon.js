!(function(e) {
	var t,
		n,
		o,
		i,
		a,
		l =
			'<svg><symbol id="icon-stats" viewBox="0 0 1024 1024"><path d="M128 896 1024 896 1024 1024 0 1024 0 0 128 0ZM288 832C234.976 832 192 789.024 192 736 192 682.976 234.976 640 288 640 290.816 640 293.632 640.16 296.384 640.384L399.584 468.384C389.728 453.344 384 435.328 384 416 384 362.976 426.976 320 480 320 533.024 320 576 362.976 576 416 576 435.328 570.272 453.344 560.416 468.384L663.616 640.384C666.368 640.16 669.184 640 672 640 674.144 640 676.256 640.096 678.336 640.224L848.704 342.112C838.176 326.688 832 308.064 832 288 832 234.976 874.976 192 928 192 981.024 192 1024 234.976 1024 288 1024 341.024 981.024 384 928 384 925.856 384 923.744 383.904 921.664 383.776L751.296 681.888C761.824 697.312 768 715.936 768 736 768 789.024 725.024 832 672 832 618.976 832 576 789.024 576 736 576 716.672 581.728 698.656 591.584 683.584L488.384 511.616C485.632 511.84 482.816 512 480 512 477.184 512 474.368 511.84 471.616 511.616L368.416 683.616C378.272 698.656 384 716.672 384 736 384 789.024 341.024 832 288 832Z"  ></path></symbol><symbol id="icon-money" viewBox="0 0 1024 1024"><path d="M463.3 958.3V772.1H228.8v-77.5h234.5v-80.5H228.8v-83.5H420L191.5 128h113.7L469 420.6c18.2 33.4 32.4 62.4 42.7 86.9 9-19.8 24.6-50.5 46.8-92.1L713.9 128h120.8L605.5 530.6h192.9v83.5H564.9v80.5h233.5v77.5H564.9v186.2H463.3z"  ></path></symbol><symbol id="icon-labels" viewBox="0 0 1024 1024"><path d="M810.666667 472.32V133.12a44.8 44.8 0 0 0-12.373334-30.293333l-5.12-5.12a44.8 44.8 0 0 0-30.293333-12.373334H423.68a85.333333 85.333333 0 0 0-60.586667 25.173334L55.04 418.56a42.666667 42.666667 0 0 0 0 60.16l362.24 362.24a42.666667 42.666667 0 0 0 60.16 0l308.053333-308.053333a85.333333 85.333333 0 0 0 25.173334-60.586667zM597.333333 384a85.333333 85.333333 0 1 1 85.333334-85.333333 85.333333 85.333333 0 0 1-85.333334 85.333333z m371.626667-110.506667l-5.12-5.12a44.8 44.8 0 0 0-30.293333-12.373333H896v251.733333a85.333333 85.333333 0 0 1-25.173333 60.586667l-323.413334 322.986667 37.973334 37.973333a32 32 0 0 0 45.226666 0l298.666667-298.666667A170.666667 170.666667 0 0 0 981.333333 507.733333V303.786667a44.8 44.8 0 0 0-12.373333-30.293334z"  ></path></symbol></svg>',
		d = (d = document.getElementsByTagName('script'))[
			d.length - 1
		].getAttribute('data-injectcss'),
		c = function(e, t) {
			t.parentNode.insertBefore(e, t);
		};
	if (d && !e.__iconfont__svg__cssinject__) {
		e.__iconfont__svg__cssinject__ = !0;
		try {
			document.write(
				'<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
			);
		} catch (e) {
			console && console.log(e);
		}
	}
	function s() {
		a || ((a = !0), o());
	}
	function r() {
		try {
			i.documentElement.doScroll('left');
		} catch (e) {
			return void setTimeout(r, 50);
		}
		s();
	}
	(t = function() {
		var e, t;
		((t = document.createElement('div')).innerHTML = l),
			(l = null),
			(e = t.getElementsByTagName('svg')[0]) &&
				(e.setAttribute('aria-hidden', 'true'),
				(e.style.position = 'absolute'),
				(e.style.width = 0),
				(e.style.height = 0),
				(e.style.overflow = 'hidden'),
				(t = e),
				(e = document.body).firstChild
					? c(t, e.firstChild)
					: e.appendChild(t));
	}),
		document.addEventListener
			? ~['complete', 'loaded', 'interactive'].indexOf(
					document.readyState
			  )
				? setTimeout(t, 0)
				: ((n = function() {
						document.removeEventListener('DOMContentLoaded', n, !1),
							t();
				  }),
				  document.addEventListener('DOMContentLoaded', n, !1))
			: document.attachEvent &&
			  ((o = t),
			  (i = e.document),
			  (a = !1),
			  r(),
			  (i.onreadystatechange = function() {
					'complete' == i.readyState &&
						((i.onreadystatechange = null), s());
			  }));
})(window);
