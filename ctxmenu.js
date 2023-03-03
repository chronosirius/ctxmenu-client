// Copyright 2023 chronosirius
// You may use this code in your website but must provide credit and modifications must lead back

window.addEventListener('load', function() {
    document.body.addEventListener('contextmenu', function(ev) {
        el = document.getElementById('ctxmenu')
        if (el) {
            ev.preventDefault()
            el.remove()
        }
    })
})

class Ctx {
	constructor(objects) {
		this.menu = document.createElement('div')
		this.menu.id = 'ctxmenu'
		this.menu.style.position = 'fixed'
		this.menu.style.background = 'var(--bg-color)'
		this.menu.addEventListener('contextmenu', function(ev) {
			ev.preventDefault()
		})
		for (var l = 0; l < objects.length; l++) {
			var item = objects[l]
			var btn = document.createElement('button')
			btn.appendChild(document.createTextNode(item.option))
			btn.style.color = (item.color != null) ? item.color : 'var(--text-color)'
			btn.style.background = (item.bg != null) ? item.bg : 'var(--tlv-el-color)'
			btn.style.borderWidth = '1.5px'
			btn.style.width = '120px'
			btn.onclick = function() {
				document.getElementById('ctxmenu').remove()
				item.callback(btn)
			}
			btn.addEventListener('contextmenu', function(ev) {
				ev.preventDefault()
			})
			btn.target = null
			this.menu.appendChild(btn)
			if (--objects.length) {
				this.menu.appendChild(document.createElement('br'))
			}
		}
	}

	register(query) {
		var self = this
		document.querySelectorAll(query).forEach(function(element) {
			element.addEventListener('contextmenu', function(ev) {
				ev.preventDefault()
				ev.stopPropagation()
				if (document.getElementById('ctxmenu') == null) {
					var men = self.menu
					men.style.top = `${ev.pageY}px`
					men.style.left = `${ev.pageX}px`
					men.style.height = 'fit-content'
					for (var btnid = 0; btnid < men.children.length; btnid++) {
						men.children[btnid].target = ev.target
					}
					document.body.appendChild(men)
				} else {
					document.getElementById('ctxmenu').remove()
				}
			})
		})
		document.addEventListener('click', function(e) {
			if (document.getElementById('ctxmenu') != null) {
				if (e.target.offsetParent != document.getElementById('ctxmenu')) {
					document.getElementById('ctxmenu').remove()
				}
			}
		})
		return this
	}
}
