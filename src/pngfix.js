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

var BGSTYLE = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{0}',sizingMethod='scale')";

function fixImagelikeElement(element){
	var ed = element.dom, eds = ed.style;
	if (element.parent('a')) {
		eds.cursor = 'hand';
	}
	eds.filter = String.format(BGSTYLE, ed.src);
	ed.src = Ext.BLANK_IMAGE_URL;
}
function fixBackgroundForElement(element) {
	var eds = element.dom.style, bgurl = element.getStyle('background-image').replace(/^\s*url\(\s*("|')?\s*/,'').replace(/\s*("|')?\s*\)\s*$/,'');
	eds.backgroundImage = 'none';
	eds.filter = String.format(BGSTYLE, bgurl);
}
function fix(rootElement){
	Ext.get(rootElement || Ext.getBody()).select('*').each(function(element){
		if (fix.needsImageFix(element)) {
			fixImagelikeElement(element);
		} else if (fix.needsBackgroundFix(element)) {
			fixBackgroundForElement(element);
		}
	});
}
/**
 * Gets called for every element and should return true when the element needs the image fix.
 * The image fix only makes sense for img tags but for sake of simplicity needsImageFix gets
 * called for every element.
 * @method needsImageFix
 * @param {Ext.Element} element   the element to examin
 * @return {Boolean}  true when this element needs to be fixed. false otherwise.
 */
fix.needsImageFix = function(element){
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
fix.needsBackgroundFix = function(element){
	var bg = element.getStyle('background-image');
	if (bg && bg.match(/url\(.*\.png/)) {
		return true;
	}
	return false;
}
function fakeFix(){}
fakeFix.needsImageFix = Ext.emptyFn;
fakeFix.needsBackgroundFix = Ext.emptyFn;
Ext.ux.PngFix = Ext.isIE6 ? fix : fakeFix;
})();

Ext.Element.addMethods({
	pngFix: function(){
		Ext.ux.PngFix(this);
		return this;
	}
});
