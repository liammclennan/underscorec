underscorec
===========

Command line precompilation for underscore.js templates.

Example
------

Given a file system like this:

<pre>
views/
  layout.us
  home/
    index.us
    blah.us
  admin/
    dashboard.us
</pre>

The following command:

```
underscorec views/ output.js
```

will compile the four underscore templates into the file output.js. The views are attached to a global templates object and named according to their path:

* templates[layout]
* templates[home/index]
* templates[home/blah]
* templates[admin/dashboard]

Testing
-------

mocha --compilers coffee:coffee-script test/fs_tests.coffee
