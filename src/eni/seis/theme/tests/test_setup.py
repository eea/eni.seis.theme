# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from eni.seis.theme.testing import ENI_SEIS_THEME_INTEGRATION_TESTING  # noqa
from plone import api

import unittest


class TestSetup(unittest.TestCase):
    """Test that eni.seis.theme is properly installed."""

    layer = ENI_SEIS_THEME_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if eni.seis.theme is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'eni.seis.theme'))

    def test_browserlayer(self):
        """Test that IEniSeisThemeLayer is registered."""
        from eni.seis.theme.interfaces import (
            IEniSeisThemeLayer)
        from plone.browserlayer import utils
        self.assertIn(IEniSeisThemeLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = ENI_SEIS_THEME_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['eni.seis.theme'])

    def test_product_uninstalled(self):
        """Test if eni.seis.theme is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'eni.seis.theme'))

    def test_browserlayer_removed(self):
        """Test that IEniSeisThemeLayer is removed."""
        from eni.seis.theme.interfaces import IEniSeisThemeLayer
        from plone.browserlayer import utils
        self.assertNotIn(IEniSeisThemeLayer, utils.registered_layers())
