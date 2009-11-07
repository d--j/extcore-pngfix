/**
 * @class Ext.ux.PngFix
 * Ext.ux.PngFix gives you the ability to use PNG with alpha transparency in IE6.
 * It uses <a href="http://www.extjs.com/products/extcore/">ext-core</a> as a base framework so it can be used 
 * with ext-core or the more sophisitcated <a href="http://www.extjs.com/products/extjs/">Ext Js framework</a>.
 * <br/>
 * <strong>Example Usage</strong><br/>
 * <code><pre>
Ext.onReady(function(){Ext.ux.PngFix();});
 * </pre></code>
 * @static
 * @author Daniel Jagszent <daniel@jagszent.de>
 * @version 1.0
 * @license MIT style license
 * 
 */

(function(){
Ext.ns('Ext.ux');

// define Ext.BLANK_IMAGE_URL for ext core
Ext.applyIf(Ext,{BLANK_IMAGE_URL:'http:/'+'/extjs.com/s.gif'});

var BGSTYLE = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{0}',sizingMethod='scale')", NEEDS_IMAGE_FIX = 'needsImageFix', NEEDS_BACKGROUND_FIX = 'needsBackgroundFix';

// creates an alpha image loader filter for an imagelike element (img, input type=image)
function fixImagelikeElement(element){
	var ed = element.dom, eds = ed.style;
	if (element.parent('a')) {
		eds.cursor = 'hand';
	}
	eds.filter = String.format(BGSTYLE, ed.src);
	ed.src = Ext.BLANK_IMAGE_URL;
}

// creates an alpha image loader filter for the background of an element
function fixBackgroundForElement(element) {
	var eds = element.dom.style, bgurl = element.getStyle('background-image').replace(/^\s*url\(\s*("|')?\s*/,'').replace(/\s*("|')?\s*\)\s*$/,'');
	eds.backgroundImage = 'none';
	eds.filter = String.format(BGSTYLE, bgurl);
}

// checks the element if it needs the PNG fix
function fixOneElement(element){
	if (fix[NEEDS_IMAGE_FIX](element)) {
		fixImagelikeElement(element);
	} else if (fix[NEEDS_BACKGROUND_FIX](element)) {
		fixBackgroundForElement(element);
	}
}

// checks the root element and every child if it needs one of the two checks and applies them if neccessary
function fix(rootElement){
	rootElement = Ext.get(rootElement || Ext.getBody());
	fixOneElement(rootElement);
	rootElement.select('*').each(fixOneElement);
}

/**
 * Gets called for every element and should return true when the element needs the image fix.
 * The image fix only makes sense for img tags but for sake of simplicity needsImageFix gets
 * called for every element.
 * @method needsImageFix
 * @param {Ext.Element} element   the element to examin
 * @return {Boolean}  true when this element needs to be fixed. false otherwise.
 */
fix[NEEDS_IMAGE_FIX] = function(element){
	var src = element.dom.src;
	if (src && src.match(/\.png$/)){
		return true
	}
	return false;
}

/**
 * Gets called for every element and should return true when the element needs the background fix. 
 * @method needsBackgroundFix
 * @param {Ext.Element} element   the element to examin
 * @return {Boolean}  true when this element needs to be fixed. false otherwise.
 */
fix[NEEDS_BACKGROUND_FIX] = function(element){
	var bg = element.getStyle('background-image');
	if (bg && bg.match(/url\(.*\.png/)) {
		return true;
	}
	return false;
}

// fake implementation - does nothing
function fakeFix(){}
fakeFix[NEEDS_IMAGE_FIX] = Ext.emptyFn;
fakeFix[NEEDS_BACKGROUND_FIX] = Ext.emptyFn;

// public interface - IE6 gets the real thing, all other browsers get a fake implementation
Ext.ux.PngFix = Ext.isIE6 ? fix : fakeFix;
})();

/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
	/**
	 * An alternate version to call the PNG fix for a single element.
	 * <br/>
	 * <strong>Example Usage</strong><br/>
	 * <code><pre>
Ext.onReady(function(){Ext.get('needs-pngfix').pngFix();});
	 * </pre></code>
	 * @method pngFix
	 * @return {Ext.Element} the element
	 */
	pngFix: function(){
		Ext.ux.PngFix(this);
		return this;
	}
});

/**
 * @class Ext.CompositeElementLite
 */
/**
 * An alternate version to call the PNG fix for a collection of elements.
 * <br/>
 * <strong>Example Usage</strong><br/>
 * <code><pre>
Ext.onReady(function(){Ext.select('.needs-pngfix').pngFix().removeClass('needs-pngfix');});
 * </pre></code>
 * @method pngFix
 * @return {Ext.Element} the element
 */
Ext.CompositeElementLite.prototype.pngFix = function(){
    return this.invoke('pngFix', arguments);
}
