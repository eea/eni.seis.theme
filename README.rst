==============================================================================
eni.seis.theme
==============================================================================

ENI SEIS Theme


Installation
------------

Install eni.seis.theme by adding it to your buildout::

    [buildout]

    ...

    eggs =
        eni.seis.theme


and then running ``bin/buildout``

Development
-----------

Prerequisites:

- Node.js_
- latest NPM version: ``sudo npm install npm -g``
- Grunt and Grunt-cli: ``sudo npm install grunt grunt-cli -g``

Then::

    cd src/eni/seis/theme/theme-east/
    cd src/eni/seis/theme/theme-south/

    # install dependencies
    npm install

    # build files
    node_modules/.bin/grunt # for development, or
    node_modules/.bin/grunt production # for production


Contribute
----------

- Issue Tracker: https://github.com/eea/eni.seis.theme/issues
- Source Code: https://github.com/eea/eni.seis.theme


Copyright and license
---------------------
The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

The original code is free software;
you can redistribute it and/or modify it under the terms of the GNU
General Public License as published by the Free Software Foundation;
either version 2 of the License, or (at your option) any later
version.

More details under docs/License.txt


Funding
-------

EEA_ - European Environment Agency (EU)

.. _EEA: http://www.eea.europa.eu/
.. _Node.js: https://nodejs.org/
