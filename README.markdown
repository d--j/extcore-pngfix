extcore-pngfix
==============

Ext.ux.PngFix gives you the ability to use PNG with alpha transparency in IE6.

It uses [ext-core](http://www.extjs.com/products/extcore/) as a base framework so it can be used 
with ext-core or the more sophisitcated [Ext Js framework](http://www.extjs.com/products/extjs/).

Examples
--------

    <script src="http://ajax.googleapis.com/ajax/libs/ext-core/3/ext-core.js" type="text/javascript" charset="utf-8"></script>
    <script src="../src/pngfix.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
        Ext.onReady(function(){
           Ext.ux.PngFix(); 
        });
    </script>

There is another way to execute the PNG fix:

    <script type="text/javascript" charset="utf-8">
        Ext.onReady(function(){ Ext.getBody().pngFix(); });
    </script>

With this method you could better target the fix:

    <script type="text/javascript" charset="utf-8">
        Ext.onReady(function(){ Ext.select('.content').pngFix(); });
    </script>

