# -*- coding: utf-8 -*-
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import applyProfile
from plone.app.testing import FunctionalTesting
from plone.app.testing import IntegrationTesting
from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import PloneSandboxLayer
from plone.testing import z2

import eni.seis.theme


class EniSeisThemeLayer(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        self.loadZCML(package=eni.seis.theme)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'eni.seis.theme:default')


ENI_SEIS_THEME_FIXTURE = EniSeisThemeLayer()


ENI_SEIS_THEME_INTEGRATION_TESTING = IntegrationTesting(
    bases=(ENI_SEIS_THEME_FIXTURE,),
    name='EniSeisThemeLayer:IntegrationTesting'
)


ENI_SEIS_THEME_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(ENI_SEIS_THEME_FIXTURE,),
    name='EniSeisThemeLayer:FunctionalTesting'
)


ENI_SEIS_THEME_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        ENI_SEIS_THEME_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE
    ),
    name='EniSeisThemeLayer:AcceptanceTesting'
)
