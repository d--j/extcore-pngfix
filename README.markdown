extcore-pngfix
==============

Ext.ux.PngFix gives you the ability to use PNG with alpha transparency in IE6. It's quite small – 700 bytes gzip compressed net weight – and should be a drop-in-and-forget solution.

It uses [ext-core](http://www.extjs.com/products/extcore/) as a base framework so it can be used 
with ext-core or the more sophisitcated [ExtJs framework](http://www.extjs.com/products/extjs/).


Examples
--------

    <script src="http://ajax.googleapis.com/ajax/libs/ext-core/3/ext-core.js" type="text/javascript" charset="utf-8"></script>
    <script src="pngfix.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
        Ext.BLANK_IMAGE_URL = '/path/to/an/empty.gif'; // defaults to http://extjs.com/s.gif
        Ext.onReady(function(){
           Ext.ux.PngFix(); 
        });
    </script>

There is another way to execute the PNG fix:

    <script type="text/javascript" charset="utf-8">
        Ext.onReady(function(){ Ext.getBody().pngFix(); });
    </script>

With this method you could better target the fix, e.g. only apply the fix on elements with the class 'needs-pngfix':

    <script type="text/javascript" charset="utf-8">
        Ext.onReady(function(){ Ext.getBody().select('.needs-pngfix').pngFix().removeClass('needs-pngfix'); });
    </script>


Documentation
-------------

You can find the [ext-doc](http://code.google.com/p/ext-doc/) API documentation in the /doc/ directory of the release tarball. To regenerate the API documentation in a git working directory, execute <code>rake doc</code> in that directory (needs ruby and rake installed).


Project Info
------------

extcore-pngfix is hosted on Github: <http://github.com/d--j/extcore-pngfix>, where your contributions, forkings, comments and feedback are greatly welcomed.

Copyright © 2009 Daniel Jagszent, released under the MIT license.
