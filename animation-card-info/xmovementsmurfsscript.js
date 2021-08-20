if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}+function($){'use strict';var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0]<2&&version[1]<9)||(version[0]==1&&version[1]==9&&version[2]<1)||(version[0]>3)){throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return!1}
$.fn.emulateTransitionEnd=function(duration){var called=!1
var $el=this
$(this).one('bsTransitionEnd',function(){called=!0})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.7'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector==='#'?[]:selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=!1}
Button.VERSION='3.3.7'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state+='Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=!0
$el.addClass(d).attr(d,d).prop(d,!0)}else if(this.isLoading){this.isLoading=!1
$el.removeClass(d).removeAttr(d).prop(d,!1)}},this),0)}
Button.prototype.toggle=function(){var changed=!0
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked'))changed=!1
$parent.find('.active').removeClass('active')
this.$element.addClass('active')}else if($input.prop('type')=='checkbox'){if(($input.prop('checked'))!==this.$element.hasClass('active'))changed=!1
this.$element.toggleClass('active')}
$input.prop('checked',this.$element.hasClass('active'))
if(changed)$input.trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))
this.$element.toggleClass('active')}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target).closest('.btn')
Plugin.call($btn,'toggle')
if(!($(e.target).is('input[type="radio"], input[type="checkbox"]'))){e.preventDefault()
if($btn.is('input,button'))$btn.trigger('focus')
else $btn.find('input:visible,button:visible').first().trigger('focus')}}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart' in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.7'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:!0,keyboard:!0}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=!1)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=!0)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(!0)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=!1)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=!0
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=!1
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=!1
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=!1
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.7'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:!0}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',!0)
this.$trigger.removeClass('collapsed').attr('aria-expanded',!0)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',!1)
this.$trigger.addClass('collapsed').attr('aria-expanded',!1)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=!1
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.7'
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
if(e&&e.type=='click'&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',relatedTarget))})}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart' in document.documentElement&&!$parent.closest('.navbar-nav').length){$(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger($.Event('shown.bs.dropdown',relatedTarget))}
return!1}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('.dropdown-menu'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','.dropdown-menu',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=!1
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.7'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:!0,keyboard:!0,show:!0}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=!0
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=!0})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=!1
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(document!==e.target&&this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div')).addClass('modal-backdrop '+animate).appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=!1
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.inState=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.7'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:!0,placement:'top',selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:!1,container:!1,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=!0
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):(this.options.viewport.selector||this.options.viewport))
this.inState={click:!1,hover:!1,focus:!1}
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusin'?'focus':'hover']=!0}
if(self.tip().hasClass('in')||self.hoverState=='in'){self.hoverState='in'
return}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState){if(this.inState[key])return!0}
return!1}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
if(obj instanceof $.Event){self.inState[obj.type=='focusout'?'focus':'hover']=!1}
if(self.isInStateTrue())return
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.'+this.type)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var viewportDim=this.getPosition(this.$viewport)
placement=placement=='bottom'&&pos.bottom+actualHeight>viewportDim.bottom?'top':placement=='top'&&pos.top-actualHeight<viewportDim.top?'bottom':placement=='right'&&pos.right+actualWidth>viewportDim.width?'left':placement=='left'&&pos.left-actualWidth<viewportDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top+=marginTop
offset.left+=marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
if(that.$element){that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)}
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof $e.attr('data-original-title')!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var isSvg=window.SVGElement&&el instanceof window.SVGElement
var elOffset=isBody?{top:0,left:0}:(isSvg?null:$element.offset())
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.right){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){if(!this.$tip){this.$tip=$(this.options.template)
if(this.$tip.length!=1){throw new Error(this.type+' `template` option must consist of exactly 1 top-level element!')}}
return this.$tip}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=!0}
Tooltip.prototype.disable=function(){this.enabled=!1}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
if(e){self.inState.click=!self.inState.click
if(self.isInStateTrue())self.enter(self)
else self.leave(self)}else{self.tip().hasClass('in')?self.leave(self):self.enter(self)}}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)
if(that.$tip){that.$tip.detach()}
that.$tip=null
that.$arrow=null
that.$viewport=null
that.$element=null})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.7'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.7'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.7'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass('fade')||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',!1)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',!0)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',!0)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=null
this.unpin=null
this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.3.7'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':!1
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?!1:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?!1:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&scrollTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return!1}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=Math.max($(document).height(),$(document.body).height())
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof module==='object'&&module.exports){module.exports=function(root,jQuery){if(jQuery===undefined){if(typeof window!=='undefined'){jQuery=require('jquery')}
else{jQuery=require('jquery')(root)}}
factory(jQuery);return jQuery}}else{factory(jQuery)}}(function($){$.fn.tilt=function(options){const requestTick=function(){if(this.ticking)return;requestAnimationFrame(updateTransforms.bind(this));this.ticking=!0};const bindEvents=function(){const _this=this;$(this).on('mousemove',mouseMove);$(this).on('mouseenter',mouseEnter);if(this.settings.reset)$(this).on('mouseleave',mouseLeave);if(this.settings.glare)$(window).on('resize',updateGlareSize.bind(_this))};const setTransition=function(){if(this.timeout!==undefined)clearTimeout(this.timeout);$(this).css({'transition':`${this.settings.speed}ms ${this.settings.easing}`});if(this.settings.glare)this.glareElement.css({'transition':`opacity ${this.settings.speed}ms ${this.settings.easing}`});this.timeout=setTimeout(()=>{$(this).css({'transition':''});if(this.settings.glare)this.glareElement.css({'transition':''})},this.settings.speed)};const mouseEnter=function(event){this.ticking=!1;$(this).css({'will-change':'transform'});setTransition.call(this);$(this).trigger("tilt.mouseEnter")};const getMousePositions=function(event){if(typeof(event)==="undefined"){event={pageX:$(this).offset().left+$(this).outerWidth()/2,pageY:$(this).offset().top+$(this).outerHeight()/2}}
return{x:event.pageX,y:event.pageY}};const mouseMove=function(event){this.mousePositions=getMousePositions(event);requestTick.call(this)};const mouseLeave=function(){setTransition.call(this);this.reset=!0;requestTick.call(this);$(this).trigger("tilt.mouseLeave")};const getValues=function(){const width=$(this).outerWidth();const height=$(this).outerHeight();const left=$(this).offset().left;const top=$(this).offset().top;const percentageX=(this.mousePositions.x-left)/width;const percentageY=(this.mousePositions.y-top)/height;const tiltX=((this.settings.maxTilt/2)-((percentageX)*this.settings.maxTilt)).toFixed(2);const tiltY=(((percentageY)*this.settings.maxTilt)-(this.settings.maxTilt/2)).toFixed(2);const angle=Math.atan2(this.mousePositions.x-(left+width/2),-(this.mousePositions.y-(top+height/2)))*(180/Math.PI);return{tiltX,tiltY,'percentageX':percentageX*100,'percentageY':percentageY*100,angle}};const updateTransforms=function(){this.transforms=getValues.call(this);if(this.reset){this.reset=!1;$(this).css('transform',`perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg)`);if(this.settings.glare){this.glareElement.css('transform',`rotate(180deg) translate(-50%, -50%)`);this.glareElement.css('opacity',`0`)}
return}else{$(this).css('transform',`perspective(${this.settings.perspective}px) rotateX(${this.settings.disableAxis === 'x' ? 0 : this.transforms.tiltY}deg) rotateY(${this.settings.disableAxis === 'y' ? 0 : this.transforms.tiltX}deg) scale3d(${this.settings.scale},${this.settings.scale},${this.settings.scale})`);if(this.settings.glare){this.glareElement.css('transform',`rotate(${this.transforms.angle}deg) translate(-50%, -50%)`);this.glareElement.css('opacity',`${this.transforms.percentageY * this.settings.maxGlare / 100}`)}}
$(this).trigger("change",[this.transforms]);this.ticking=!1};const prepareGlare=function(){const glarePrerender=this.settings.glarePrerender;if(!glarePrerender)
$(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>');this.glareElementWrapper=$(this).find(".js-tilt-glare");this.glareElement=$(this).find(".js-tilt-glare-inner");if(glarePrerender)return;const stretch={'position':'absolute','top':'0','left':'0','width':'100%','height':'100%',};this.glareElementWrapper.css(stretch).css({'overflow':'hidden','pointer-events':'none',});this.glareElement.css({'position':'absolute','top':'50%','left':'50%','background-image':`linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)`,'width':`${$(this).outerWidth()*2}`,'height':`${$(this).outerWidth()*2}`,'transform':'rotate(180deg) translate(-50%, -50%)','transform-origin':'0% 0%','opacity':'0',})};const updateGlareSize=function(){this.glareElement.css({'width':`${$(this).outerWidth()*2}`,'height':`${$(this).outerWidth()*2}`,})};$.fn.tilt.destroy=function(){$(this).each(function(){$(this).find('.js-tilt-glare').remove();$(this).css({'will-change':'','transform':''});$(this).off('mousemove mouseenter mouseleave')})};$.fn.tilt.getValues=function(){const results=[];$(this).each(function(){this.mousePositions=getMousePositions.call(this);results.push(getValues.call(this))});return results};$.fn.tilt.reset=function(){$(this).each(function(){this.mousePositions=getMousePositions.call(this);this.settings=$(this).data('settings');mouseLeave.call(this);setTimeout(()=>{this.reset=!1},this.settings.transition)})};return this.each(function(){this.settings=$.extend({maxTilt:$(this).is('[data-tilt-max]')?$(this).data('tilt-max'):20,perspective:$(this).is('[data-tilt-perspective]')?$(this).data('tilt-perspective'):300,easing:$(this).is('[data-tilt-easing]')?$(this).data('tilt-easing'):'cubic-bezier(.03,.98,.52,.99)',scale:$(this).is('[data-tilt-scale]')?$(this).data('tilt-scale'):'1',speed:$(this).is('[data-tilt-speed]')?$(this).data('tilt-speed'):'400',transition:$(this).is('[data-tilt-transition]')?$(this).data('tilt-transition'):!0,disableAxis:$(this).is('[data-tilt-disable-axis]')?$(this).data('tilt-disable-axis'):null,axis:$(this).is('[data-tilt-axis]')?$(this).data('tilt-axis'):null,reset:$(this).is('[data-tilt-reset]')?$(this).data('tilt-reset'):!0,glare:$(this).is('[data-tilt-glare]')?$(this).data('tilt-glare'):!1,maxGlare:$(this).is('[data-tilt-maxglare]')?$(this).data('tilt-maxglare'):1,},options);if(this.settings.axis!==null){console.warn('Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information');this.settings.disableAxis=this.settings.axis}
this.init=()=>{$(this).data('settings',this.settings);if(this.settings.glare)prepareGlare.call(this);bindEvents.call(this)};this.init()})};$('[data-tilt]').tilt();return!0}));!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});(function($){var defaults={mode:'horizontal',slideSelector:'',infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:'visible',responsive:!0,slideZIndex:50,wrapperClass:'bx-wrapper',touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,ariaLive:!0,ariaHidden:!0,keyboardEnabled:!1,pager:!0,pagerType:'full',pagerShortSeparator:' / ',pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:'Next',prevText:'Prev',nextSelector:null,prevSelector:null,autoControls:!1,startText:'Start',stopText:'Stop',autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4000,autoStart:!0,autoDirection:'next',stopAutoOnClick:!1,autoHover:!1,autoDelay:0,autoSlideForOnePage:!1,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,shrinkItems:!1,onSliderLoad:function(){return!0},onSlideBefore:function(){return!0},onSlideAfter:function(){return!0},onSlideNext:function(){return!0},onSlidePrev:function(){return!0},onSliderResize:function(){return!0}};$.fn.bxSlider=function(options){if(this.length===0){return this}
if(this.length>1){this.each(function(){$(this).bxSlider(options)});return this}
var slider={},el=this,windowWidth=$(window).width(),windowHeight=$(window).height();if($(el).data('bxSlider')){return}
var init=function(){if($(el).data('bxSlider')){return}
slider.settings=$.extend({},defaults,options);slider.settings.slideWidth=parseInt(slider.settings.slideWidth);slider.children=el.children(slider.settings.slideSelector);if(slider.children.length<slider.settings.minSlides){slider.settings.minSlides=slider.children.length}
if(slider.children.length<slider.settings.maxSlides){slider.settings.maxSlides=slider.children.length}
if(slider.settings.randomStart){slider.settings.startSlide=Math.floor(Math.random()*slider.children.length)}
slider.active={index:slider.settings.startSlide};slider.carousel=slider.settings.minSlides>1||slider.settings.maxSlides>1?!0:!1;if(slider.carousel){slider.settings.preloadImages='all'}
slider.minThreshold=(slider.settings.minSlides*slider.settings.slideWidth)+((slider.settings.minSlides-1)*slider.settings.slideMargin);slider.maxThreshold=(slider.settings.maxSlides*slider.settings.slideWidth)+((slider.settings.maxSlides-1)*slider.settings.slideMargin);slider.working=!1;slider.controls={};slider.interval=null;slider.animProp=slider.settings.mode==='vertical'?'top':'left';slider.usingCSS=slider.settings.useCSS&&slider.settings.mode!=='fade'&&(function(){var div=document.createElement('div'),props=['WebkitPerspective','MozPerspective','OPerspective','msPerspective'];for(var i=0;i<props.length;i++){if(div.style[props[i]]!==undefined){slider.cssPrefix=props[i].replace('Perspective','').toLowerCase();slider.animProp='-'+slider.cssPrefix+'-transform';return!0}}
return!1}());if(slider.settings.mode==='vertical'){slider.settings.maxSlides=slider.settings.minSlides}
el.data('origStyle',el.attr('style'));el.children(slider.settings.slideSelector).each(function(){$(this).data('origStyle',$(this).attr('style'))});setup()};var setup=function(){var preloadSelector=slider.children.eq(slider.settings.startSlide);el.wrap('<div class="'+slider.settings.wrapperClass+'"><div class="bx-viewport"></div></div>');slider.viewport=el.parent();if(slider.settings.ariaLive&&!slider.settings.ticker){slider.viewport.attr('aria-live','polite')}
slider.loader=$('<div class="bx-loading" />');slider.viewport.prepend(slider.loader);el.css({width:slider.settings.mode==='horizontal'?(slider.children.length*1000+215)+'%':'auto',position:'relative'});if(slider.usingCSS&&slider.settings.easing){el.css('-'+slider.cssPrefix+'-transition-timing-function',slider.settings.easing)}else if(!slider.settings.easing){slider.settings.easing='swing'}
slider.viewport.css({width:'100%',overflow:'hidden',position:'relative'});slider.viewport.parent().css({maxWidth:getViewportMaxWidth()});slider.children.css({float:slider.settings.mode==='horizontal'?'left':'none',listStyle:'none',position:'relative'});slider.children.css('width',getSlideWidth());if(slider.settings.mode==='horizontal'&&slider.settings.slideMargin>0){slider.children.css('marginRight',slider.settings.slideMargin)}
if(slider.settings.mode==='vertical'&&slider.settings.slideMargin>0){slider.children.css('marginBottom',slider.settings.slideMargin)}
if(slider.settings.mode==='fade'){slider.children.css({position:'absolute',zIndex:0,display:'none'});slider.children.eq(slider.settings.startSlide).css({zIndex:slider.settings.slideZIndex,display:'block'})}
slider.controls.el=$('<div class="bx-controls" />');if(slider.settings.captions){appendCaptions()}
slider.active.last=slider.settings.startSlide===getPagerQty()-1;if(slider.settings.video){el.fitVids()}
if(slider.settings.preloadImages==='all'||slider.settings.ticker){preloadSelector=slider.children}
if(!slider.settings.ticker){if(slider.settings.controls){appendControls()}
if(slider.settings.auto&&slider.settings.autoControls){appendControlsAuto()}
if(slider.settings.pager){appendPager()}
if(slider.settings.controls||slider.settings.autoControls||slider.settings.pager){slider.viewport.after(slider.controls.el)}}else{slider.settings.pager=!1}
loadElements(preloadSelector,start)};var loadElements=function(selector,callback){var total=selector.find('img:not([src=""]), iframe').length,count=0;if(total===0){callback();return}
selector.find('img:not([src=""]), iframe').each(function(){$(this).one('load error',function(){if(++count===total){callback()}}).each(function(){if(this.complete){$(this).trigger('load')}})})};var start=function(){if(slider.settings.infiniteLoop&&slider.settings.mode!=='fade'&&!slider.settings.ticker){var slice=slider.settings.mode==='vertical'?slider.settings.minSlides:slider.settings.maxSlides,sliceAppend=slider.children.slice(0,slice).clone(!0).addClass('bx-clone'),slicePrepend=slider.children.slice(-slice).clone(!0).addClass('bx-clone');if(slider.settings.ariaHidden){sliceAppend.attr('aria-hidden',!0);slicePrepend.attr('aria-hidden',!0)}
el.append(sliceAppend).prepend(slicePrepend)}
slider.loader.remove();setSlidePosition();if(slider.settings.mode==='vertical'){slider.settings.adaptiveHeight=!0}
slider.viewport.height(getViewportHeight());el.redrawSlider();slider.settings.onSliderLoad.call(el,slider.active.index);slider.initialized=!0;if(slider.settings.responsive){$(window).bind('resize',resizeWindow)}
if(slider.settings.auto&&slider.settings.autoStart&&(getPagerQty()>1||slider.settings.autoSlideForOnePage)){initAuto()}
if(slider.settings.ticker){initTicker()}
if(slider.settings.pager){updatePagerActive(slider.settings.startSlide)}
if(slider.settings.controls){updateDirectionControls()}
if(slider.settings.touchEnabled&&!slider.settings.ticker){initTouch()}
if(slider.settings.keyboardEnabled&&!slider.settings.ticker){$(document).keydown(keyPress)}};var getViewportHeight=function(){var height=0;var children=$();if(slider.settings.mode!=='vertical'&&!slider.settings.adaptiveHeight){children=slider.children}else{if(!slider.carousel){children=slider.children.eq(slider.active.index)}else{var currentIndex=slider.settings.moveSlides===1?slider.active.index:slider.active.index*getMoveBy();children=slider.children.eq(currentIndex);for(i=1;i<=slider.settings.maxSlides-1;i++){if(currentIndex+i>=slider.children.length){children=children.add(slider.children.eq(i-1))}else{children=children.add(slider.children.eq(currentIndex+i))}}}}
if(slider.settings.mode==='vertical'){children.each(function(index){height+=$(this).outerHeight()});if(slider.settings.slideMargin>0){height+=slider.settings.slideMargin*(slider.settings.minSlides-1)}}else{height=Math.max.apply(Math,children.map(function(){return $(this).outerHeight(!1)}).get())}
if(slider.viewport.css('box-sizing')==='border-box'){height+=parseFloat(slider.viewport.css('padding-top'))+parseFloat(slider.viewport.css('padding-bottom'))+parseFloat(slider.viewport.css('border-top-width'))+parseFloat(slider.viewport.css('border-bottom-width'))}else if(slider.viewport.css('box-sizing')==='padding-box'){height+=parseFloat(slider.viewport.css('padding-top'))+parseFloat(slider.viewport.css('padding-bottom'))}
return height};var getViewportMaxWidth=function(){var width='100%';if(slider.settings.slideWidth>0){if(slider.settings.mode==='horizontal'){width=(slider.settings.maxSlides*slider.settings.slideWidth)+((slider.settings.maxSlides-1)*slider.settings.slideMargin)}else{width=slider.settings.slideWidth}}
return width};var getSlideWidth=function(){var newElWidth=slider.settings.slideWidth,wrapWidth=slider.viewport.width();if(slider.settings.slideWidth===0||(slider.settings.slideWidth>wrapWidth&&!slider.carousel)||slider.settings.mode==='vertical'){newElWidth=wrapWidth}else if(slider.settings.maxSlides>1&&slider.settings.mode==='horizontal'){if(wrapWidth>slider.maxThreshold){return newElWidth}else if(wrapWidth<slider.minThreshold){newElWidth=(wrapWidth-(slider.settings.slideMargin*(slider.settings.minSlides-1)))/slider.settings.minSlides}else if(slider.settings.shrinkItems){newElWidth=Math.floor((wrapWidth+slider.settings.slideMargin)/(Math.ceil((wrapWidth+slider.settings.slideMargin)/(newElWidth+slider.settings.slideMargin)))-slider.settings.slideMargin)}}
return newElWidth};var getNumberSlidesShowing=function(){var slidesShowing=1,childWidth=null;if(slider.settings.mode==='horizontal'&&slider.settings.slideWidth>0){if(slider.viewport.width()<slider.minThreshold){slidesShowing=slider.settings.minSlides}else if(slider.viewport.width()>slider.maxThreshold){slidesShowing=slider.settings.maxSlides}else{childWidth=slider.children.first().width()+slider.settings.slideMargin;slidesShowing=Math.floor((slider.viewport.width()+slider.settings.slideMargin)/childWidth)}}else if(slider.settings.mode==='vertical'){slidesShowing=slider.settings.minSlides}
return slidesShowing};var getPagerQty=function(){var pagerQty=0,breakPoint=0,counter=0;if(slider.settings.moveSlides>0){if(slider.settings.infiniteLoop){pagerQty=Math.ceil(slider.children.length/getMoveBy())}else{while(breakPoint<slider.children.length){++pagerQty;breakPoint=counter+getNumberSlidesShowing();counter+=slider.settings.moveSlides<=getNumberSlidesShowing()?slider.settings.moveSlides:getNumberSlidesShowing()}}}else{pagerQty=Math.ceil(slider.children.length/getNumberSlidesShowing())}
return pagerQty};var getMoveBy=function(){if(slider.settings.moveSlides>0&&slider.settings.moveSlides<=getNumberSlidesShowing()){return slider.settings.moveSlides}
return getNumberSlidesShowing()};var setSlidePosition=function(){var position,lastChild,lastShowingIndex;if(slider.children.length>slider.settings.maxSlides&&slider.active.last&&!slider.settings.infiniteLoop){if(slider.settings.mode==='horizontal'){lastChild=slider.children.last();position=lastChild.position();setPositionProperty(-(position.left-(slider.viewport.width()-lastChild.outerWidth())),'reset',0)}else if(slider.settings.mode==='vertical'){lastShowingIndex=slider.children.length-slider.settings.minSlides;position=slider.children.eq(lastShowingIndex).position();setPositionProperty(-position.top,'reset',0)}}else{position=slider.children.eq(slider.active.index*getMoveBy()).position();if(slider.active.index===getPagerQty()-1){slider.active.last=!0}
if(position!==undefined){if(slider.settings.mode==='horizontal'){setPositionProperty(-position.left,'reset',0)}
else if(slider.settings.mode==='vertical'){setPositionProperty(-position.top,'reset',0)}}}};var setPositionProperty=function(value,type,duration,params){var animateObj,propValue;if(slider.usingCSS){propValue=slider.settings.mode==='vertical'?'translate3d(0, '+value+'px, 0)':'translate3d('+value+'px, 0, 0)';el.css('-'+slider.cssPrefix+'-transition-duration',duration/1000+'s');if(type==='slide'){el.css(slider.animProp,propValue);if(duration!==0){el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(e){if(!$(e.target).is(el)){return}
el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');updateAfterSlideTransition()})}else{updateAfterSlideTransition()}}else if(type==='reset'){el.css(slider.animProp,propValue)}else if(type==='ticker'){el.css('-'+slider.cssPrefix+'-transition-timing-function','linear');el.css(slider.animProp,propValue);if(duration!==0){el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(e){if(!$(e.target).is(el)){return}
el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');setPositionProperty(params.resetValue,'reset',0);tickerLoop()})}else{setPositionProperty(params.resetValue,'reset',0);tickerLoop()}}}else{animateObj={};animateObj[slider.animProp]=value;if(type==='slide'){el.animate(animateObj,duration,slider.settings.easing,function(){updateAfterSlideTransition()})}else if(type==='reset'){el.css(slider.animProp,value)}else if(type==='ticker'){el.animate(animateObj,duration,'linear',function(){setPositionProperty(params.resetValue,'reset',0);tickerLoop()})}}};var populatePager=function(){var pagerHtml='',linkContent='',pagerQty=getPagerQty();for(var i=0;i<pagerQty;i++){linkContent='';if(slider.settings.buildPager&&$.isFunction(slider.settings.buildPager)||slider.settings.pagerCustom){linkContent=slider.settings.buildPager(i);slider.pagerEl.addClass('bx-custom-pager')}else{linkContent=i+1;slider.pagerEl.addClass('bx-default-pager')}
pagerHtml+='<div class="bx-pager-item"><a href="" data-slide-index="'+i+'" class="bx-pager-link">'+linkContent+'</a></div>'}
slider.pagerEl.html(pagerHtml)};var appendPager=function(){if(!slider.settings.pagerCustom){slider.pagerEl=$('<div class="bx-pager" />');if(slider.settings.pagerSelector){$(slider.settings.pagerSelector).html(slider.pagerEl)}else{slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl)}
populatePager()}else{slider.pagerEl=$(slider.settings.pagerCustom)}
slider.pagerEl.on('click touchend','a',clickPagerBind)};var appendControls=function(){slider.controls.next=$('<a class="bx-next" href="">'+slider.settings.nextText+'</a>');slider.controls.prev=$('<a class="bx-prev" href="">'+slider.settings.prevText+'</a>');slider.controls.next.bind('click touchend',clickNextBind);slider.controls.prev.bind('click touchend',clickPrevBind);if(slider.settings.nextSelector){$(slider.settings.nextSelector).append(slider.controls.next)}
if(slider.settings.prevSelector){$(slider.settings.prevSelector).append(slider.controls.prev)}
if(!slider.settings.nextSelector&&!slider.settings.prevSelector){slider.controls.directionEl=$('<div class="bx-controls-direction" />');slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl)}};var appendControlsAuto=function(){slider.controls.start=$('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+slider.settings.startText+'</a></div>');slider.controls.stop=$('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+slider.settings.stopText+'</a></div>');slider.controls.autoEl=$('<div class="bx-controls-auto" />');slider.controls.autoEl.on('click','.bx-start',clickStartBind);slider.controls.autoEl.on('click','.bx-stop',clickStopBind);if(slider.settings.autoControlsCombine){slider.controls.autoEl.append(slider.controls.start)}else{slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop)}
if(slider.settings.autoControlsSelector){$(slider.settings.autoControlsSelector).html(slider.controls.autoEl)}else{slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl)}
updateAutoControls(slider.settings.autoStart?'stop':'start')};var appendCaptions=function(){slider.children.each(function(index){var title=$(this).find('img:first').attr('title');if(title!==undefined&&(''+title).length){$(this).append('<div class="bx-caption"><span>'+title+'</span></div>')}})};var clickNextBind=function(e){e.preventDefault();if(slider.controls.el.hasClass('disabled')){return}
if(slider.settings.auto&&slider.settings.stopAutoOnClick){el.stopAuto()}
el.goToNextSlide()};var clickPrevBind=function(e){e.preventDefault();if(slider.controls.el.hasClass('disabled')){return}
if(slider.settings.auto&&slider.settings.stopAutoOnClick){el.stopAuto()}
el.goToPrevSlide()};var clickStartBind=function(e){el.startAuto();e.preventDefault()};var clickStopBind=function(e){el.stopAuto();e.preventDefault()};var clickPagerBind=function(e){var pagerLink,pagerIndex;e.preventDefault();if(slider.controls.el.hasClass('disabled')){return}
if(slider.settings.auto&&slider.settings.stopAutoOnClick){el.stopAuto()}
pagerLink=$(e.currentTarget);if(pagerLink.attr('data-slide-index')!==undefined){pagerIndex=parseInt(pagerLink.attr('data-slide-index'));if(pagerIndex!==slider.active.index){el.goToSlide(pagerIndex)}}};var updatePagerActive=function(slideIndex){var len=slider.children.length;if(slider.settings.pagerType==='short'){if(slider.settings.maxSlides>1){len=Math.ceil(slider.children.length/slider.settings.maxSlides)}
slider.pagerEl.html((slideIndex+1)+slider.settings.pagerShortSeparator+len);return}
slider.pagerEl.find('a').removeClass('active');slider.pagerEl.each(function(i,el){$(el).find('a').eq(slideIndex).addClass('active')})};var updateAfterSlideTransition=function(){if(slider.settings.infiniteLoop){var position='';if(slider.active.index===0){position=slider.children.eq(0).position()}else if(slider.active.index===getPagerQty()-1&&slider.carousel){position=slider.children.eq((getPagerQty()-1)*getMoveBy()).position()}else if(slider.active.index===slider.children.length-1){position=slider.children.eq(slider.children.length-1).position()}
if(position){if(slider.settings.mode==='horizontal'){setPositionProperty(-position.left,'reset',0)}
else if(slider.settings.mode==='vertical'){setPositionProperty(-position.top,'reset',0)}}}
slider.working=!1;slider.settings.onSlideAfter.call(el,slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index)};var updateAutoControls=function(state){if(slider.settings.autoControlsCombine){slider.controls.autoEl.html(slider.controls[state])}else{slider.controls.autoEl.find('a').removeClass('active');slider.controls.autoEl.find('a:not(.bx-'+state+')').addClass('active')}};var updateDirectionControls=function(){if(getPagerQty()===1){slider.controls.prev.addClass('disabled');slider.controls.next.addClass('disabled')}else if(!slider.settings.infiniteLoop&&slider.settings.hideControlOnEnd){if(slider.active.index===0){slider.controls.prev.addClass('disabled');slider.controls.next.removeClass('disabled')}else if(slider.active.index===getPagerQty()-1){slider.controls.next.addClass('disabled');slider.controls.prev.removeClass('disabled')}else{slider.controls.prev.removeClass('disabled');slider.controls.next.removeClass('disabled')}}};var initAuto=function(){if(slider.settings.autoDelay>0){var timeout=setTimeout(el.startAuto,slider.settings.autoDelay)}else{el.startAuto();$(window).focus(function(){el.startAuto()}).blur(function(){el.stopAuto()})}
if(slider.settings.autoHover){el.hover(function(){if(slider.interval){el.stopAuto(!0);slider.autoPaused=!0}},function(){if(slider.autoPaused){el.startAuto(!0);slider.autoPaused=null}})}};var initTicker=function(){var startPosition=0,position,transform,value,idx,ratio,property,newSpeed,totalDimens;if(slider.settings.autoDirection==='next'){el.append(slider.children.clone().addClass('bx-clone'))}else{el.prepend(slider.children.clone().addClass('bx-clone'));position=slider.children.first().position();startPosition=slider.settings.mode==='horizontal'?-position.left:-position.top}
setPositionProperty(startPosition,'reset',0);slider.settings.pager=!1;slider.settings.controls=!1;slider.settings.autoControls=!1;if(slider.settings.tickerHover){if(slider.usingCSS){idx=slider.settings.mode==='horizontal'?4:5;slider.viewport.hover(function(){transform=el.css('-'+slider.cssPrefix+'-transform');value=parseFloat(transform.split(',')[idx]);setPositionProperty(value,'reset',0)},function(){totalDimens=0;slider.children.each(function(index){totalDimens+=slider.settings.mode==='horizontal'?$(this).outerWidth(!0):$(this).outerHeight(!0)});ratio=slider.settings.speed/totalDimens;property=slider.settings.mode==='horizontal'?'left':'top';newSpeed=ratio*(totalDimens-(Math.abs(parseInt(value))));tickerLoop(newSpeed)})}else{slider.viewport.hover(function(){el.stop()},function(){totalDimens=0;slider.children.each(function(index){totalDimens+=slider.settings.mode==='horizontal'?$(this).outerWidth(!0):$(this).outerHeight(!0)});ratio=slider.settings.speed/totalDimens;property=slider.settings.mode==='horizontal'?'left':'top';newSpeed=ratio*(totalDimens-(Math.abs(parseInt(el.css(property)))));tickerLoop(newSpeed)})}}
tickerLoop()};var tickerLoop=function(resumeSpeed){var speed=resumeSpeed?resumeSpeed:slider.settings.speed,position={left:0,top:0},reset={left:0,top:0},animateProperty,resetValue,params;if(slider.settings.autoDirection==='next'){position=el.find('.bx-clone').first().position()}else{reset=slider.children.first().position()}
animateProperty=slider.settings.mode==='horizontal'?-position.left:-position.top;resetValue=slider.settings.mode==='horizontal'?-reset.left:-reset.top;params={resetValue:resetValue};setPositionProperty(animateProperty,'ticker',speed,params)};var isOnScreen=function(el){var win=$(window),viewport={top:win.scrollTop(),left:win.scrollLeft()},bounds=el.offset();viewport.right=viewport.left+win.width();viewport.bottom=viewport.top+win.height();bounds.right=bounds.left+el.outerWidth();bounds.bottom=bounds.top+el.outerHeight();return(!(viewport.right<bounds.left||viewport.left>bounds.right||viewport.bottom<bounds.top||viewport.top>bounds.bottom))};var keyPress=function(e){var activeElementTag=document.activeElement.tagName.toLowerCase(),tagFilters='input|textarea',p=new RegExp(activeElementTag,['i']),result=p.exec(tagFilters);if(result==null&&isOnScreen(el)){if(e.keyCode===39){clickNextBind(e);return!1}else if(e.keyCode===37){clickPrevBind(e);return!1}}};var initTouch=function(){slider.touch={start:{x:0,y:0},end:{x:0,y:0}};slider.viewport.bind('touchstart MSPointerDown pointerdown',onTouchStart);slider.viewport.on('click','.bxslider a',function(e){if(slider.viewport.hasClass('click-disabled')){e.preventDefault();slider.viewport.removeClass('click-disabled')}})};var onTouchStart=function(e){slider.controls.el.addClass('disabled');if(slider.working){e.preventDefault();slider.controls.el.removeClass('disabled')}else{slider.touch.originalPos=el.position();var orig=e.originalEvent,touchPoints=(typeof orig.changedTouches!=='undefined')?orig.changedTouches:[orig];slider.touch.start.x=touchPoints[0].pageX;slider.touch.start.y=touchPoints[0].pageY;if(slider.viewport.get(0).setPointerCapture){slider.pointerId=orig.pointerId;slider.viewport.get(0).setPointerCapture(slider.pointerId)}
slider.viewport.bind('touchmove MSPointerMove pointermove',onTouchMove);slider.viewport.bind('touchend MSPointerUp pointerup',onTouchEnd);slider.viewport.bind('MSPointerCancel pointercancel',onPointerCancel)}};var onPointerCancel=function(e){setPositionProperty(slider.touch.originalPos.left,'reset',0);slider.controls.el.removeClass('disabled');slider.viewport.unbind('MSPointerCancel pointercancel',onPointerCancel);slider.viewport.unbind('touchmove MSPointerMove pointermove',onTouchMove);slider.viewport.unbind('touchend MSPointerUp pointerup',onTouchEnd);if(slider.viewport.get(0).releasePointerCapture){slider.viewport.get(0).releasePointerCapture(slider.pointerId)}};var onTouchMove=function(e){var orig=e.originalEvent,touchPoints=(typeof orig.changedTouches!=='undefined')?orig.changedTouches:[orig],xMovement=Math.abs(touchPoints[0].pageX-slider.touch.start.x),yMovement=Math.abs(touchPoints[0].pageY-slider.touch.start.y),value=0,change=0;if((xMovement*3)>yMovement&&slider.settings.preventDefaultSwipeX){e.preventDefault()}else if((yMovement*3)>xMovement&&slider.settings.preventDefaultSwipeY){e.preventDefault()}
if(slider.settings.mode!=='fade'&&slider.settings.oneToOneTouch){if(slider.settings.mode==='horizontal'){change=touchPoints[0].pageX-slider.touch.start.x;value=slider.touch.originalPos.left+change}else{change=touchPoints[0].pageY-slider.touch.start.y;value=slider.touch.originalPos.top+change}
setPositionProperty(value,'reset',0)}};var onTouchEnd=function(e){slider.viewport.unbind('touchmove MSPointerMove pointermove',onTouchMove);slider.controls.el.removeClass('disabled');var orig=e.originalEvent,touchPoints=(typeof orig.changedTouches!=='undefined')?orig.changedTouches:[orig],value=0,distance=0;slider.touch.end.x=touchPoints[0].pageX;slider.touch.end.y=touchPoints[0].pageY;if(slider.settings.mode==='fade'){distance=Math.abs(slider.touch.start.x-slider.touch.end.x);if(distance>=slider.settings.swipeThreshold){if(slider.touch.start.x>slider.touch.end.x){el.goToNextSlide()}else{el.goToPrevSlide()}
el.stopAuto()}}else{if(slider.settings.mode==='horizontal'){distance=slider.touch.end.x-slider.touch.start.x;value=slider.touch.originalPos.left}else{distance=slider.touch.end.y-slider.touch.start.y;value=slider.touch.originalPos.top}
if(!slider.settings.infiniteLoop&&((slider.active.index===0&&distance>0)||(slider.active.last&&distance<0))){setPositionProperty(value,'reset',200)}else{if(Math.abs(distance)>=slider.settings.swipeThreshold){if(distance<0){el.goToNextSlide()}else{el.goToPrevSlide()}
el.stopAuto()}else{setPositionProperty(value,'reset',200)}}}
slider.viewport.unbind('touchend MSPointerUp pointerup',onTouchEnd);if(slider.viewport.get(0).releasePointerCapture){slider.viewport.get(0).releasePointerCapture(slider.pointerId)}};var resizeWindow=function(e){if(!slider.initialized){return}
if(slider.working){window.setTimeout(resizeWindow,10)}else{var windowWidthNew=$(window).width(),windowHeightNew=$(window).height();if(windowWidth!==windowWidthNew||windowHeight!==windowHeightNew){windowWidth=windowWidthNew;windowHeight=windowHeightNew;el.redrawSlider();slider.settings.onSliderResize.call(el,slider.active.index)}}};var applyAriaHiddenAttributes=function(startVisibleIndex){var numberOfSlidesShowing=getNumberSlidesShowing();if(slider.settings.ariaHidden&&!slider.settings.ticker){slider.children.attr('aria-hidden','true');slider.children.slice(startVisibleIndex,startVisibleIndex+numberOfSlidesShowing).attr('aria-hidden','false')}};var setSlideIndex=function(slideIndex){if(slideIndex<0){if(slider.settings.infiniteLoop){return getPagerQty()-1}else{return slider.active.index}}else if(slideIndex>=getPagerQty()){if(slider.settings.infiniteLoop){return 0}else{return slider.active.index}}else{return slideIndex}};el.goToSlide=function(slideIndex,direction){var performTransition=!0,moveBy=0,position={left:0,top:0},lastChild=null,lastShowingIndex,eq,value,requestEl;slider.oldIndex=slider.active.index;slider.active.index=setSlideIndex(slideIndex);if(slider.working||slider.active.index===slider.oldIndex){return}
slider.working=!0;performTransition=slider.settings.onSlideBefore.call(el,slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index);if(typeof(performTransition)!=='undefined'&&!performTransition){slider.active.index=slider.oldIndex;slider.working=!1;return}
if(direction==='next'){if(!slider.settings.onSlideNext.call(el,slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index)){performTransition=!1}}else if(direction==='prev'){if(!slider.settings.onSlidePrev.call(el,slider.children.eq(slider.active.index),slider.oldIndex,slider.active.index)){performTransition=!1}}
slider.active.last=slider.active.index>=getPagerQty()-1;if(slider.settings.pager||slider.settings.pagerCustom){updatePagerActive(slider.active.index)}
if(slider.settings.controls){updateDirectionControls()}
if(slider.settings.mode==='fade'){if(slider.settings.adaptiveHeight&&slider.viewport.height()!==getViewportHeight()){slider.viewport.animate({height:getViewportHeight()},slider.settings.adaptiveHeightSpeed)}
slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex:0});slider.children.eq(slider.active.index).css('zIndex',slider.settings.slideZIndex+1).fadeIn(slider.settings.speed,function(){$(this).css('zIndex',slider.settings.slideZIndex);updateAfterSlideTransition()})}else{if(slider.settings.adaptiveHeight&&slider.viewport.height()!==getViewportHeight()){slider.viewport.animate({height:getViewportHeight()},slider.settings.adaptiveHeightSpeed)}
if(!slider.settings.infiniteLoop&&slider.carousel&&slider.active.last){if(slider.settings.mode==='horizontal'){lastChild=slider.children.eq(slider.children.length-1);position=lastChild.position();moveBy=slider.viewport.width()-lastChild.outerWidth()}else{lastShowingIndex=slider.children.length-slider.settings.minSlides;position=slider.children.eq(lastShowingIndex).position()}}else if(slider.carousel&&slider.active.last&&direction==='prev'){eq=slider.settings.moveSlides===1?slider.settings.maxSlides-getMoveBy():((getPagerQty()-1)*getMoveBy())-(slider.children.length-slider.settings.maxSlides);lastChild=el.children('.bx-clone').eq(eq);position=lastChild.position()}else if(direction==='next'&&slider.active.index===0){position=el.find('> .bx-clone').eq(slider.settings.maxSlides).position();slider.active.last=!1}else if(slideIndex>=0){requestEl=slideIndex*parseInt(getMoveBy());position=slider.children.eq(requestEl).position()}
if(typeof(position)!=='undefined'){value=slider.settings.mode==='horizontal'?-(position.left-moveBy):-position.top;setPositionProperty(value,'slide',slider.settings.speed)}else{slider.working=!1}}
if(slider.settings.ariaHidden){applyAriaHiddenAttributes(slider.active.index*getMoveBy())}};el.goToNextSlide=function(){if(!slider.settings.infiniteLoop&&slider.active.last){return}
var pagerIndex=parseInt(slider.active.index)+1;el.goToSlide(pagerIndex,'next')};el.goToPrevSlide=function(){if(!slider.settings.infiniteLoop&&slider.active.index===0){return}
var pagerIndex=parseInt(slider.active.index)-1;el.goToSlide(pagerIndex,'prev')};el.startAuto=function(preventControlUpdate){if(slider.interval){return}
slider.interval=setInterval(function(){if(slider.settings.autoDirection==='next'){el.goToNextSlide()}else{el.goToPrevSlide()}},slider.settings.pause);if(slider.settings.autoControls&&preventControlUpdate!==!0){updateAutoControls('stop')}};el.stopAuto=function(preventControlUpdate){if(!slider.interval){return}
clearInterval(slider.interval);slider.interval=null;if(slider.settings.autoControls&&preventControlUpdate!==!0){updateAutoControls('start')}};el.getCurrentSlide=function(){return slider.active.index};el.getCurrentSlideElement=function(){return slider.children.eq(slider.active.index)};el.getSlideElement=function(index){return slider.children.eq(index)};el.getSlideCount=function(){return slider.children.length};el.isWorking=function(){return slider.working};el.redrawSlider=function(){slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());slider.viewport.css('height',getViewportHeight());if(!slider.settings.ticker){setSlidePosition()}
if(slider.active.last){slider.active.index=getPagerQty()-1}
if(slider.active.index>=getPagerQty()){slider.active.last=!0}
if(slider.settings.pager&&!slider.settings.pagerCustom){populatePager();updatePagerActive(slider.active.index)}
if(slider.settings.ariaHidden){applyAriaHiddenAttributes(slider.active.index*getMoveBy())}};el.destroySlider=function(){if(!slider.initialized){return}
slider.initialized=!1;$('.bx-clone',this).remove();slider.children.each(function(){if($(this).data('origStyle')!==undefined){$(this).attr('style',$(this).data('origStyle'))}else{$(this).removeAttr('style')}});if($(this).data('origStyle')!==undefined){this.attr('style',$(this).data('origStyle'))}else{$(this).removeAttr('style')}
$(this).unwrap().unwrap();if(slider.controls.el){slider.controls.el.remove()}
if(slider.controls.next){slider.controls.next.remove()}
if(slider.controls.prev){slider.controls.prev.remove()}
if(slider.pagerEl&&slider.settings.controls&&!slider.settings.pagerCustom){slider.pagerEl.remove()}
$('.bx-caption',this).remove();if(slider.controls.autoEl){slider.controls.autoEl.remove()}
clearInterval(slider.interval);if(slider.settings.responsive){$(window).unbind('resize',resizeWindow)}
if(slider.settings.keyboardEnabled){$(document).unbind('keydown',keyPress)}
$(this).removeData('bxSlider')};el.reloadSlider=function(settings){if(settings!==undefined){options=settings}
el.destroySlider();init();$(el).data('bxSlider',this)};init();$(el).data('bxSlider',this);return this}})(jQuery);function wavify(wave_element,options){if("undefined"===typeof options)options={};var settings=Object.assign({},{container:options.container?options.container:"body",height:200,amplitude:100,speed:0.15,bones:3,color:"rgba(255,255,255, 0.20)"},options);var wave=wave_element,width=document.querySelector(settings.container).getBoundingClientRect().width,height=document.querySelector(settings.container).getBoundingClientRect().height,points=[],lastUpdate,totalTime=0,animationInstance=!1,tweenMaxInstance=!1;function rebuilSettings(params){settings=Object.assign({},settings,params)}
function drawPoints(factor){var points=[];for(var i=0;i<=settings.bones;i++){var x=(i/settings.bones)*width;var sinSeed=(factor+(i+(i%settings.bones)))*settings.speed*100;var sinHeight=Math.sin(sinSeed/100)*settings.amplitude;var yPos=Math.sin(sinSeed/100)*sinHeight+settings.height;points.push({x:x,y:yPos})}
return points}
function drawPath(points){var SVGString="M "+points[0].x+" "+points[0].y;var cp0={x:(points[1].x-points[0].x)/2,y:points[1].y-points[0].y+points[0].y+(points[1].y-points[0].y)};SVGString+=" C "+cp0.x+" "+cp0.y+" "+cp0.x+" "+cp0.y+" "+points[1].x+" "+points[1].y;var prevCp=cp0;var inverted=-1;for(var i=1;i<points.length-1;i++){var cpLength=Math.sqrt(prevCp.x*prevCp.x+prevCp.y*prevCp.y);var cp1={x:points[i].x-prevCp.x+points[i].x,y:points[i].y-prevCp.y+points[i].y};SVGString+=" C "+cp1.x+" "+cp1.y+" "+cp1.x+" "+cp1.y+" "+points[i+1].x+" "+points[i+1].y;prevCp=cp1;inverted=-inverted}
SVGString+=" L "+width+" "+height;SVGString+=" L 0 "+height+" Z";return SVGString}
function draw(){var now=window.Date.now();if(lastUpdate){var elapsed=(now-lastUpdate)/1000;lastUpdate=now;totalTime+=elapsed;var factor=totalTime*Math.PI;tweenMaxInstance=TweenMax.to(wave,settings.speed,{attr:{d:drawPath(drawPoints(factor))},ease:Power1.easeInOut})}else{lastUpdate=now}
animationInstance=requestAnimationFrame(draw)}
function debounce(func,wait,immediate){var timeout;return function(){var context=this,args=arguments;clearTimeout(timeout);timeout=setTimeout(function(){timeout=null;if(!immediate)func.apply(context,args)},wait);if(immediate&&!timeout)func.apply(context,args)}}
var redraw=debounce(function(){pause();points=[];totalTime=0;width=document.querySelector(settings.container).getBoundingClientRect().width;height=document.querySelector(settings.container).getBoundingClientRect().height;lastUpdate=!1;play()},250);function boot(){if(!animationInstance){tweenMaxInstance=TweenMax.set(wave,{attr:{fill:settings.color}});play();window.addEventListener("resize",redraw)}}
function reboot(options){kill();if(typeof options!==undefined){rebuilSettings(options)}
tweenMaxInstance=TweenMax.set(wave,{attr:{fill:settings.color}});play();window.addEventListener("resize",redraw)}
function play(){if(!animationInstance){animationInstance=requestAnimationFrame(draw)}}
function pause(){if(animationInstance){cancelAnimationFrame(animationInstance);animationInstance=!1}}
function updateColor(options){if(typeof options.timing===undefined){options.timing=1}
if(typeof options.color===undefined){options.color=settings.color}
tweenMaxInstance=TweenMax.to(wave,parseInt(options.timing),{attr:{fill:options.color},onComplete:function(){if(typeof options.onComplete!==undefined&&{}.toString.call(options.onComplete)==="[object Function]"){options.onComplete()}}})}
function kill(){if(animationInstance){pause();tweenMaxInstance.kill();tweenMaxInstance=TweenMax.set(wave,{x:0,y:0,rotation:0,opacity:0,clearProps:"all",attr:{d:"M0,0",fill:""}});window.removeEventListener("resize",redraw);animationInstance=!1}}
boot();return{reboot:reboot,play:play,pause:pause,kill:kill,updateColor:updateColor}}(function($){$.fn.wavify=function(options){if('function'!==typeof wavify)
{console.error("wavify is not a function. Be sure to include 'wavify.js' before you include 'jquery.wavify.js'.")
throw("Error: wavify is not a function")}
return wavify(this,options)}}(jQuery));(function(window,factory){if(typeof define=='function'&&define.amd){define('jquery-bridget/jquery-bridget',['jquery'],function(jQuery){return factory(window,jQuery)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('jquery'))}else{window.jQueryBridget=factory(window,window.jQuery)}}(window,function factory(window,jQuery){'use strict';var arraySlice=Array.prototype.slice;var console=window.console;var logError=typeof console=='undefined'?function(){}:function(message){console.error(message)};function jQueryBridget(namespace,PluginClass,$){$=$||jQuery||window.jQuery;if(!$){return}
if(!PluginClass.prototype.option){PluginClass.prototype.option=function(opts){if(!$.isPlainObject(opts)){return}
this.options=$.extend(!0,this.options,opts)}}
$.fn[namespace]=function(arg0){if(typeof arg0=='string'){var args=arraySlice.call(arguments,1);return methodCall(this,arg0,args)}
plainCall(this,arg0);return this};function methodCall($elems,methodName,args){var returnValue;var pluginMethodStr='$().'+namespace+'("'+methodName+'")';$elems.each(function(i,elem){var instance=$.data(elem,namespace);if(!instance){logError(namespace+' not initialized. Cannot call methods, i.e. '+pluginMethodStr);return}
var method=instance[methodName];if(!method||methodName.charAt(0)=='_'){logError(pluginMethodStr+' is not a valid method');return}
var value=method.apply(instance,args);returnValue=returnValue===undefined?value:returnValue});return returnValue!==undefined?returnValue:$elems}
function plainCall($elems,options){$elems.each(function(i,elem){var instance=$.data(elem,namespace);if(instance){instance.option(options);instance._init()}else{instance=new PluginClass(elem,options);$.data(elem,namespace,instance)}})}
updateJQuery($)}
function updateJQuery($){if(!$||($&&$.bridget)){return}
$.bridget=jQueryBridget}
updateJQuery(jQuery||window.jQuery);return jQueryBridget}));(function(global,factory){if(typeof define=='function'&&define.amd){define('ev-emitter/ev-emitter',factory)}else if(typeof module=='object'&&module.exports){module.exports=factory()}else{global.EvEmitter=factory()}}(typeof window!='undefined'?window:this,function(){function EvEmitter(){}
var proto=EvEmitter.prototype;proto.on=function(eventName,listener){if(!eventName||!listener){return}
var events=this._events=this._events||{};var listeners=events[eventName]=events[eventName]||[];if(listeners.indexOf(listener)==-1){listeners.push(listener)}
return this};proto.once=function(eventName,listener){if(!eventName||!listener){return}
this.on(eventName,listener);var onceEvents=this._onceEvents=this._onceEvents||{};var onceListeners=onceEvents[eventName]=onceEvents[eventName]||{};onceListeners[listener]=!0;return this};proto.off=function(eventName,listener){var listeners=this._events&&this._events[eventName];if(!listeners||!listeners.length){return}
var index=listeners.indexOf(listener);if(index!=-1){listeners.splice(index,1)}
return this};proto.emitEvent=function(eventName,args){var listeners=this._events&&this._events[eventName];if(!listeners||!listeners.length){return}
listeners=listeners.slice(0);args=args||[];var onceListeners=this._onceEvents&&this._onceEvents[eventName];for(var i=0;i<listeners.length;i++){var listener=listeners[i]
var isOnce=onceListeners&&onceListeners[listener];if(isOnce){this.off(eventName,listener);delete onceListeners[listener]}
listener.apply(this,args)}
return this};proto.allOff=function(){delete this._events;delete this._onceEvents};return EvEmitter}));(function(window,factory){if(typeof define=='function'&&define.amd){define('get-size/get-size',factory)}else if(typeof module=='object'&&module.exports){module.exports=factory()}else{window.getSize=factory()}})(window,function factory(){'use strict';function getStyleSize(value){var num=parseFloat(value);var isValid=value.indexOf('%')==-1&&!isNaN(num);return isValid&&num}
function noop(){}
var logError=typeof console=='undefined'?noop:function(message){console.error(message)};var measurements=['paddingLeft','paddingRight','paddingTop','paddingBottom','marginLeft','marginRight','marginTop','marginBottom','borderLeftWidth','borderRightWidth','borderTopWidth','borderBottomWidth'];var measurementsLength=measurements.length;function getZeroSize(){var size={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0};for(var i=0;i<measurementsLength;i++){var measurement=measurements[i];size[measurement]=0}
return size}
function getStyle(elem){var style=getComputedStyle(elem);if(!style){logError('Style returned '+style+'. Are you running this code in a hidden iframe on Firefox? '+'See https://bit.ly/getsizebug1')}
return style}
var isSetup=!1;var isBoxSizeOuter;function setup(){if(isSetup){return}
isSetup=!0;var div=document.createElement('div');div.style.width='200px';div.style.padding='1px 2px 3px 4px';div.style.borderStyle='solid';div.style.borderWidth='1px 2px 3px 4px';div.style.boxSizing='border-box';var body=document.body||document.documentElement;body.appendChild(div);var style=getStyle(div);isBoxSizeOuter=Math.round(getStyleSize(style.width))==200;getSize.isBoxSizeOuter=isBoxSizeOuter;body.removeChild(div)}
function getSize(elem){setup();if(typeof elem=='string'){elem=document.querySelector(elem)}
if(!elem||typeof elem!='object'||!elem.nodeType){return}
var style=getStyle(elem);if(style.display=='none'){return getZeroSize()}
var size={};size.width=elem.offsetWidth;size.height=elem.offsetHeight;var isBorderBox=size.isBorderBox=style.boxSizing=='border-box';for(var i=0;i<measurementsLength;i++){var measurement=measurements[i];var value=style[measurement];var num=parseFloat(value);size[measurement]=!isNaN(num)?num:0}
var paddingWidth=size.paddingLeft+size.paddingRight;var paddingHeight=size.paddingTop+size.paddingBottom;var marginWidth=size.marginLeft+size.marginRight;var marginHeight=size.marginTop+size.marginBottom;var borderWidth=size.borderLeftWidth+size.borderRightWidth;var borderHeight=size.borderTopWidth+size.borderBottomWidth;var isBorderBoxSizeOuter=isBorderBox&&isBoxSizeOuter;var styleWidth=getStyleSize(style.width);if(styleWidth!==!1){size.width=styleWidth+(isBorderBoxSizeOuter?0:paddingWidth+borderWidth)}
var styleHeight=getStyleSize(style.height);if(styleHeight!==!1){size.height=styleHeight+(isBorderBoxSizeOuter?0:paddingHeight+borderHeight)}
size.innerWidth=size.width-(paddingWidth+borderWidth);size.innerHeight=size.height-(paddingHeight+borderHeight);size.outerWidth=size.width+marginWidth;size.outerHeight=size.height+marginHeight;return size}
return getSize});(function(window,factory){'use strict';if(typeof define=='function'&&define.amd){define('desandro-matches-selector/matches-selector',factory)}else if(typeof module=='object'&&module.exports){module.exports=factory()}else{window.matchesSelector=factory()}}(window,function factory(){'use strict';var matchesMethod=(function(){var ElemProto=window.Element.prototype;if(ElemProto.matches){return'matches'}
if(ElemProto.matchesSelector){return'matchesSelector'}
var prefixes=['webkit','moz','ms','o'];for(var i=0;i<prefixes.length;i++){var prefix=prefixes[i];var method=prefix+'MatchesSelector';if(ElemProto[method]){return method}}})();return function matchesSelector(elem,selector){return elem[matchesMethod](selector)}}));(function(window,factory){if(typeof define=='function'&&define.amd){define('fizzy-ui-utils/utils',['desandro-matches-selector/matches-selector'],function(matchesSelector){return factory(window,matchesSelector)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('desandro-matches-selector'))}else{window.fizzyUIUtils=factory(window,window.matchesSelector)}}(window,function factory(window,matchesSelector){var utils={};utils.extend=function(a,b){for(var prop in b){a[prop]=b[prop]}
return a};utils.modulo=function(num,div){return((num%div)+div)%div};var arraySlice=Array.prototype.slice;utils.makeArray=function(obj){if(Array.isArray(obj)){return obj}
if(obj===null||obj===undefined){return[]}
var isArrayLike=typeof obj=='object'&&typeof obj.length=='number';if(isArrayLike){return arraySlice.call(obj)}
return[obj]};utils.removeFrom=function(ary,obj){var index=ary.indexOf(obj);if(index!=-1){ary.splice(index,1)}};utils.getParent=function(elem,selector){while(elem.parentNode&&elem!=document.body){elem=elem.parentNode;if(matchesSelector(elem,selector)){return elem}}};utils.getQueryElement=function(elem){if(typeof elem=='string'){return document.querySelector(elem)}
return elem};utils.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event)}};utils.filterFindElements=function(elems,selector){elems=utils.makeArray(elems);var ffElems=[];elems.forEach(function(elem){if(!(elem instanceof HTMLElement)){return}
if(!selector){ffElems.push(elem);return}
if(matchesSelector(elem,selector)){ffElems.push(elem)}
var childElems=elem.querySelectorAll(selector);for(var i=0;i<childElems.length;i++){ffElems.push(childElems[i])}});return ffElems};utils.debounceMethod=function(_class,methodName,threshold){threshold=threshold||100;var method=_class.prototype[methodName];var timeoutName=methodName+'Timeout';_class.prototype[methodName]=function(){var timeout=this[timeoutName];clearTimeout(timeout);var args=arguments;var _this=this;this[timeoutName]=setTimeout(function(){method.apply(_this,args);delete _this[timeoutName]},threshold)}};utils.docReady=function(callback){var readyState=document.readyState;if(readyState=='complete'||readyState=='interactive'){setTimeout(callback)}else{document.addEventListener('DOMContentLoaded',callback)}};utils.toDashed=function(str){return str.replace(/(.)([A-Z])/g,function(match,$1,$2){return $1+'-'+$2}).toLowerCase()};var console=window.console;utils.htmlInit=function(WidgetClass,namespace){utils.docReady(function(){var dashedNamespace=utils.toDashed(namespace);var dataAttr='data-'+dashedNamespace;var dataAttrElems=document.querySelectorAll('['+dataAttr+']');var jsDashElems=document.querySelectorAll('.js-'+dashedNamespace);var elems=utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));var dataOptionsAttr=dataAttr+'-options';var jQuery=window.jQuery;elems.forEach(function(elem){var attr=elem.getAttribute(dataAttr)||elem.getAttribute(dataOptionsAttr);var options;try{options=attr&&JSON.parse(attr)}catch(error){if(console){console.error('Error parsing '+dataAttr+' on '+elem.className+': '+error)}
return}
var instance=new WidgetClass(elem,options);if(jQuery){jQuery.data(elem,namespace,instance)}})})};return utils}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/cell',['get-size/get-size'],function(getSize){return factory(window,getSize)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('get-size'))}else{window.Flickity=window.Flickity||{};window.Flickity.Cell=factory(window,window.getSize)}}(window,function factory(window,getSize){function Cell(elem,parent){this.element=elem;this.parent=parent;this.create()}
var proto=Cell.prototype;proto.create=function(){this.element.style.position='absolute';this.element.setAttribute('aria-hidden','true');this.x=0;this.shift=0};proto.destroy=function(){this.unselect();this.element.style.position='';var side=this.parent.originSide;this.element.style[side]=''};proto.getSize=function(){this.size=getSize(this.element)};proto.setPosition=function(x){this.x=x;this.updateTarget();this.renderPosition(x)};proto.updateTarget=proto.setDefaultTarget=function(){var marginProperty=this.parent.originSide=='left'?'marginLeft':'marginRight';this.target=this.x+this.size[marginProperty]+this.size.width*this.parent.cellAlign};proto.renderPosition=function(x){var side=this.parent.originSide;this.element.style[side]=this.parent.getPositionValue(x)};proto.select=function(){this.element.classList.add('is-selected');this.element.removeAttribute('aria-hidden')};proto.unselect=function(){this.element.classList.remove('is-selected');this.element.setAttribute('aria-hidden','true')};proto.wrapShift=function(shift){this.shift=shift;this.renderPosition(this.x+this.parent.slideableWidth*shift)};proto.remove=function(){this.element.parentNode.removeChild(this.element)};return Cell}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/slide',factory)}else if(typeof module=='object'&&module.exports){module.exports=factory()}else{window.Flickity=window.Flickity||{};window.Flickity.Slide=factory()}}(window,function factory(){'use strict';function Slide(parent){this.parent=parent;this.isOriginLeft=parent.originSide=='left';this.cells=[];this.outerWidth=0;this.height=0}
var proto=Slide.prototype;proto.addCell=function(cell){this.cells.push(cell);this.outerWidth+=cell.size.outerWidth;this.height=Math.max(cell.size.outerHeight,this.height);if(this.cells.length==1){this.x=cell.x;var beginMargin=this.isOriginLeft?'marginLeft':'marginRight';this.firstMargin=cell.size[beginMargin]}};proto.updateTarget=function(){var endMargin=this.isOriginLeft?'marginRight':'marginLeft';var lastCell=this.getLastCell();var lastMargin=lastCell?lastCell.size[endMargin]:0;var slideWidth=this.outerWidth-(this.firstMargin+lastMargin);this.target=this.x+this.firstMargin+slideWidth*this.parent.cellAlign};proto.getLastCell=function(){return this.cells[this.cells.length-1]};proto.select=function(){this.cells.forEach(function(cell){cell.select()})};proto.unselect=function(){this.cells.forEach(function(cell){cell.unselect()})};proto.getCellElements=function(){return this.cells.map(function(cell){return cell.element})};return Slide}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/animate',['fizzy-ui-utils/utils'],function(utils){return factory(window,utils)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('fizzy-ui-utils'))}else{window.Flickity=window.Flickity||{};window.Flickity.animatePrototype=factory(window,window.fizzyUIUtils)}}(window,function factory(window,utils){var proto={};proto.startAnimation=function(){if(this.isAnimating){return}
this.isAnimating=!0;this.restingFrames=0;this.animate()};proto.animate=function(){this.applyDragForce();this.applySelectedAttraction();var previousX=this.x;this.integratePhysics();this.positionSlider();this.settle(previousX);if(this.isAnimating){var _this=this;requestAnimationFrame(function animateFrame(){_this.animate()})}};proto.positionSlider=function(){var x=this.x;if(this.options.wrapAround&&this.cells.length>1){x=utils.modulo(x,this.slideableWidth);x=x-this.slideableWidth;this.shiftWrapCells(x)}
this.setTranslateX(x,this.isAnimating);this.dispatchScrollEvent()};proto.setTranslateX=function(x,is3d){x+=this.cursorPosition;x=this.options.rightToLeft?-x:x;var translateX=this.getPositionValue(x);this.slider.style.transform=is3d?'translate3d('+translateX+',0,0)':'translateX('+translateX+')'};proto.dispatchScrollEvent=function(){var firstSlide=this.slides[0];if(!firstSlide){return}
var positionX=-this.x-firstSlide.target;var progress=positionX/this.slidesWidth;this.dispatchEvent('scroll',null,[progress,positionX])};proto.positionSliderAtSelected=function(){if(!this.cells.length){return}
this.x=-this.selectedSlide.target;this.velocity=0;this.positionSlider()};proto.getPositionValue=function(position){if(this.options.percentPosition){return(Math.round((position/this.size.innerWidth)*10000)*0.01)+'%'}else{return Math.round(position)+'px'}};proto.settle=function(previousX){if(!this.isPointerDown&&Math.round(this.x*100)==Math.round(previousX*100)){this.restingFrames++}
if(this.restingFrames>2){this.isAnimating=!1;delete this.isFreeScrolling;this.positionSlider();this.dispatchEvent('settle',null,[this.selectedIndex])}};proto.shiftWrapCells=function(x){var beforeGap=this.cursorPosition+x;this._shiftCells(this.beforeShiftCells,beforeGap,-1);var afterGap=this.size.innerWidth-(x+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,afterGap,1)};proto._shiftCells=function(cells,gap,shift){for(var i=0;i<cells.length;i++){var cell=cells[i];var cellShift=gap>0?shift:0;cell.wrapShift(cellShift);gap-=cell.size.outerWidth}};proto._unshiftCells=function(cells){if(!cells||!cells.length){return}
for(var i=0;i<cells.length;i++){cells[i].wrapShift(0)}};proto.integratePhysics=function(){this.x+=this.velocity;this.velocity*=this.getFrictionFactor()};proto.applyForce=function(force){this.velocity+=force};proto.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?'freeScrollFriction':'friction']};proto.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())};proto.applyDragForce=function(){if(!this.isDraggable||!this.isPointerDown){return}
var dragVelocity=this.dragX-this.x;var dragForce=dragVelocity-this.velocity;this.applyForce(dragForce)};proto.applySelectedAttraction=function(){var dragDown=this.isDraggable&&this.isPointerDown;if(dragDown||this.isFreeScrolling||!this.slides.length){return}
var distance=this.selectedSlide.target*-1-this.x;var force=distance*this.options.selectedAttraction;this.applyForce(force)};return proto}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/flickity',['ev-emitter/ev-emitter','get-size/get-size','fizzy-ui-utils/utils','./cell','./slide','./animate'],function(EvEmitter,getSize,utils,Cell,Slide,animatePrototype){return factory(window,EvEmitter,getSize,utils,Cell,Slide,animatePrototype)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('ev-emitter'),require('get-size'),require('fizzy-ui-utils'),require('./cell'),require('./slide'),require('./animate'))}else{var _Flickity=window.Flickity;window.Flickity=factory(window,window.EvEmitter,window.getSize,window.fizzyUIUtils,_Flickity.Cell,_Flickity.Slide,_Flickity.animatePrototype)}}(window,function factory(window,EvEmitter,getSize,utils,Cell,Slide,animatePrototype){var jQuery=window.jQuery;var getComputedStyle=window.getComputedStyle;var console=window.console;function moveElements(elems,toElem){elems=utils.makeArray(elems);while(elems.length){toElem.appendChild(elems.shift())}}
var GUID=0;var instances={};function Flickity(element,options){var queryElement=utils.getQueryElement(element);if(!queryElement){if(console){console.error('Bad element for Flickity: '+(queryElement||element))}
return}
this.element=queryElement;if(this.element.flickityGUID){var instance=instances[this.element.flickityGUID];instance.option(options);return instance}
if(jQuery){this.$element=jQuery(this.element)}
this.options=utils.extend({},this.constructor.defaults);this.option(options);this._create()}
Flickity.defaults={accessibility:!0,cellAlign:'center',freeScrollFriction:0.075,friction:0.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:0.025,setGallerySize:!0};Flickity.createMethods=[];var proto=Flickity.prototype;utils.extend(proto,EvEmitter.prototype);proto._create=function(){var id=this.guid=++GUID;this.element.flickityGUID=id;instances[id]=this;this.selectedIndex=0;this.restingFrames=0;this.x=0;this.velocity=0;this.originSide=this.options.rightToLeft?'right':'left';this.viewport=document.createElement('div');this.viewport.className='flickity-viewport';this._createSlider();if(this.options.resize||this.options.watchCSS){window.addEventListener('resize',this)}
for(var eventName in this.options.on){var listener=this.options.on[eventName];this.on(eventName,listener)}
Flickity.createMethods.forEach(function(method){this[method]()},this);if(this.options.watchCSS){this.watchCSS()}else{this.activate()}};proto.option=function(opts){utils.extend(this.options,opts)};proto.activate=function(){if(this.isActive){return}
this.isActive=!0;this.element.classList.add('flickity-enabled');if(this.options.rightToLeft){this.element.classList.add('flickity-rtl')}
this.getSize();var cellElems=this._filterFindCellElements(this.element.children);moveElements(cellElems,this.slider);this.viewport.appendChild(this.slider);this.element.appendChild(this.viewport);this.reloadCells();if(this.options.accessibility){this.element.tabIndex=0;this.element.addEventListener('keydown',this)}
this.emitEvent('activate');this.selectInitialIndex();this.isInitActivated=!0;this.dispatchEvent('ready')};proto._createSlider=function(){var slider=document.createElement('div');slider.className='flickity-slider';slider.style[this.originSide]=0;this.slider=slider};proto._filterFindCellElements=function(elems){return utils.filterFindElements(elems,this.options.cellSelector)};proto.reloadCells=function(){this.cells=this._makeCells(this.slider.children);this.positionCells();this._getWrapShiftCells();this.setGallerySize()};proto._makeCells=function(elems){var cellElems=this._filterFindCellElements(elems);var cells=cellElems.map(function(cellElem){return new Cell(cellElem,this)},this);return cells};proto.getLastCell=function(){return this.cells[this.cells.length-1]};proto.getLastSlide=function(){return this.slides[this.slides.length-1]};proto.positionCells=function(){this._sizeCells(this.cells);this._positionCells(0)};proto._positionCells=function(index){index=index||0;this.maxCellHeight=index?this.maxCellHeight||0:0;var cellX=0;if(index>0){var startCell=this.cells[index-1];cellX=startCell.x+startCell.size.outerWidth}
var len=this.cells.length;for(var i=index;i<len;i++){var cell=this.cells[i];cell.setPosition(cellX);cellX+=cell.size.outerWidth;this.maxCellHeight=Math.max(cell.size.outerHeight,this.maxCellHeight)}
this.slideableWidth=cellX;this.updateSlides();this._containSlides();this.slidesWidth=len?this.getLastSlide().target-this.slides[0].target:0};proto._sizeCells=function(cells){cells.forEach(function(cell){cell.getSize()})};proto.updateSlides=function(){this.slides=[];if(!this.cells.length){return}
var slide=new Slide(this);this.slides.push(slide);var isOriginLeft=this.originSide=='left';var nextMargin=isOriginLeft?'marginRight':'marginLeft';var canCellFit=this._getCanCellFit();this.cells.forEach(function(cell,i){if(!slide.cells.length){slide.addCell(cell);return}
var slideWidth=(slide.outerWidth-slide.firstMargin)+(cell.size.outerWidth-cell.size[nextMargin]);if(canCellFit.call(this,i,slideWidth)){slide.addCell(cell)}else{slide.updateTarget();slide=new Slide(this);this.slides.push(slide);slide.addCell(cell)}},this);slide.updateTarget();this.updateSelectedSlide()};proto._getCanCellFit=function(){var groupCells=this.options.groupCells;if(!groupCells){return function(){return!1}}else if(typeof groupCells=='number'){var number=parseInt(groupCells,10);return function(i){return(i%number)!==0}}
var percentMatch=typeof groupCells=='string'&&groupCells.match(/^(\d+)%$/);var percent=percentMatch?parseInt(percentMatch[1],10)/100:1;return function(i,slideWidth){return slideWidth<=(this.size.innerWidth+1)*percent}};proto._init=proto.reposition=function(){this.positionCells();this.positionSliderAtSelected()};proto.getSize=function(){this.size=getSize(this.element);this.setCellAlign();this.cursorPosition=this.size.innerWidth*this.cellAlign};var cellAlignShorthands={center:{left:0.5,right:0.5},left:{left:0,right:1},right:{right:0,left:1}};proto.setCellAlign=function(){var shorthand=cellAlignShorthands[this.options.cellAlign];this.cellAlign=shorthand?shorthand[this.originSide]:this.options.cellAlign};proto.setGallerySize=function(){if(this.options.setGallerySize){var height=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=height+'px'}};proto._getWrapShiftCells=function(){if(!this.options.wrapAround){return}
this._unshiftCells(this.beforeShiftCells);this._unshiftCells(this.afterShiftCells);var gapX=this.cursorPosition;var cellIndex=this.cells.length-1;this.beforeShiftCells=this._getGapCells(gapX,cellIndex,-1);gapX=this.size.innerWidth-this.cursorPosition;this.afterShiftCells=this._getGapCells(gapX,0,1)};proto._getGapCells=function(gapX,cellIndex,increment){var cells=[];while(gapX>0){var cell=this.cells[cellIndex];if(!cell){break}
cells.push(cell);cellIndex+=increment;gapX-=cell.size.outerWidth}
return cells};proto._containSlides=function(){if(!this.options.contain||this.options.wrapAround||!this.cells.length){return}
var isRightToLeft=this.options.rightToLeft;var beginMargin=isRightToLeft?'marginRight':'marginLeft';var endMargin=isRightToLeft?'marginLeft':'marginRight';var contentWidth=this.slideableWidth-this.getLastCell().size[endMargin];var isContentSmaller=contentWidth<this.size.innerWidth;var beginBound=this.cursorPosition+this.cells[0].size[beginMargin];var endBound=contentWidth-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(slide){if(isContentSmaller){slide.target=contentWidth*this.cellAlign}else{slide.target=Math.max(slide.target,beginBound);slide.target=Math.min(slide.target,endBound)}},this)};proto.dispatchEvent=function(type,event,args){var emitArgs=event?[event].concat(args):args;this.emitEvent(type,emitArgs);if(jQuery&&this.$element){type+=this.options.namespaceJQueryEvents?'.flickity':'';var $event=type;if(event){var jQEvent=jQuery.Event(event);jQEvent.type=type;$event=jQEvent}
this.$element.trigger($event,args)}};proto.select=function(index,isWrap,isInstant){if(!this.isActive){return}
index=parseInt(index,10);this._wrapSelect(index);if(this.options.wrapAround||isWrap){index=utils.modulo(index,this.slides.length)}
if(!this.slides[index]){return}
var prevIndex=this.selectedIndex;this.selectedIndex=index;this.updateSelectedSlide();if(isInstant){this.positionSliderAtSelected()}else{this.startAnimation()}
if(this.options.adaptiveHeight){this.setGallerySize()}
this.dispatchEvent('select',null,[index]);if(index!=prevIndex){this.dispatchEvent('change',null,[index])}
this.dispatchEvent('cellSelect')};proto._wrapSelect=function(index){var len=this.slides.length;var isWrapping=this.options.wrapAround&&len>1;if(!isWrapping){return index}
var wrapIndex=utils.modulo(index,len);var delta=Math.abs(wrapIndex-this.selectedIndex);var backWrapDelta=Math.abs((wrapIndex+len)-this.selectedIndex);var forewardWrapDelta=Math.abs((wrapIndex-len)-this.selectedIndex);if(!this.isDragSelect&&backWrapDelta<delta){index+=len}else if(!this.isDragSelect&&forewardWrapDelta<delta){index-=len}
if(index<0){this.x-=this.slideableWidth}else if(index>=len){this.x+=this.slideableWidth}};proto.previous=function(isWrap,isInstant){this.select(this.selectedIndex-1,isWrap,isInstant)};proto.next=function(isWrap,isInstant){this.select(this.selectedIndex+1,isWrap,isInstant)};proto.updateSelectedSlide=function(){var slide=this.slides[this.selectedIndex];if(!slide){return}
this.unselectSelectedSlide();this.selectedSlide=slide;slide.select();this.selectedCells=slide.cells;this.selectedElements=slide.getCellElements();this.selectedCell=slide.cells[0];this.selectedElement=this.selectedElements[0]};proto.unselectSelectedSlide=function(){if(this.selectedSlide){this.selectedSlide.unselect()}};proto.selectInitialIndex=function(){var initialIndex=this.options.initialIndex;if(this.isInitActivated){this.select(this.selectedIndex,!1,!0);return}
if(initialIndex&&typeof initialIndex=='string'){var cell=this.queryCell(initialIndex);if(cell){this.selectCell(initialIndex,!1,!0);return}}
var index=0;if(initialIndex&&this.slides[initialIndex]){index=initialIndex}
this.select(index,!1,!0)};proto.selectCell=function(value,isWrap,isInstant){var cell=this.queryCell(value);if(!cell){return}
var index=this.getCellSlideIndex(cell);this.select(index,isWrap,isInstant)};proto.getCellSlideIndex=function(cell){for(var i=0;i<this.slides.length;i++){var slide=this.slides[i];var index=slide.cells.indexOf(cell);if(index!=-1){return i}}};proto.getCell=function(elem){for(var i=0;i<this.cells.length;i++){var cell=this.cells[i];if(cell.element==elem){return cell}}};proto.getCells=function(elems){elems=utils.makeArray(elems);var cells=[];elems.forEach(function(elem){var cell=this.getCell(elem);if(cell){cells.push(cell)}},this);return cells};proto.getCellElements=function(){return this.cells.map(function(cell){return cell.element})};proto.getParentCell=function(elem){var cell=this.getCell(elem);if(cell){return cell}
elem=utils.getParent(elem,'.flickity-slider > *');return this.getCell(elem)};proto.getAdjacentCellElements=function(adjCount,index){if(!adjCount){return this.selectedSlide.getCellElements()}
index=index===undefined?this.selectedIndex:index;var len=this.slides.length;if(1+(adjCount*2)>=len){return this.getCellElements()}
var cellElems=[];for(var i=index-adjCount;i<=index+adjCount;i++){var slideIndex=this.options.wrapAround?utils.modulo(i,len):i;var slide=this.slides[slideIndex];if(slide){cellElems=cellElems.concat(slide.getCellElements())}}
return cellElems};proto.queryCell=function(selector){if(typeof selector=='number'){return this.cells[selector]}
if(typeof selector=='string'){if(selector.match(/^[#\.]?[\d\/]/)){return}
selector=this.element.querySelector(selector)}
return this.getCell(selector)};proto.uiChange=function(){this.emitEvent('uiChange')};proto.childUIPointerDown=function(event){if(event.type!='touchstart'){event.preventDefault()}
this.focus()};proto.onresize=function(){this.watchCSS();this.resize()};utils.debounceMethod(Flickity,'onresize',150);proto.resize=function(){if(!this.isActive){return}
this.getSize();if(this.options.wrapAround){this.x=utils.modulo(this.x,this.slideableWidth)}
this.positionCells();this._getWrapShiftCells();this.setGallerySize();this.emitEvent('resize');var selectedElement=this.selectedElements&&this.selectedElements[0];this.selectCell(selectedElement,!1,!0)};proto.watchCSS=function(){var watchOption=this.options.watchCSS;if(!watchOption){return}
var afterContent=getComputedStyle(this.element,':after').content;if(afterContent.indexOf('flickity')!=-1){this.activate()}else{this.deactivate()}};proto.onkeydown=function(event){var isNotFocused=document.activeElement&&document.activeElement!=this.element;if(!this.options.accessibility||isNotFocused){return}
var handler=Flickity.keyboardHandlers[event.keyCode];if(handler){handler.call(this)}};Flickity.keyboardHandlers={37:function(){var leftMethod=this.options.rightToLeft?'next':'previous';this.uiChange();this[leftMethod]()},39:function(){var rightMethod=this.options.rightToLeft?'previous':'next';this.uiChange();this[rightMethod]()},};proto.focus=function(){var prevScrollY=window.pageYOffset;this.element.focus({preventScroll:!0});if(window.pageYOffset!=prevScrollY){window.scrollTo(window.pageXOffset,prevScrollY)}};proto.deactivate=function(){if(!this.isActive){return}
this.element.classList.remove('flickity-enabled');this.element.classList.remove('flickity-rtl');this.unselectSelectedSlide();this.cells.forEach(function(cell){cell.destroy()});this.element.removeChild(this.viewport);moveElements(this.slider.children,this.element);if(this.options.accessibility){this.element.removeAttribute('tabIndex');this.element.removeEventListener('keydown',this)}
this.isActive=!1;this.emitEvent('deactivate')};proto.destroy=function(){this.deactivate();window.removeEventListener('resize',this);this.allOff();this.emitEvent('destroy');if(jQuery&&this.$element){jQuery.removeData(this.element,'flickity')}
delete this.element.flickityGUID;delete instances[this.guid]};utils.extend(proto,animatePrototype);Flickity.data=function(elem){elem=utils.getQueryElement(elem);var id=elem&&elem.flickityGUID;return id&&instances[id]};utils.htmlInit(Flickity,'flickity');if(jQuery&&jQuery.bridget){jQuery.bridget('flickity',Flickity)}
Flickity.setJQuery=function(jq){jQuery=jq};Flickity.Cell=Cell;Flickity.Slide=Slide;return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('unipointer/unipointer',['ev-emitter/ev-emitter'],function(EvEmitter){return factory(window,EvEmitter)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('ev-emitter'))}else{window.Unipointer=factory(window,window.EvEmitter)}}(window,function factory(window,EvEmitter){function noop(){}
function Unipointer(){}
var proto=Unipointer.prototype=Object.create(EvEmitter.prototype);proto.bindStartEvent=function(elem){this._bindStartEvent(elem,!0)};proto.unbindStartEvent=function(elem){this._bindStartEvent(elem,!1)};proto._bindStartEvent=function(elem,isAdd){isAdd=isAdd===undefined?!0:isAdd;var bindMethod=isAdd?'addEventListener':'removeEventListener';var startEvent='mousedown';if(window.PointerEvent){startEvent='pointerdown'}else if('ontouchstart' in window){startEvent='touchstart'}
elem[bindMethod](startEvent,this)};proto.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event)}};proto.getTouch=function(touches){for(var i=0;i<touches.length;i++){var touch=touches[i];if(touch.identifier==this.pointerIdentifier){return touch}}};proto.onmousedown=function(event){var button=event.button;if(button&&(button!==0&&button!==1)){return}
this._pointerDown(event,event)};proto.ontouchstart=function(event){this._pointerDown(event,event.changedTouches[0])};proto.onpointerdown=function(event){this._pointerDown(event,event)};proto._pointerDown=function(event,pointer){if(event.button||this.isPointerDown){return}
this.isPointerDown=!0;this.pointerIdentifier=pointer.pointerId!==undefined?pointer.pointerId:pointer.identifier;this.pointerDown(event,pointer)};proto.pointerDown=function(event,pointer){this._bindPostStartEvents(event);this.emitEvent('pointerDown',[event,pointer])};var postStartEvents={mousedown:['mousemove','mouseup'],touchstart:['touchmove','touchend','touchcancel'],pointerdown:['pointermove','pointerup','pointercancel'],};proto._bindPostStartEvents=function(event){if(!event){return}
var events=postStartEvents[event.type];events.forEach(function(eventName){window.addEventListener(eventName,this)},this);this._boundPointerEvents=events};proto._unbindPostStartEvents=function(){if(!this._boundPointerEvents){return}
this._boundPointerEvents.forEach(function(eventName){window.removeEventListener(eventName,this)},this);delete this._boundPointerEvents};proto.onmousemove=function(event){this._pointerMove(event,event)};proto.onpointermove=function(event){if(event.pointerId==this.pointerIdentifier){this._pointerMove(event,event)}};proto.ontouchmove=function(event){var touch=this.getTouch(event.changedTouches);if(touch){this._pointerMove(event,touch)}};proto._pointerMove=function(event,pointer){this.pointerMove(event,pointer)};proto.pointerMove=function(event,pointer){this.emitEvent('pointerMove',[event,pointer])};proto.onmouseup=function(event){this._pointerUp(event,event)};proto.onpointerup=function(event){if(event.pointerId==this.pointerIdentifier){this._pointerUp(event,event)}};proto.ontouchend=function(event){var touch=this.getTouch(event.changedTouches);if(touch){this._pointerUp(event,touch)}};proto._pointerUp=function(event,pointer){this._pointerDone();this.pointerUp(event,pointer)};proto.pointerUp=function(event,pointer){this.emitEvent('pointerUp',[event,pointer])};proto._pointerDone=function(){this._pointerReset();this._unbindPostStartEvents();this.pointerDone()};proto._pointerReset=function(){this.isPointerDown=!1;delete this.pointerIdentifier};proto.pointerDone=noop;proto.onpointercancel=function(event){if(event.pointerId==this.pointerIdentifier){this._pointerCancel(event,event)}};proto.ontouchcancel=function(event){var touch=this.getTouch(event.changedTouches);if(touch){this._pointerCancel(event,touch)}};proto._pointerCancel=function(event,pointer){this._pointerDone();this.pointerCancel(event,pointer)};proto.pointerCancel=function(event,pointer){this.emitEvent('pointerCancel',[event,pointer])};Unipointer.getPointerPoint=function(pointer){return{x:pointer.pageX,y:pointer.pageY}};return Unipointer}));(function(window,factory){if(typeof define=='function'&&define.amd){define('unidragger/unidragger',['unipointer/unipointer'],function(Unipointer){return factory(window,Unipointer)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('unipointer'))}else{window.Unidragger=factory(window,window.Unipointer)}}(window,function factory(window,Unipointer){function Unidragger(){}
var proto=Unidragger.prototype=Object.create(Unipointer.prototype);proto.bindHandles=function(){this._bindHandles(!0)};proto.unbindHandles=function(){this._bindHandles(!1)};proto._bindHandles=function(isAdd){isAdd=isAdd===undefined?!0:isAdd;var bindMethod=isAdd?'addEventListener':'removeEventListener';var touchAction=isAdd?this._touchActionValue:'';for(var i=0;i<this.handles.length;i++){var handle=this.handles[i];this._bindStartEvent(handle,isAdd);handle[bindMethod]('click',this);if(window.PointerEvent){handle.style.touchAction=touchAction}}};proto._touchActionValue='none';proto.pointerDown=function(event,pointer){var isOkay=this.okayPointerDown(event);if(!isOkay){return}
this.pointerDownPointer=pointer;event.preventDefault();this.pointerDownBlur();this._bindPostStartEvents(event);this.emitEvent('pointerDown',[event,pointer])};var cursorNodes={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0,};var clickTypes={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0,};proto.okayPointerDown=function(event){var isCursorNode=cursorNodes[event.target.nodeName];var isClickType=clickTypes[event.target.type];var isOkay=!isCursorNode||isClickType;if(!isOkay){this._pointerReset()}
return isOkay};proto.pointerDownBlur=function(){var focused=document.activeElement;var canBlur=focused&&focused.blur&&focused!=document.body;if(canBlur){focused.blur()}};proto.pointerMove=function(event,pointer){var moveVector=this._dragPointerMove(event,pointer);this.emitEvent('pointerMove',[event,pointer,moveVector]);this._dragMove(event,pointer,moveVector)};proto._dragPointerMove=function(event,pointer){var moveVector={x:pointer.pageX-this.pointerDownPointer.pageX,y:pointer.pageY-this.pointerDownPointer.pageY};if(!this.isDragging&&this.hasDragStarted(moveVector)){this._dragStart(event,pointer)}
return moveVector};proto.hasDragStarted=function(moveVector){return Math.abs(moveVector.x)>3||Math.abs(moveVector.y)>3};proto.pointerUp=function(event,pointer){this.emitEvent('pointerUp',[event,pointer]);this._dragPointerUp(event,pointer)};proto._dragPointerUp=function(event,pointer){if(this.isDragging){this._dragEnd(event,pointer)}else{this._staticClick(event,pointer)}};proto._dragStart=function(event,pointer){this.isDragging=!0;this.isPreventingClicks=!0;this.dragStart(event,pointer)};proto.dragStart=function(event,pointer){this.emitEvent('dragStart',[event,pointer])};proto._dragMove=function(event,pointer,moveVector){if(!this.isDragging){return}
this.dragMove(event,pointer,moveVector)};proto.dragMove=function(event,pointer,moveVector){event.preventDefault();this.emitEvent('dragMove',[event,pointer,moveVector])};proto._dragEnd=function(event,pointer){this.isDragging=!1;setTimeout(function(){delete this.isPreventingClicks}.bind(this));this.dragEnd(event,pointer)};proto.dragEnd=function(event,pointer){this.emitEvent('dragEnd',[event,pointer])};proto.onclick=function(event){if(this.isPreventingClicks){event.preventDefault()}};proto._staticClick=function(event,pointer){if(this.isIgnoringMouseUp&&event.type=='mouseup'){return}
this.staticClick(event,pointer);if(event.type!='mouseup'){this.isIgnoringMouseUp=!0;setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)}};proto.staticClick=function(event,pointer){this.emitEvent('staticClick',[event,pointer])};Unidragger.getPointerPoint=Unipointer.getPointerPoint;return Unidragger}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/drag',['./flickity','unidragger/unidragger','fizzy-ui-utils/utils'],function(Flickity,Unidragger,utils){return factory(window,Flickity,Unidragger,utils)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('./flickity'),require('unidragger'),require('fizzy-ui-utils'))}else{window.Flickity=factory(window,window.Flickity,window.Unidragger,window.fizzyUIUtils)}}(window,function factory(window,Flickity,Unidragger,utils){utils.extend(Flickity.defaults,{draggable:'>1',dragThreshold:3,});Flickity.createMethods.push('_createDrag');var proto=Flickity.prototype;utils.extend(proto,Unidragger.prototype);proto._touchActionValue='pan-y';var isTouch='createTouch' in document;var isTouchmoveScrollCanceled=!1;proto._createDrag=function(){this.on('activate',this.onActivateDrag);this.on('uiChange',this._uiChangeDrag);this.on('deactivate',this.onDeactivateDrag);this.on('cellChange',this.updateDraggable);if(isTouch&&!isTouchmoveScrollCanceled){window.addEventListener('touchmove',function(){});isTouchmoveScrollCanceled=!0}};proto.onActivateDrag=function(){this.handles=[this.viewport];this.bindHandles();this.updateDraggable()};proto.onDeactivateDrag=function(){this.unbindHandles();this.element.classList.remove('is-draggable')};proto.updateDraggable=function(){if(this.options.draggable=='>1'){this.isDraggable=this.slides.length>1}else{this.isDraggable=this.options.draggable}
if(this.isDraggable){this.element.classList.add('is-draggable')}else{this.element.classList.remove('is-draggable')}};proto.bindDrag=function(){this.options.draggable=!0;this.updateDraggable()};proto.unbindDrag=function(){this.options.draggable=!1;this.updateDraggable()};proto._uiChangeDrag=function(){delete this.isFreeScrolling};proto.pointerDown=function(event,pointer){if(!this.isDraggable){this._pointerDownDefault(event,pointer);return}
var isOkay=this.okayPointerDown(event);if(!isOkay){return}
this._pointerDownPreventDefault(event);this.pointerDownFocus(event);if(document.activeElement!=this.element){this.pointerDownBlur()}
this.dragX=this.x;this.viewport.classList.add('is-pointer-down');this.pointerDownScroll=getScrollPosition();window.addEventListener('scroll',this);this._pointerDownDefault(event,pointer)};proto._pointerDownDefault=function(event,pointer){this.pointerDownPointer={pageX:pointer.pageX,pageY:pointer.pageY,};this._bindPostStartEvents(event);this.dispatchEvent('pointerDown',event,[pointer])};var focusNodes={INPUT:!0,TEXTAREA:!0,SELECT:!0,};proto.pointerDownFocus=function(event){var isFocusNode=focusNodes[event.target.nodeName];if(!isFocusNode){this.focus()}};proto._pointerDownPreventDefault=function(event){var isTouchStart=event.type=='touchstart';var isTouchPointer=event.pointerType=='touch';var isFocusNode=focusNodes[event.target.nodeName];if(!isTouchStart&&!isTouchPointer&&!isFocusNode){event.preventDefault()}};proto.hasDragStarted=function(moveVector){return Math.abs(moveVector.x)>this.options.dragThreshold};proto.pointerUp=function(event,pointer){delete this.isTouchScrolling;this.viewport.classList.remove('is-pointer-down');this.dispatchEvent('pointerUp',event,[pointer]);this._dragPointerUp(event,pointer)};proto.pointerDone=function(){window.removeEventListener('scroll',this);delete this.pointerDownScroll};proto.dragStart=function(event,pointer){if(!this.isDraggable){return}
this.dragStartPosition=this.x;this.startAnimation();window.removeEventListener('scroll',this);this.dispatchEvent('dragStart',event,[pointer])};proto.pointerMove=function(event,pointer){var moveVector=this._dragPointerMove(event,pointer);this.dispatchEvent('pointerMove',event,[pointer,moveVector]);this._dragMove(event,pointer,moveVector)};proto.dragMove=function(event,pointer,moveVector){if(!this.isDraggable){return}
event.preventDefault();this.previousDragX=this.dragX;var direction=this.options.rightToLeft?-1:1;if(this.options.wrapAround){moveVector.x=moveVector.x%this.slideableWidth}
var dragX=this.dragStartPosition+moveVector.x*direction;if(!this.options.wrapAround&&this.slides.length){var originBound=Math.max(-this.slides[0].target,this.dragStartPosition);dragX=dragX>originBound?(dragX+originBound)*0.5:dragX;var endBound=Math.min(-this.getLastSlide().target,this.dragStartPosition);dragX=dragX<endBound?(dragX+endBound)*0.5:dragX}
this.dragX=dragX;this.dragMoveTime=new Date();this.dispatchEvent('dragMove',event,[pointer,moveVector])};proto.dragEnd=function(event,pointer){if(!this.isDraggable){return}
if(this.options.freeScroll){this.isFreeScrolling=!0}
var index=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var restingX=this.getRestingPosition();this.isFreeScrolling=-restingX>this.slides[0].target&&-restingX<this.getLastSlide().target}else if(!this.options.freeScroll&&index==this.selectedIndex){index+=this.dragEndBoostSelect()}
delete this.previousDragX;this.isDragSelect=this.options.wrapAround;this.select(index);delete this.isDragSelect;this.dispatchEvent('dragEnd',event,[pointer])};proto.dragEndRestingSelect=function(){var restingX=this.getRestingPosition();var distance=Math.abs(this.getSlideDistance(-restingX,this.selectedIndex));var positiveResting=this._getClosestResting(restingX,distance,1);var negativeResting=this._getClosestResting(restingX,distance,-1);var index=positiveResting.distance<negativeResting.distance?positiveResting.index:negativeResting.index;return index};proto._getClosestResting=function(restingX,distance,increment){var index=this.selectedIndex;var minDistance=Infinity;var condition=this.options.contain&&!this.options.wrapAround?function(d,md){return d<=md}:function(d,md){return d<md};while(condition(distance,minDistance)){index+=increment;minDistance=distance;distance=this.getSlideDistance(-restingX,index);if(distance===null){break}
distance=Math.abs(distance)}
return{distance:minDistance,index:index-increment}};proto.getSlideDistance=function(x,index){var len=this.slides.length;var isWrapAround=this.options.wrapAround&&len>1;var slideIndex=isWrapAround?utils.modulo(index,len):index;var slide=this.slides[slideIndex];if(!slide){return null}
var wrap=isWrapAround?this.slideableWidth*Math.floor(index/len):0;return x-(slide.target+wrap)};proto.dragEndBoostSelect=function(){if(this.previousDragX===undefined||!this.dragMoveTime||new Date()-this.dragMoveTime>100){return 0}
var distance=this.getSlideDistance(-this.dragX,this.selectedIndex);var delta=this.previousDragX-this.dragX;if(distance>0&&delta>0){return 1}else if(distance<0&&delta<0){return-1}
return 0};proto.staticClick=function(event,pointer){var clickedCell=this.getParentCell(event.target);var cellElem=clickedCell&&clickedCell.element;var cellIndex=clickedCell&&this.cells.indexOf(clickedCell);this.dispatchEvent('staticClick',event,[pointer,cellElem,cellIndex])};proto.onscroll=function(){var scroll=getScrollPosition();var scrollMoveX=this.pointerDownScroll.x-scroll.x;var scrollMoveY=this.pointerDownScroll.y-scroll.y;if(Math.abs(scrollMoveX)>3||Math.abs(scrollMoveY)>3){this._pointerDone()}};function getScrollPosition(){return{x:window.pageXOffset,y:window.pageYOffset}}
return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/prev-next-button',['./flickity','unipointer/unipointer','fizzy-ui-utils/utils'],function(Flickity,Unipointer,utils){return factory(window,Flickity,Unipointer,utils)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('./flickity'),require('unipointer'),require('fizzy-ui-utils'))}else{factory(window,window.Flickity,window.Unipointer,window.fizzyUIUtils)}}(window,function factory(window,Flickity,Unipointer,utils){'use strict';var svgURI='http://www.w3.org/2000/svg';function PrevNextButton(direction,parent){this.direction=direction;this.parent=parent;this._create()}
PrevNextButton.prototype=Object.create(Unipointer.prototype);PrevNextButton.prototype._create=function(){this.isEnabled=!0;this.isPrevious=this.direction==-1;var leftDirection=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==leftDirection;var element=this.element=document.createElement('button');element.className='flickity-button flickity-prev-next-button';element.className+=this.isPrevious?' previous':' next';element.setAttribute('type','button');this.disable();element.setAttribute('aria-label',this.isPrevious?'Previous':'Next');var svg=this.createSVG();element.appendChild(svg);this.parent.on('select',this.update.bind(this));this.on('pointerDown',this.parent.childUIPointerDown.bind(this.parent))};PrevNextButton.prototype.activate=function(){this.bindStartEvent(this.element);this.element.addEventListener('click',this);this.parent.element.appendChild(this.element)};PrevNextButton.prototype.deactivate=function(){this.parent.element.removeChild(this.element);this.unbindStartEvent(this.element);this.element.removeEventListener('click',this)};PrevNextButton.prototype.createSVG=function(){var svg=document.createElementNS(svgURI,'svg');svg.setAttribute('class','flickity-button-icon');svg.setAttribute('viewBox','0 0 100 100');var path=document.createElementNS(svgURI,'path');var pathMovements=getArrowMovements(this.parent.options.arrowShape);path.setAttribute('d',pathMovements);path.setAttribute('class','arrow');if(!this.isLeft){path.setAttribute('transform','translate(100, 100) rotate(180) ')}
svg.appendChild(path);return svg};function getArrowMovements(shape){if(typeof shape=='string'){return shape}
return'M '+shape.x0+',50'+' L '+shape.x1+','+(shape.y1+50)+' L '+shape.x2+','+(shape.y2+50)+' L '+shape.x3+',50 '+' L '+shape.x2+','+(50-shape.y2)+' L '+shape.x1+','+(50-shape.y1)+' Z'}
PrevNextButton.prototype.handleEvent=utils.handleEvent;PrevNextButton.prototype.onclick=function(){if(!this.isEnabled){return}
this.parent.uiChange();var method=this.isPrevious?'previous':'next';this.parent[method]()};PrevNextButton.prototype.enable=function(){if(this.isEnabled){return}
this.element.disabled=!1;this.isEnabled=!0};PrevNextButton.prototype.disable=function(){if(!this.isEnabled){return}
this.element.disabled=!0;this.isEnabled=!1};PrevNextButton.prototype.update=function(){var slides=this.parent.slides;if(this.parent.options.wrapAround&&slides.length>1){this.enable();return}
var lastIndex=slides.length?slides.length-1:0;var boundIndex=this.isPrevious?0:lastIndex;var method=this.parent.selectedIndex==boundIndex?'disable':'enable';this[method]()};PrevNextButton.prototype.destroy=function(){this.deactivate();this.allOff()};utils.extend(Flickity.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}});Flickity.createMethods.push('_createPrevNextButtons');var proto=Flickity.prototype;proto._createPrevNextButtons=function(){if(!this.options.prevNextButtons){return}
this.prevButton=new PrevNextButton(-1,this);this.nextButton=new PrevNextButton(1,this);this.on('activate',this.activatePrevNextButtons)};proto.activatePrevNextButtons=function(){this.prevButton.activate();this.nextButton.activate();this.on('deactivate',this.deactivatePrevNextButtons)};proto.deactivatePrevNextButtons=function(){this.prevButton.deactivate();this.nextButton.deactivate();this.off('deactivate',this.deactivatePrevNextButtons)};Flickity.PrevNextButton=PrevNextButton;return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/page-dots',['./flickity','unipointer/unipointer','fizzy-ui-utils/utils'],function(Flickity,Unipointer,utils){return factory(window,Flickity,Unipointer,utils)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('./flickity'),require('unipointer'),require('fizzy-ui-utils'))}else{factory(window,window.Flickity,window.Unipointer,window.fizzyUIUtils)}}(window,function factory(window,Flickity,Unipointer,utils){function PageDots(parent){this.parent=parent;this._create()}
PageDots.prototype=Object.create(Unipointer.prototype);PageDots.prototype._create=function(){this.holder=document.createElement('ol');this.holder.className='flickity-page-dots';this.dots=[];this.handleClick=this.onClick.bind(this);this.on('pointerDown',this.parent.childUIPointerDown.bind(this.parent))};PageDots.prototype.activate=function(){this.setDots();this.holder.addEventListener('click',this.handleClick);this.bindStartEvent(this.holder);this.parent.element.appendChild(this.holder)};PageDots.prototype.deactivate=function(){this.holder.removeEventListener('click',this.handleClick);this.unbindStartEvent(this.holder);this.parent.element.removeChild(this.holder)};PageDots.prototype.setDots=function(){var delta=this.parent.slides.length-this.dots.length;if(delta>0){this.addDots(delta)}else if(delta<0){this.removeDots(-delta)}};PageDots.prototype.addDots=function(count){var fragment=document.createDocumentFragment();var newDots=[];var length=this.dots.length;var max=length+count;for(var i=length;i<max;i++){var dot=document.createElement('li');dot.className='dot';dot.setAttribute('aria-label','Page dot '+(i+1));fragment.appendChild(dot);newDots.push(dot)}
this.holder.appendChild(fragment);this.dots=this.dots.concat(newDots)};PageDots.prototype.removeDots=function(count){var removeDots=this.dots.splice(this.dots.length-count,count);removeDots.forEach(function(dot){this.holder.removeChild(dot)},this)};PageDots.prototype.updateSelected=function(){if(this.selectedDot){this.selectedDot.className='dot';this.selectedDot.removeAttribute('aria-current')}
if(!this.dots.length){return}
this.selectedDot=this.dots[this.parent.selectedIndex];this.selectedDot.className='dot is-selected';this.selectedDot.setAttribute('aria-current','step')};PageDots.prototype.onTap=PageDots.prototype.onClick=function(event){var target=event.target;if(target.nodeName!='LI'){return}
this.parent.uiChange();var index=this.dots.indexOf(target);this.parent.select(index)};PageDots.prototype.destroy=function(){this.deactivate();this.allOff()};Flickity.PageDots=PageDots;utils.extend(Flickity.defaults,{pageDots:!0});Flickity.createMethods.push('_createPageDots');var proto=Flickity.prototype;proto._createPageDots=function(){if(!this.options.pageDots){return}
this.pageDots=new PageDots(this);this.on('activate',this.activatePageDots);this.on('select',this.updateSelectedPageDots);this.on('cellChange',this.updatePageDots);this.on('resize',this.updatePageDots);this.on('deactivate',this.deactivatePageDots)};proto.activatePageDots=function(){this.pageDots.activate()};proto.updateSelectedPageDots=function(){this.pageDots.updateSelected()};proto.updatePageDots=function(){this.pageDots.setDots()};proto.deactivatePageDots=function(){this.pageDots.deactivate()};Flickity.PageDots=PageDots;return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/player',['ev-emitter/ev-emitter','fizzy-ui-utils/utils','./flickity'],function(EvEmitter,utils,Flickity){return factory(EvEmitter,utils,Flickity)})}else if(typeof module=='object'&&module.exports){module.exports=factory(require('ev-emitter'),require('fizzy-ui-utils'),require('./flickity'))}else{factory(window.EvEmitter,window.fizzyUIUtils,window.Flickity)}}(window,function factory(EvEmitter,utils,Flickity){function Player(parent){this.parent=parent;this.state='stopped';this.onVisibilityChange=this.visibilityChange.bind(this);this.onVisibilityPlay=this.visibilityPlay.bind(this)}
Player.prototype=Object.create(EvEmitter.prototype);Player.prototype.play=function(){if(this.state=='playing'){return}
var isPageHidden=document.hidden;if(isPageHidden){document.addEventListener('visibilitychange',this.onVisibilityPlay);return}
this.state='playing';document.addEventListener('visibilitychange',this.onVisibilityChange);this.tick()};Player.prototype.tick=function(){if(this.state!='playing'){return}
var time=this.parent.options.autoPlay;time=typeof time=='number'?time:3000;var _this=this;this.clear();this.timeout=setTimeout(function(){_this.parent.next(!0);_this.tick()},time)};Player.prototype.stop=function(){this.state='stopped';this.clear();document.removeEventListener('visibilitychange',this.onVisibilityChange)};Player.prototype.clear=function(){clearTimeout(this.timeout)};Player.prototype.pause=function(){if(this.state=='playing'){this.state='paused';this.clear()}};Player.prototype.unpause=function(){if(this.state=='paused'){this.play()}};Player.prototype.visibilityChange=function(){var isPageHidden=document.hidden;this[isPageHidden?'pause':'unpause']()};Player.prototype.visibilityPlay=function(){this.play();document.removeEventListener('visibilitychange',this.onVisibilityPlay)};utils.extend(Flickity.defaults,{pauseAutoPlayOnHover:!0});Flickity.createMethods.push('_createPlayer');var proto=Flickity.prototype;proto._createPlayer=function(){this.player=new Player(this);this.on('activate',this.activatePlayer);this.on('uiChange',this.stopPlayer);this.on('pointerDown',this.stopPlayer);this.on('deactivate',this.deactivatePlayer)};proto.activatePlayer=function(){if(!this.options.autoPlay){return}
this.player.play();this.element.addEventListener('mouseenter',this)};proto.playPlayer=function(){this.player.play()};proto.stopPlayer=function(){this.player.stop()};proto.pausePlayer=function(){this.player.pause()};proto.unpausePlayer=function(){this.player.unpause()};proto.deactivatePlayer=function(){this.player.stop();this.element.removeEventListener('mouseenter',this)};proto.onmouseenter=function(){if(!this.options.pauseAutoPlayOnHover){return}
this.player.pause();this.element.addEventListener('mouseleave',this)};proto.onmouseleave=function(){this.player.unpause();this.element.removeEventListener('mouseleave',this)};Flickity.Player=Player;return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/add-remove-cell',['./flickity','fizzy-ui-utils/utils'],function(Flickity,utils){return factory(window,Flickity,utils)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('./flickity'),require('fizzy-ui-utils'))}else{factory(window,window.Flickity,window.fizzyUIUtils)}}(window,function factory(window,Flickity,utils){function getCellsFragment(cells){var fragment=document.createDocumentFragment();cells.forEach(function(cell){fragment.appendChild(cell.element)});return fragment}
var proto=Flickity.prototype;proto.insert=function(elems,index){var cells=this._makeCells(elems);if(!cells||!cells.length){return}
var len=this.cells.length;index=index===undefined?len:index;var fragment=getCellsFragment(cells);var isAppend=index==len;if(isAppend){this.slider.appendChild(fragment)}else{var insertCellElement=this.cells[index].element;this.slider.insertBefore(fragment,insertCellElement)}
if(index===0){this.cells=cells.concat(this.cells)}else if(isAppend){this.cells=this.cells.concat(cells)}else{var endCells=this.cells.splice(index,len-index);this.cells=this.cells.concat(cells).concat(endCells)}
this._sizeCells(cells);this.cellChange(index,!0)};proto.append=function(elems){this.insert(elems,this.cells.length)};proto.prepend=function(elems){this.insert(elems,0)};proto.remove=function(elems){var cells=this.getCells(elems);if(!cells||!cells.length){return}
var minCellIndex=this.cells.length-1;cells.forEach(function(cell){cell.remove();var index=this.cells.indexOf(cell);minCellIndex=Math.min(index,minCellIndex);utils.removeFrom(this.cells,cell)},this);this.cellChange(minCellIndex,!0)};proto.cellSizeChange=function(elem){var cell=this.getCell(elem);if(!cell){return}
cell.getSize();var index=this.cells.indexOf(cell);this.cellChange(index)};proto.cellChange=function(changedCellIndex,isPositioningSlider){var prevSelectedElem=this.selectedElement;this._positionCells(changedCellIndex);this._getWrapShiftCells();this.setGallerySize();var cell=this.getCell(prevSelectedElem);if(cell){this.selectedIndex=this.getCellSlideIndex(cell)}
this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex);this.emitEvent('cellChange',[changedCellIndex]);this.select(this.selectedIndex);if(isPositioningSlider){this.positionSliderAtSelected()}};return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/lazyload',['./flickity','fizzy-ui-utils/utils'],function(Flickity,utils){return factory(window,Flickity,utils)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('./flickity'),require('fizzy-ui-utils'))}else{factory(window,window.Flickity,window.fizzyUIUtils)}}(window,function factory(window,Flickity,utils){'use strict';Flickity.createMethods.push('_createLazyload');var proto=Flickity.prototype;proto._createLazyload=function(){this.on('select',this.lazyLoad)};proto.lazyLoad=function(){var lazyLoad=this.options.lazyLoad;if(!lazyLoad){return}
var adjCount=typeof lazyLoad=='number'?lazyLoad:0;var cellElems=this.getAdjacentCellElements(adjCount);var lazyImages=[];cellElems.forEach(function(cellElem){var lazyCellImages=getCellLazyImages(cellElem);lazyImages=lazyImages.concat(lazyCellImages)});lazyImages.forEach(function(img){new LazyLoader(img,this)},this)};function getCellLazyImages(cellElem){if(cellElem.nodeName=='IMG'){var lazyloadAttr=cellElem.getAttribute('data-flickity-lazyload');var srcAttr=cellElem.getAttribute('data-flickity-lazyload-src');var srcsetAttr=cellElem.getAttribute('data-flickity-lazyload-srcset');if(lazyloadAttr||srcAttr||srcsetAttr){return[cellElem]}}
var lazySelector='img[data-flickity-lazyload], '+'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';var imgs=cellElem.querySelectorAll(lazySelector);return utils.makeArray(imgs)}
function LazyLoader(img,flickity){this.img=img;this.flickity=flickity;this.load()}
LazyLoader.prototype.handleEvent=utils.handleEvent;LazyLoader.prototype.load=function(){this.img.addEventListener('load',this);this.img.addEventListener('error',this);var src=this.img.getAttribute('data-flickity-lazyload')||this.img.getAttribute('data-flickity-lazyload-src');var srcset=this.img.getAttribute('data-flickity-lazyload-srcset');this.img.src=src;if(srcset){this.img.setAttribute('srcset',srcset)}
this.img.removeAttribute('data-flickity-lazyload');this.img.removeAttribute('data-flickity-lazyload-src');this.img.removeAttribute('data-flickity-lazyload-srcset')};LazyLoader.prototype.onload=function(event){this.complete(event,'flickity-lazyloaded')};LazyLoader.prototype.onerror=function(event){this.complete(event,'flickity-lazyerror')};LazyLoader.prototype.complete=function(event,className){this.img.removeEventListener('load',this);this.img.removeEventListener('error',this);var cell=this.flickity.getParentCell(this.img);var cellElem=cell&&cell.element;this.flickity.cellSizeChange(cellElem);this.img.classList.add(className);this.flickity.dispatchEvent('lazyLoad',event,cellElem)};Flickity.LazyLoader=LazyLoader;return Flickity}));(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity/js/index',['./flickity','./drag','./prev-next-button','./page-dots','./player','./add-remove-cell','./lazyload'],factory)}else if(typeof module=='object'&&module.exports){module.exports=factory(require('./flickity'),require('./drag'),require('./prev-next-button'),require('./page-dots'),require('./player'),require('./add-remove-cell'),require('./lazyload'))}})(window,function factory(Flickity){return Flickity});(function(window,factory){if(typeof define=='function'&&define.amd){define('flickity-as-nav-for/as-nav-for',['flickity/js/index','fizzy-ui-utils/utils'],factory)}else if(typeof module=='object'&&module.exports){module.exports=factory(require('flickity'),require('fizzy-ui-utils'))}else{window.Flickity=factory(window.Flickity,window.fizzyUIUtils)}}(window,function factory(Flickity,utils){Flickity.createMethods.push('_createAsNavFor');var proto=Flickity.prototype;proto._createAsNavFor=function(){this.on('activate',this.activateAsNavFor);this.on('deactivate',this.deactivateAsNavFor);this.on('destroy',this.destroyAsNavFor);var asNavForOption=this.options.asNavFor;if(!asNavForOption){return}
var _this=this;setTimeout(function initNavCompanion(){_this.setNavCompanion(asNavForOption)})};proto.setNavCompanion=function(elem){elem=utils.getQueryElement(elem);var companion=Flickity.data(elem);if(!companion||companion==this){return}
this.navCompanion=companion;var _this=this;this.onNavCompanionSelect=function(){_this.navCompanionSelect()};companion.on('select',this.onNavCompanionSelect);this.on('staticClick',this.onNavStaticClick);this.navCompanionSelect(!0)};proto.navCompanionSelect=function(isInstant){if(!this.navCompanion){return}
var selectedCell=this.navCompanion.selectedCells[0];var firstIndex=this.navCompanion.cells.indexOf(selectedCell);var lastIndex=firstIndex+this.navCompanion.selectedCells.length-1;var selectIndex=Math.floor(lerp(firstIndex,lastIndex,this.navCompanion.cellAlign));this.selectCell(selectIndex,!1,isInstant);this.removeNavSelectedElements();if(selectIndex>=this.cells.length){return}
var selectedCells=this.cells.slice(firstIndex,lastIndex+1);this.navSelectedElements=selectedCells.map(function(cell){return cell.element});this.changeNavSelectedClass('add')};function lerp(a,b,t){return(b-a)*t+a}
proto.changeNavSelectedClass=function(method){this.navSelectedElements.forEach(function(navElem){navElem.classList[method]('is-nav-selected')})};proto.activateAsNavFor=function(){this.navCompanionSelect(!0)};proto.removeNavSelectedElements=function(){if(!this.navSelectedElements){return}
this.changeNavSelectedClass('remove');delete this.navSelectedElements};proto.onNavStaticClick=function(event,pointer,cellElement,cellIndex){if(typeof cellIndex=='number'){this.navCompanion.selectCell(cellIndex)}};proto.deactivateAsNavFor=function(){this.removeNavSelectedElements()};proto.destroyAsNavFor=function(){if(!this.navCompanion){return}
this.navCompanion.off('select',this.onNavCompanionSelect);this.off('staticClick',this.onNavStaticClick);delete this.navCompanion};return Flickity}));(function(window,factory){'use strict';if(typeof define=='function'&&define.amd){define('imagesloaded/imagesloaded',['ev-emitter/ev-emitter'],function(EvEmitter){return factory(window,EvEmitter)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('ev-emitter'))}else{window.imagesLoaded=factory(window,window.EvEmitter)}})(typeof window!=='undefined'?window:this,function factory(window,EvEmitter){var $=window.jQuery;var console=window.console;function extend(a,b){for(var prop in b){a[prop]=b[prop]}
return a}
var arraySlice=Array.prototype.slice;function makeArray(obj){if(Array.isArray(obj)){return obj}
var isArrayLike=typeof obj=='object'&&typeof obj.length=='number';if(isArrayLike){return arraySlice.call(obj)}
return[obj]}
function ImagesLoaded(elem,options,onAlways){if(!(this instanceof ImagesLoaded)){return new ImagesLoaded(elem,options,onAlways)}
var queryElem=elem;if(typeof elem=='string'){queryElem=document.querySelectorAll(elem)}
if(!queryElem){console.error('Bad element for imagesLoaded '+(queryElem||elem));return}
this.elements=makeArray(queryElem);this.options=extend({},this.options);if(typeof options=='function'){onAlways=options}else{extend(this.options,options)}
if(onAlways){this.on('always',onAlways)}
this.getImages();if($){this.jqDeferred=new $.Deferred()}
setTimeout(this.check.bind(this))}
ImagesLoaded.prototype=Object.create(EvEmitter.prototype);ImagesLoaded.prototype.options={};ImagesLoaded.prototype.getImages=function(){this.images=[];this.elements.forEach(this.addElementImages,this)};ImagesLoaded.prototype.addElementImages=function(elem){if(elem.nodeName=='IMG'){this.addImage(elem)}
if(this.options.background===!0){this.addElementBackgroundImages(elem)}
var nodeType=elem.nodeType;if(!nodeType||!elementNodeTypes[nodeType]){return}
var childImgs=elem.querySelectorAll('img');for(var i=0;i<childImgs.length;i++){var img=childImgs[i];this.addImage(img)}
if(typeof this.options.background=='string'){var children=elem.querySelectorAll(this.options.background);for(i=0;i<children.length;i++){var child=children[i];this.addElementBackgroundImages(child)}}};var elementNodeTypes={1:!0,9:!0,11:!0};ImagesLoaded.prototype.addElementBackgroundImages=function(elem){var style=getComputedStyle(elem);if(!style){return}
var reURL=/url\((['"])?(.*?)\1\)/gi;var matches=reURL.exec(style.backgroundImage);while(matches!==null){var url=matches&&matches[2];if(url){this.addBackground(url,elem)}
matches=reURL.exec(style.backgroundImage)}};ImagesLoaded.prototype.addImage=function(img){var loadingImage=new LoadingImage(img);this.images.push(loadingImage)};ImagesLoaded.prototype.addBackground=function(url,elem){var background=new Background(url,elem);this.images.push(background)};ImagesLoaded.prototype.check=function(){var _this=this;this.progressedCount=0;this.hasAnyBroken=!1;if(!this.images.length){this.complete();return}
function onProgress(image,elem,message){setTimeout(function(){_this.progress(image,elem,message)})}
this.images.forEach(function(loadingImage){loadingImage.once('progress',onProgress);loadingImage.check()})};ImagesLoaded.prototype.progress=function(image,elem,message){this.progressedCount++;this.hasAnyBroken=this.hasAnyBroken||!image.isLoaded;this.emitEvent('progress',[this,image,elem]);if(this.jqDeferred&&this.jqDeferred.notify){this.jqDeferred.notify(this,image)}
if(this.progressedCount==this.images.length){this.complete()}
if(this.options.debug&&console){console.log('progress: '+message,image,elem)}};ImagesLoaded.prototype.complete=function(){var eventName=this.hasAnyBroken?'fail':'done';this.isComplete=!0;this.emitEvent(eventName,[this]);this.emitEvent('always',[this]);if(this.jqDeferred){var jqMethod=this.hasAnyBroken?'reject':'resolve';this.jqDeferred[jqMethod](this)}};function LoadingImage(img){this.img=img}
LoadingImage.prototype=Object.create(EvEmitter.prototype);LoadingImage.prototype.check=function(){var isComplete=this.getIsImageComplete();if(isComplete){this.confirm(this.img.naturalWidth!==0,'naturalWidth');return}
this.proxyImage=new Image();this.proxyImage.addEventListener('load',this);this.proxyImage.addEventListener('error',this);this.img.addEventListener('load',this);this.img.addEventListener('error',this);this.proxyImage.src=this.img.src};LoadingImage.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth};LoadingImage.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded;this.emitEvent('progress',[this,this.img,message])};LoadingImage.prototype.handleEvent=function(event){var method='on'+event.type;if(this[method]){this[method](event)}};LoadingImage.prototype.onload=function(){this.confirm(!0,'onload');this.unbindEvents()};LoadingImage.prototype.onerror=function(){this.confirm(!1,'onerror');this.unbindEvents()};LoadingImage.prototype.unbindEvents=function(){this.proxyImage.removeEventListener('load',this);this.proxyImage.removeEventListener('error',this);this.img.removeEventListener('load',this);this.img.removeEventListener('error',this)};function Background(url,element){this.url=url;this.element=element;this.img=new Image()}
Background.prototype=Object.create(LoadingImage.prototype);Background.prototype.check=function(){this.img.addEventListener('load',this);this.img.addEventListener('error',this);this.img.src=this.url;var isComplete=this.getIsImageComplete();if(isComplete){this.confirm(this.img.naturalWidth!==0,'naturalWidth');this.unbindEvents()}};Background.prototype.unbindEvents=function(){this.img.removeEventListener('load',this);this.img.removeEventListener('error',this)};Background.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded;this.emitEvent('progress',[this,this.element,message])};ImagesLoaded.makeJQueryPlugin=function(jQuery){jQuery=jQuery||window.jQuery;if(!jQuery){return}
$=jQuery;$.fn.imagesLoaded=function(options,callback){var instance=new ImagesLoaded(this,options,callback);return instance.jqDeferred.promise($(this))}};ImagesLoaded.makeJQueryPlugin();return ImagesLoaded});(function(window,factory){if(typeof define=='function'&&define.amd){define(['flickity/js/index','imagesloaded/imagesloaded'],function(Flickity,imagesLoaded){return factory(window,Flickity,imagesLoaded)})}else if(typeof module=='object'&&module.exports){module.exports=factory(window,require('flickity'),require('imagesloaded'))}else{window.Flickity=factory(window,window.Flickity,window.imagesLoaded)}}(window,function factory(window,Flickity,imagesLoaded){'use strict';Flickity.createMethods.push('_createImagesLoaded');var proto=Flickity.prototype;proto._createImagesLoaded=function(){this.on('activate',this.imagesLoaded)};proto.imagesLoaded=function(){if(!this.options.imagesLoaded){return}
var _this=this;function onImagesLoadedProgress(instance,image){var cell=_this.getParentCell(image.img);_this.cellSizeChange(cell&&cell.element);if(!_this.options.freeScroll){_this.positionSliderAtSelected()}}
imagesLoaded(this.slider).on('progress',onImagesLoadedProgress)};return Flickity}));var win=jQuery(window);function transFormLate(element,direction,gotoPos){element.css({'-webkit-transform':'translate'+direction+'('+gotoPos+'px)','-moz-transform':'translate'+direction+'('+gotoPos+'px)','-ms-transform':'translate'+direction+'('+gotoPos+'px)','-o-transform':'translate'+direction+'('+gotoPos+'px)','transform':'translate'+direction+'('+gotoPos+'px)'})}
function isTouchDevice(){return'ontouchstart' in document.documentElement}
var keys={37:1,38:1,39:1,40:1,32:1};function preventDefault(e){e=e||window.event;if(e.preventDefault)
e.preventDefault();e.returnValue=!1}
function preventDefaultForScrollKeys(e){if(keys[e.keyCode]){preventDefault(e);return!1}}
function disableScroll(){if(window.addEventListener)
window.addEventListener('DOMMouseScroll',preventDefault,!1);window.onwheel=preventDefault;window.onmousewheel=document.onmousewheel=preventDefault;window.ontouchmove=preventDefault;document.onkeydown=preventDefaultForScrollKeys}
function enableScroll(){if(window.removeEventListener)
window.removeEventListener('DOMMouseScroll',preventDefault,!1);window.onmousewheel=document.onmousewheel=null;window.onwheel=null;window.ontouchmove=null;document.onkeydown=null}
function rotateTopArrow(){var switchPos=win.height()/2,arrow=jQuery('#go-to-top');if(jQuery('.full-section').length){if(switchPos<=win.scrollTop()){arrow.removeClass('showDown');arrow.attr('href','#')}else{arrow.addClass('showDown');arrow.attr('href','#first-wave')}}else{if(switchPos<=win.scrollTop()){arrow.fadeIn()}else{arrow.fadeOut()}}}
jQuery(document).ready(function($){if(!isTouchDevice()){jQuery('body').addClass('no-touch')}
rotateTopArrow();jQuery('.scrolltonext').click(function(){var goto=jQuery(this).attr('href');if(goto=='#'){goto='body'}
jQuery('body,html').animate({scrollTop:(jQuery(goto).offset().top)},800);return!1});function fadeOutOnTop(element){if(element.length){var eTop=element.offset().top-win.scrollTop();if(eTop<=150){element.addClass('nV fade')}else{if(element.hasClass('fade')){element.removeClass('nV fade')}}}}
if(jQuery('.js-tilt').length&&!isTouchDevice()){jQuery('.js-tilt').tilt({maxTilt:20,perspective:1000,easing:"cubic-bezier(.03,.98,.52,.99)",scale:1,speed:500,transition:!0,reset:!0,glare:!1})}
jQuery('.slide-wrapper').bxSlider({auto:!0,autoDelay:2000,pause:7000,mode:'fade',easing:'linear',controls:!1,speed:1000});jQuery('a.canvas-navi-bar, .overlay').click(function(){jQuery('#navi').toggleClass('active');jQuery('body').toggleClass('onHold');if(jQuery('body').hasClass('onHold')){disableScroll()}else{enableScroll()}});jQuery('.carousel').flickity({cellAlign:'center',prevNextButtons:!1,watchCSS:!0});jQuery('.carousel.projektslider-container').flickity({cellAlign:'left',prevNextButtons:!1,contain:!0});jQuery('.image-slider').flickity({contain:!0,cellAlign:'center',prevNextButtons:!1,groupCells:'80%'});jQuery(function(){var filterList={init:function(){jQuery('.projekt-container').mixItUp({selectors:{target:'.projektDiv',filter:'.filter-button'},load:{filter:'all'}})}};filterList.init()});$('#feel-the-wave').wavify({height:100,bones:4,amplitude:160,color:'rgba(242, 243, 247, .9)',speed:.1});$('#feel-the-wave-two').wavify({height:80,bones:3,amplitude:120,color:'rgba(242, 243, 247, .5)',speed:.2});var allMods=jQuery(".ani");allMods.each(function(i,el){jQuery(this).addClass("nV")});jQuery.fn.visible=function(partial){var $t=jQuery(this),$w=jQuery(window),viewTop=$w.scrollTop(),viewBottom=viewTop+$w.height(),_top=$t.offset().top,_bottom=_top+$t.height(),compareTop=partial===!0?_bottom:_top,compareBottom=partial===!0?_top:_bottom;return((compareBottom<=viewBottom)&&(compareTop>=viewTop))};win.scroll(function(event){allMods.each(function(i,el){var el=jQuery(el);if(el.visible(!0)){el.delay(5000).removeClass("nV")}else{el.addClass("nV")}});fadeOutOnTop(jQuery(".bookmark"));fadeOutOnTop(jQuery(".bx-pager"));fadeOutOnTop(jQuery(".socialicons"));rotateTopArrow()});jQuery('.service').each(function(i,el){var el=jQuery(el),containerWidth=Math.ceil(el.width());el.mousemove(function(e){var parentOffset=jQuery(this).offset(),mousePosition=e.pageX-parentOffset.left,mouseDisToMid=mousePosition-(containerWidth/2),move=-20,gotoPos=move/(containerWidth/2)*mouseDisToMid;transFormLate(jQuery('img',this),'X',gotoPos)});el.mouseleave(function(){jQuery('img',this).attr({style:""})})});jQuery("#site-background .layer-wrapper > div").each(function(i,el){var el=jQuery(el);function moveLayers(el){if(el.hasClass('layer2')){var depth=100}else{var depth=-100}
var move=depth/jQuery('body').height()*win.scrollTop();transFormLate(el,'Y',move)}
moveLayers(el);win.on('scroll',function(){moveLayers(el)})});console.log('\n\n\n                             :MMMMMMM+\n                             :MMMMMMM+\n                             :MMMMMMM+\n                             :MMMMMMM+\n                             :MMMMMMM+\n                   ...       :MMMMMMM+    CREATED BY DESIGNERPART\n             :+ydmNNNNNNmhs/.:MMMMMMM+\n          /yNMMMMMMMMMMMMMMMNmMMMMMMM+    Hi! Gefaellt dir was du siehst?\n        +mMMMMMMMMMMMMMMMMMMMMMMMMMMM+    Bewirb dich jetzt und arbeite mit uns!\n      .hMMMMMMMMMMmdddmNMMMMMMMMMMMMM+    office@designerpart.com\n     -mMMMMMMMNy/       :omMMMMMMMMMM+\n     mMMMMMMMy-           `+NMMMMMMMM+\n    sMMMMMMMs               -NMMMMMMM+    oMMMMMMh  -:oshddddhys+:.\n    mMMMMMMN`                oMMMMMMM+    oMMMMMMMhdNMMMMMMMMMMMMNmh+.\n    MMMMMMMd                 /MMMMMMM+    oMMMMMMMMMMMMMMMMMMMMMMMMMMNy-\n    dMMMMMMN.                sMMMMMMM+    oMMMMMMMMMMMMMMMNNNMMMMMMMMMMNo`\n    +MMMMMMMh.              +MMMMMMMM+    oMMMMMMMMMMNdo:`   `/ymMMMMMMMMh`\n    `hMMMMMMMm/`          -yMMMMMMMMM+    oMMMMMMMMMy-            mMMMMMMMh`\n     `hMMMMMMMMmy/--..-:odNMMMMMMMMMM+    oMMMMMMMM+               hMMMMMMM+\n      `oNMMMMMMMMMMNNNMMMMMMMMMMMMMMM+    oMMMMMMMs                 NMMMMMMd\n        -yNMMMMMMMMMMMMMMMMMMMMMMMMMM+    oMMMMMMM/                 dMMMMMMM\n          `+hmNMMMMMMMMMMMMNdhMMMMMMM+    oMMMMMMMo                 NMMMMMMm\n             `:+syhddddhso:- :MMMMMMM+    oMMMMMMMN-               sMMMMMMMs\n                                          oMMMMMMMMN+`           -yMMMMMMMm`\n                                          oMMMMMMMMMMmo:.     ./yNMMMMMMMm-\n                    :NNNNNNNNNNNNNNNN+    oMMMMMMMMMMMMMNmdddmMMMMMMMMMMh.\n                    :MMMMMMMMMMMMMMMM+    oMMMMMMMMMMMMMMMMMMMMMMMMMMMm+\n                    :MMMMMMMMMMMMMMMM+    oMMMMMMMmNMMMMMMMMMMMMMMMNy/`\n                    :NNNNNNNNNNNNNNNN+    oMMMMMMM- /shmNNNNNNmdy+:`\n                                          oMMMMMMM-     ```````\n                                          oMMMMMMM-\n                                          oMMMMMMM-\n                                          oMMMMMMM-\n                                          oMMMMMMM-\n                                          oMMMMMMM-\n\n\n');if(jQuery('body').hasClass('error404')){jQuery('.contact-cta').remove()}});jQuery('body').addClass('onHold');disableScroll();win.load(function(){jQuery.when(jQuery("#overlayer").delay(2000).queue(function(next){jQuery(this).addClass('zoom').fadeOut("slow");next()})).done(function(){enableScroll();jQuery('body').removeClass('onHold');jQuery(".ani").each(function(i,el){var el=jQuery(el);if(el.visible(!0)){el.removeClass("nV")}})})})